import { gql } from "apollo-server-core";
import { prisma } from "../prisma/client";

export const todoTypeDefs = gql`
  type Todo {
    id: String!
    description: String!
  }

  input TodoCreateInput {
    description: String!
  }

  input TodoUpdateInput {
    id: String!
    description: String
  }

  type Query {
    todo(id: String!): Todo
    todos: [Todo!]!
  }

  type Mutation {
    createTodo(input: TodoCreateInput!): Todo!
    updateTodo(input: TodoUpdateInput!): Todo!
    deleteTodo(id: String!): Void
  }
`;

interface TodoCreateInput {
  description: string;
}

interface TodoUpdateInput {
  id: string;
  description?: string;
}

export const todoResolvers = {
  Query: {
    async todo(_, { id }: { id: string }) {
      const todos = await prisma.todo.findMany({
        where: { id },
        take: 1,
      });
      return todos.length ? todos[0] : null;
    },

    async todos() {
      const todos = await prisma.todo.findMany();
      return todos;
    },
  },

  Mutation: {
    async createTodo(_, { input }: { input: TodoCreateInput }) {
      const todo = await prisma.todo.create({ data: input });
      return todo;
    },

    async updateTodo(_, { input }: { input: TodoUpdateInput }) {
      const { id, ...data } = input;
      const todo = await prisma.todo.update({ where: { id }, data });
      return todo;
    },

    async deleteTodo(_, { id }: { id: string }) {
      await prisma.todo.delete({ where: { id } });
    },
  },
};
