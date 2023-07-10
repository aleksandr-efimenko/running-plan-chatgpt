import { env } from "process";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { Configuration, OpenAIApi } from "openai";
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
    .mutation(async ({ input }) => {
      console.log(input);
      try {
        const completion = await openai.createChatCompletion({
          model: input.model,
          messages: [{ role: "user", content: input.prompt }],
          temperature: input.temperature,
          max_tokens: input.max_tokens,
        });

        return completion.data;
      } catch (error) {
        console.log(error);
      }
    }),
});
