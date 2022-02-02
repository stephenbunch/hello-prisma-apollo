import { gql } from "apollo-server-core";
import { GraphQLScalarType } from "graphql";

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

export const scalarTypeDefs = gql`
  scalar Void
`;

export const scalarResolvers = {
  Void,
};
