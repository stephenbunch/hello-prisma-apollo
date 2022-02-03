import { TodoApp_Item_TodoFragment } from "../../graphql/codegen";
import { Item } from "./Item";

export interface BodyProps {
  todos: TodoApp_Item_TodoFragment[];
}

export function Body(props: BodyProps) {
  const { todos } = props;

  return (
    <section className="main">
      <input id="toggle-all" className="toggle-all" type="checkbox" />
      <label htmlFor="toggle-all"></label>
      <ul className="todo-list">
        {todos.map((todo) => (
          <Item key={todo.id} todo={todo} />
        ))}
      </ul>
    </section>
  );
}
