import {
  useDeleteTodoMutation,
  GetTodosDocument,
  useUpdateTodoMutation,
  TodoApp_Item_TodoFragment,
} from "../../../graphql-codegen";
import classNames from "classnames";
import { useCallback, useState, KeyboardEvent } from "react";
import { Key } from "ts-key-enum";
import { refetchQueries } from "../../../refetchQuery";

export interface TodoItemProps {
  todo: TodoApp_Item_TodoFragment;
}

export function Item(props: TodoItemProps) {
  const { todo } = props;

  const [deleteTodoMutation, _] = useDeleteTodoMutation();
  const [updateTodoMutation, __] = useUpdateTodoMutation();

  const [editing, setEditing] = useState(false);
  const [description, setDescription] = useState("");

  const commitDescription = useCallback(async () => {
    await updateTodoMutation({
      variables: { input: { id: todo.id, description } },
    });
    await refetchQueries([GetTodosDocument]);
    setEditing(false);
    setDescription("");
  }, [todo, description]);

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
      variables: { input: { id: todo.id, completed: !todo.completed } },
    });
    await refetchQueries([GetTodosDocument]);
  }, [todo]);

  const deleteTodo = useCallback(async () => {
    await deleteTodoMutation({ variables: { id: todo.id } });
    await refetchQueries([GetTodosDocument]);
  }, [todo]);

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
