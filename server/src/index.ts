import { ApolloServer } from "apollo-server-fastify";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { ApolloServerPlugin } from "apollo-server-plugin-base";
import fastify, { FastifyInstance } from "fastify";
import fastifyStatic from "fastify-static";
import * as path from "path";
import { resolvers } from "./graphql/resolvers";
import { prisma } from "./prisma/client";
import { loadSchema } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { addResolversToSchema } from "@graphql-tools/schema";
import * as dotenv from "dotenv";

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

async function main() {
  dotenv.config();

  const app = fastify();
  const schema = await loadSchema(
    path.resolve(path.join(__dirname, "graphql", "schema.gql")),
    {
      loaders: [new GraphQLFileLoader()],
    }
  );
  const schemaWithResolvers = addResolversToSchema({ schema, resolvers });
  const server = new ApolloServer({
    schema: schemaWithResolvers,
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

  await app.listen(process.env.PORT || 4000, "0.0.0.0");
  console.log(
    `🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`
  );
}

main();
