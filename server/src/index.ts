import { ApolloServer } from "apollo-server-fastify";
import { ApolloServerPluginDrainHttpServer, Config } from "apollo-server-core";
import { ApolloServerPlugin } from "apollo-server-plugin-base";
import fastify, { FastifyInstance } from "fastify";
import fastifyStatic from "fastify-static";
import * as path from "path";
import { resolvers, typeDefs } from "./graphql/schema";
import { prisma } from "./prisma/client";

function appClosePlugin(app: FastifyInstance): ApolloServerPlugin {
  return {
    async serverWillStart() {
      return {
        async drainServer() {
          await app.close();
          await prisma.$disconnect();
        },
      };
    },
  };
}

async function startServer(
  typeDefs: Config["typeDefs"],
  resolvers: Config["resolvers"]
) {
  const app = fastify();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      appClosePlugin(app),
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

startServer(typeDefs, resolvers);
