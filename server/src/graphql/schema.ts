import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { scalarTypeDefs, scalarResolvers } from "./scalars";
import { todoResolvers, todoTypeDefs } from "./todo";

export const typeDefs = mergeTypeDefs([scalarTypeDefs, todoTypeDefs]);
export const resolvers = mergeResolvers([scalarResolvers, todoResolvers]);
