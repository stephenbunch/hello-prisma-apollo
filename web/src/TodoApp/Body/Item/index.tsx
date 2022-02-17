import { TodoApp_Item_TodoFragment } from "../../../graphql-codegen";
import classNames from "classnames";
import { useCallback, useState, KeyboardEvent } from "react";
import { Key } from "ts-key-enum";
import { useGraphQLClient } from "../../../graphql-client";
import { useMutation, useQueryClient } from "react-query";
import { EntityCacheKey } from "../../../entity-cache";

export interface TodoItemProps {
  todo: TodoApp_Item_TodoFragment;
}

export function Item(props: TodoItemProps) {
  const { todo } = props;

  const queryClient = useQueryClient();
  const { DeleteTodo, UpdateTodo } = useGraphQLClient();
  const { mutateAsync: deleteTodoMutation } = useMutation(DeleteTodo);
  const { mutateAsync: updateTodoMutation } = useMutation(UpdateTodo);

  const [editing, setEditing] = useState(false);
  const [description, setDescription] = useState("");

  const commitDescription = useCallback(async () => {
    await updateTodoMutation({ input: { id: todo.id, description } });
    await queryClient.invalidateQueries(EntityCacheKey.Todos);
    setEditing(false);
    setDescription("");
  }, [todo, description, updateTodoMutation, queryClient]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === Key.Enter) {
        commitDescription();
      } else if (e.key === Key.Escape) {
        setEditing(false);
        setDescription("");
      }
    },
    [commitDescription]
  );

  const beginEditing = useCallback(() => {
    setDescription(todo.description);
    setEditing(true);
  }, [todo]);

  const markCompleted = useCallback(async () => {
    await updateTodoMutation({
      input: { id: todo.id, completed: !todo.completed },
    });
    await queryClient.invalidateQueries(EntityCacheKey.Todos);
  }, [todo, updateTodoMutation, queryClient]);

  const deleteTodo = useCallback(async () => {
    await deleteTodoMutation({ id: todo.id });
    await queryClient.invalidateQueries(EntityCacheKey.Todos);
  }, [todo, deleteTodoMutation, queryClient]);

  return (
    <li
      className={classNames({
        completed: todo.completed,
        editing,
      })}
    >
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          readOnly
          onClick={markCompleted}
        />
        <label onDoubleClick={beginEditing}>{todo.description}</label>
        <button className="destroy" onClick={deleteTodo}></button>
      </div>
      {editing && (
        <input
          className="edit"
          value={description}
          onKeyDown={onKeyDown}
          onBlur={commitDescription}
          onChange={(e) => setDescription(e.target.value)}
          autoFocus
        />
      )}
    </li>
  );
}
