import { useCallback, useMemo } from "react";
import {
  GetTodosDocument,
  TodoApp_Item_TodoFragment,
  useUpdateTodosMutation,
} from "../../graphql-codegen";
import { refetchQueries } from "../../refetchQueries";
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

  const [updateTodos, _] = useUpdateTodosMutation();

  const toggleAll = useCallback(async () => {
    if (toggleAllChecked) {
      await updateTodos({ variables: { input: { completed: false } } });
    } else {
      await updateTodos({ variables: { input: { completed: true } } });
    }
    await refetchQueries([GetTodosDocument]);
  }, [toggleAllChecked, updateTodos]);

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
