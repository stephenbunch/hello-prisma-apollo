import { useMemo, useState } from "react";
import { useGetTodosQuery } from "../graphql/codegen";
import { Body } from "./Body";
import { Filter } from "./Filter";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function TodoApp() {
  const [filter, setFilter] = useState<Filter>("All");

  const { data } = useGetTodosQuery();

  const todos = useMemo(() => data?.todos ?? [], [data]);
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "All":
        return todos;
      case "Active":
        return todos.filter((t) => !t.completed);
      case "Completed":
        return todos.filter((t) => t.completed);
    }
  }, [todos, filter]);

  const activeTodoCount = useMemo(
    () => todos.filter((t) => !t.completed).length,
    [todos]
  );

  return (
    <section className="todoapp">
      <Header />
      <Body todos={filteredTodos} />
      <Footer
        activeTodoCount={activeTodoCount}
        selectedFilter={filter}
        onFilterChange={setFilter}
      />
    </section>
  );
}
