import { GraphQLClient } from "graphql-request";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { GraphQLProvider } from "./graphql-client";
import { TodoApp } from "./TodoApp";

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [graphqlClient] = useState(() => new GraphQLClient("/graphql"));

  return (
    <QueryClientProvider client={queryClient}>
      <GraphQLProvider client={graphqlClient}>
        <TodoApp />
      </GraphQLProvider>
    </QueryClientProvider>
  );
}

export default App;
