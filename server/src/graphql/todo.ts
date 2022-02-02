import { prisma } from "../prisma/client";
import { Resolvers } from "./types";

export const todoResolvers: Resolvers = {
  Query: {
    async todo(_, { id }) {
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
    async createTodo(_, { input }) {
      const todo = await prisma.todo.create({ data: input });
      return todo;
    },

    async updateTodo(_, { input }) {
      const { id, ...data } = input;
      const todo = await prisma.todo.update({ where: { id }, data });
      return todo;
    },

    async deleteTodo(_, { id }) {
      await prisma.todo.delete({ where: { id } });
    },
  },
};
