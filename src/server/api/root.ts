import { exampleRouter } from "~/server/api/routers/example";
import { createTRPCRouter } from "~/server/api/trpc";
import { quizRouter } from "./routers/quiz";
import { questionRouter } from "./routers/question";
import { answerRouter } from "./routers/answers";
import { openaiRouter } from "./routers/openai";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  quiz: quizRouter,
  question: questionRouter,
  answer: answerRouter,
  openai: openaiRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
