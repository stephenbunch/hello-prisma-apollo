import { GraphQLClient } from "graphql-request";
import { createContext, ReactNode, useContext } from "react";
import { getSdk } from "./graphql-codegen";

const GraphQLClientContext = createContext<GraphQLClient | null>(null);

export interface GraphQLProviderProps {
  client: GraphQLClient;
  children: ReactNode[] | ReactNode;
}

export function GraphQLProvider(props: GraphQLProviderProps) {
  const { client, children } = props;
  return (
    <GraphQLClientContext.Provider value={client}>
      {children}
    </GraphQLClientContext.Provider>
  );
}

export function useGraphQLClient() {
  const client = useContext(GraphQLClientContext);
  if (!client) {
    throw new Error(
      "Could not find GraphQL client. " +
        "Make sure to wrap the root component with GraphQLProvider."
    );
  }
  return getSdk(client);
}
