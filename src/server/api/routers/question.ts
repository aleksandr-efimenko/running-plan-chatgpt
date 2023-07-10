import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const questionRouter = createTRPCRouter({
  createQuestion: publicProcedure
    .input(z.object({ title: z.string(), quizId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const newQuestion = await ctx.prisma.question.create({
        data: {
          title: input.title,
          quizId: input.quizId,
        },
      });

      return newQuestion;
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.question.findMany();
  }),
});
