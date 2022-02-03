import { useEffect, useMemo, useState } from "react";
import { useGetTodosQuery } from "../graphql-codegen";
import { Body } from "./Body";
import { Filter } from "./Filter";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { pubnub } from "../pubnub";
import Pubnub from "pubnub";

export function TodoApp() {
  const [filter, setFilter] = useState<Filter>("All");

  const { data, refetch } = useGetTodosQuery();

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

  useEffect(() => {
    const listener: Pubnub.ListenerParameters = {
      message(e) {
        if (e.message === "GetTodosQuery") {
          refetch();
        }
      },
    };

    pubnub.subscribe({ channels: ["refetchQuery"] });
    pubnub.addListener(listener);

    return () => {
      pubnub.unsubscribe({ channels: ["refetchQuery"] });
      pubnub.removeListener(listener);
    };
  }, []);

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
