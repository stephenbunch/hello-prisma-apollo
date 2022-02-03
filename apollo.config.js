module.exports = {
  client: {
    service: {
      name: "hello-prisma-apollo",
      localSchemaFile: "./server/src/graphql/schema.gql",
    },
    includes: ["**/*.gql"],
  },
};
