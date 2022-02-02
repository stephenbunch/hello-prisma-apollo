import { GraphQLScalarType } from "graphql";
import { Resolvers } from "./types";

const Void = new GraphQLScalarType({
  name: "Void",
  description: "Void scalar type",
  serialize(value) {
    return null;
  },
  parseValue(value) {
    return null;
  },
  parseLiteral(ast) {
    return null;
  },
});

export const scalarResolvers: Resolvers = {
  Void,
};
