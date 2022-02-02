import { mergeResolvers } from "@graphql-tools/merge";
import { scalarResolvers } from "./scalars";
import { todoResolvers } from "./todo";

export const resolvers = mergeResolvers([scalarResolvers, todoResolvers]);
