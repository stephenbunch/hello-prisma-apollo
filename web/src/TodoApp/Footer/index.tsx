import {
  GetTodosDocument,
  useDeleteCompletedTodosMutation,
} from "../../graphql/codegen";
import { Filter, filters } from "../Filter";

export interface FooterProps {
  activeTodoCount: number;
  selectedFilter: Filter;
  onFilterChange: (filter: Filter) => void;
}

export function Footer(props: FooterProps) {
  const { selectedFilter, onFilterChange, activeTodoCount } = props;

  const [deleteCompletedTodos, _] = useDeleteCompletedTodosMutation();

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeTodoCount}</strong>
        <span> </span>
        <span>{activeTodoCount === 1 ? "item" : "items"}</span>
        <span> left</span>
      </span>
      <ul className="filters">
        {filters.map((filter) => (
          <li key={filter}>
            <a
              className={filter === selectedFilter ? "selected" : undefined}
              onClick={() => onFilterChange(filter)}
            >
              {filter}
            </a>
          </li>
        ))}
      </ul>
      <button
        className="clear-completed"
        onClick={() =>
          deleteCompletedTodos({ refetchQueries: [GetTodosDocument] })
        }
      >
        Clear completed
      </button>
    </footer>
  );
}
