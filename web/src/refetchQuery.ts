import { DocumentNode } from "graphql";
import Pubnub from "pubnub";
import { apolloClient } from "./apolloClient";
import { GetTodosDocument } from "./graphql-codegen";
import { pubnub } from "./pubnub";

const Channel = {
  refetchQueries: `${process.env.NODE_ENV || "development"}/refetchQueries`,
} as const;

const queryByName = {
  [getQueryName(GetTodosDocument)]: GetTodosDocument,
};

const listener: Pubnub.ListenerParameters = {
  async message(e) {
    if (e.channel === Channel.refetchQueries) {
      const queries = (e.message as string[])
        .map((queryName) => queryByName[queryName])
        .filter((query) => !!query);
      await apolloClient.refetchQueries({ include: queries });
    }
  },
};

pubnub.subscribe({ channels: [Channel.refetchQueries] });
pubnub.addListener(listener);

if (module.hot) {
  module.hot.addDisposeHandler(() => {
    pubnub.removeListener(listener);
  });
}

export async function refetchQueries(queries: DocumentNode[]) {
  const names = queries.map((query) => {
    const name = getQueryName(query);
    if (!queryByName[name]) {
      throw new Error(`${name} is not configured for refetching`);
    }
    return name;
  });
  await apolloClient.refetchQueries({ include: queries });
  pubnub.publish({ channel: Channel.refetchQueries, message: names });
}

function getQueryName(query: DocumentNode) {
  for (const def of query.definitions) {
    if (def.kind === "OperationDefinition" && def.operation === "query") {
      // Codegen requires all queries to have a name.
      return def.name!.value;
    }
  }
  throw new Error("Query not found");
}
