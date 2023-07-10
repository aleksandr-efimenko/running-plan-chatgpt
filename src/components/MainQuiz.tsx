import "survey-core/modern.min.css";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import mainQuizJson from "~/data/MainQuiz.json";
import { useCallback, useState } from "react";
import { generateResultsForPromptChatGPT } from "~/utils/generateChatGPTPrompt";
import { api } from "~/utils/api";
import { convertCsvToObject } from "~/utils/convertCsvToJson";
import { AnimatedSpinner } from "./AnimatedSpinner";
import { type RunningPlanData, PlanRepresentation } from "./PlanRepresentation";

export const surveyJson = {
  title: "Create your personal marathon preparation plan",

  elements: mainQuizJson.Quiz.questions.map((question) => {
    return {
      name: question.id,
      title: question.title,
      type: question.type,
      visibleIf: question.visibleIf,
      isRequired: true,
      choices: question.answers.map((answer) => {
        return {
          value: answer.id,
          text: answer.title,
        };
      }),
    };
  }),
};

export type ChatGPTQuery = {
  model: string;
  prompt: string;
  max_tokens: number;
  temperature: number;
};
const generateChatGPTQuery = (prompt: string): ChatGPTQuery => {
  return {
    model: "gpt-4",
    prompt,
    max_tokens: 1000,
    temperature: 0.7,
  };
};

export default function MainQuiz() {
  const [generatedPlan, setGeneratedPlan] = useState<RunningPlanData[]>(
    [] as RunningPlanData[]
  );
  const [quizVisible, setQuizVisible] = useState<boolean>(true);
  const survey = new Model(surveyJson);
  const generatePlanMutation = api.openai.generateCompletion.useMutation();
  const surveyComplete = useCallback(
    //eslint-disable-next-line
    async (sender: any) => {
      //eslint-disable-next-line
      const requestForChatGPT = generateResultsForPromptChatGPT(sender.data);
      setQuizVisible(false);
      //create a query for the chat gpt with model, prompt, max_tokens, temperature
      const query = generateChatGPTQuery(requestForChatGPT);

      //call the api with the query
      const generatedData = await generatePlanMutation.mutateAsync({
        model: query.model,
        prompt: requestForChatGPT,
        max_tokens: query.max_tokens,
        temperature: query.temperature,
      });

      if (!generatedData || !generatedData.choices) return;
      const generatedPlanJSON = convertCsvToObject(
        generatedData.choices[0]?.message?.content || ""
      );
      setGeneratedPlan(generatedPlanJSON);
    },
    [generatePlanMutation]
  );

  survey.onComplete.add(surveyComplete);
  return (
    <>
      {quizVisible && <Survey model={survey} />}
      {!quizVisible && !generatePlanMutation.isLoading && (
        <>
          <div className="container mb-32 mt-16 w-full">
            <h2 className="text-center text-2xl">Generated Plan</h2>
            <PlanRepresentation plan={generatedPlan} />
          </div>
        </>
      )}

      {generatePlanMutation.isLoading && (
        <>
          <div className="container my-16 flex w-full flex-col gap-10">
            <div className="">
              <h2 className="animate-pulse text-center text-2xl">
                Generating your preparation plan...
              </h2>
              <h2 className="animate-pulse text-center text-lg">
                It might take a while, please be patient.
              </h2>
            </div>
            <AnimatedSpinner />
          </div>
        </>
      )}
    </>
  );
}
