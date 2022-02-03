import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./apolloClient";
import { TodoApp } from "./TodoApp";

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <TodoApp />
    </ApolloProvider>
  );
}

export default App;
