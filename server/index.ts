import { ApolloServer, gql, Config } from "apollo-server-fastify";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { ApolloServerPlugin } from "apollo-server-plugin-base";
import fastify, { FastifyInstance } from "fastify";
import fastifyStatic from "fastify-static";
import path from "path";

function fastifyAppClosePlugin(app: FastifyInstance): ApolloServerPlugin {
  return {
    async serverWillStart() {
      return {
        async drainServer() {
          await app.close();
        },
      };
    },
  };
}

async function startApolloServer(
  typeDefs: Config["typeDefs"],
  resolvers: Config["resolvers"]
) {
  const app = fastify();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      fastifyAppClosePlugin(app),
      ApolloServerPluginDrainHttpServer({ httpServer: app.server }),
    ],
  });

  await server.start();
  app.register(server.createHandler({ path: "/graphql" }));

  app.register(fastifyStatic, {
    root: path.resolve(path.join(__dirname, "../web/build")),
  });

  await app.listen(4000);
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

const typeDefs = gql`
  type Todo {
    id: ID!
    description: String!
  }

  type Query {
    todos: [Todo!]!
  }
`;

interface Todo {
  id: string;
  description: string;
}

const todos: Todo[] = [
  {
    id: "1",
    description: "Make breakfast",
  },
];

const resolvers = {
  Query: {
    todos: () => todos,
  },
};

startApolloServer(typeDefs, resolvers);
