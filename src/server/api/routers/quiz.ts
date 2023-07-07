import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const quizRouter = createTRPCRouter({
  createQuiz: publicProcedure
    .input(z.object({ title: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const newQuiz = await ctx.prisma.quiz.create({
        data: {
          title: input.title,
        },
      });

      return newQuiz;
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.quiz.findMany();
  }),
});
