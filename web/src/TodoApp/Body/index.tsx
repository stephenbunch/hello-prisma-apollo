import { useCallback, useMemo } from "react";
import { useMutation, useQueryClient } from "react-query";
import { EntityCacheKey } from "../../entity-cache";
import { useGraphQLClient } from "../../graphql-client";
import { TodoApp_Item_TodoFragment } from "../../graphql-codegen";
import { Item } from "./Item";

export interface BodyProps {
  todos: TodoApp_Item_TodoFragment[];
}

export function Body(props: BodyProps) {
  const { todos } = props;

  const toggleAllChecked = useMemo(
    () => todos.filter((t) => t.completed).length === todos.length,
    [todos]
  );

  const queryClient = useQueryClient();
  const { UpdateTodos } = useGraphQLClient();
  const { mutateAsync: updateTodos } = useMutation(UpdateTodos);

  const toggleAll = useCallback(async () => {
    if (toggleAllChecked) {
      await updateTodos({ input: { completed: false } });
    } else {
      await updateTodos({ input: { completed: true } });
    }
    await queryClient.invalidateQueries(EntityCacheKey.Todos);
  }, [toggleAllChecked, updateTodos, queryClient]);

  return (
    <section className="main">
      <input
        id="toggle-all"
        className="toggle-all"
        type="checkbox"
        checked={toggleAllChecked}
        readOnly
      />
      <label htmlFor="toggle-all" onClick={toggleAll}></label>
      <ul className="todo-list">
        {todos.map((todo) => (
          <Item key={todo.id} todo={todo} />
        ))}
      </ul>
    </section>
  );
}
