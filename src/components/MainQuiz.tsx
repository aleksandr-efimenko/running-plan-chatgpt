import "survey-core/modern.min.css";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import mainQuizJson from "~/data/MainQuiz.json";
import { useCallback, useState } from "react";
import { generateResultsForPromptChatGPT } from "~/utils/generateChatGPTPrompt";
import { api } from "~/utils/api";
import { convertCsvToObject } from "~/utils/convertCsvToJson";
import { AnimatedSpinner } from "./AnimatedSpinner";
import { RunningPlanData, PlanRepresentation } from "./TablePlanRepresentation";

const surveyJson = {
  elements: mainQuizJson.Quiz.questions.map((question) => {
    return {
      name: question.id,
      title: question.title,
      type: "radiogroup",
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
    max_tokens: 100,
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
  const surveyComplete = useCallback(async (sender: any) => {
    const requestForChatGPT = generateResultsForPromptChatGPT(sender.data);
    console.log(requestForChatGPT);
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

    console.log(generatedData);
    if (!generatedData || !generatedData.choices) return;
    const generatedPlanJSON = convertCsvToObject(
      generatedData.choices[0]?.message?.content
    );
    setGeneratedPlan(generatedPlanJSON);
  }, []);

  survey.onComplete.add(surveyComplete);
  return (
    <>
      {quizVisible && <Survey model={survey} />}
      {!quizVisible && !generatePlanMutation.isLoading && (
        <>
          <div className="mb-16">
            <h2 className="text-center text-2xl">Generated Plan</h2>
            <PlanRepresentation plan={generatedPlan} />
          </div>
        </>
      )}

      {generatePlanMutation.isLoading && <AnimatedSpinner />}
    </>
  );
}
