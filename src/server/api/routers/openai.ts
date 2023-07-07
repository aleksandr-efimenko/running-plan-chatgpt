import { env } from "process";
import { z } from "zod";
import { Configuration, OpenAIApi } from "openai";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

const configuration = new Configuration({
  apiKey: env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const openaiRouter = createTRPCRouter({
  generateCompletion: publicProcedure
    .input(
      z.object({
        model: z.string(),
        prompt: z.string(),
        max_tokens: z.number(),
        temperature: z.number(),
      })
    )
    .query(async ({ input }) => {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Say this is a test",
        max_tokens: 7,
        temperature: 0,
      });
      return {
        response,
      };
    }),
});
