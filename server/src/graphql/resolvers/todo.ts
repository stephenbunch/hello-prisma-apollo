import { Prisma } from "@prisma/client";
import { prisma } from "../../prisma/client";
import { Resolvers } from "../types";

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
      const todos = await prisma.todo.findMany({
        orderBy: { id: Prisma.SortOrder.asc },
      });
      return todos;
    },
  },

  Mutation: {
    async createTodo(_, { input }) {
      const todo = await prisma.todo.create({
        data: {
          description: input.description,
          completed: input.completed ?? undefined,
        },
      });
      return todo;
    },

    async updateTodo(_, { input }) {
      const { id, ...data } = input;
      const todo = await prisma.todo.update({
        where: { id },
        data: {
          description: input.description ?? undefined,
          completed: input.completed ?? undefined,
        },
      });
      return todo;
    },

    async updateTodos(_, { input }) {
      const batch = await prisma.todo.updateMany({
        data: {
          completed: input.completed ?? undefined,
        },
      });
      return batch.count;
    },

    async deleteTodo(_, { id }) {
      await prisma.todo.delete({ where: { id } });
    },

    async deleteTodos(_, { completed }) {
      const where: Prisma.TodoWhereInput = {};
      await prisma.todo.deleteMany({
        where: {
          completed: completed ?? undefined,
        },
      });
    },
  },
};
