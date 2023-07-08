import "survey-core/modern.min.css";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import mainQuizJson from "~/data/MainQuiz.json";
import { useCallback, useState } from "react";
import { generateResultsForPromptChatGPT } from "~/utils/generateChatGPTPrompt";
import { api } from "~/utils/api";
import { convertCsvToJson } from "~/utils/convertCsvToJson";

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
    max_tokens: 8000,
    temperature: 0.5,
  };
};

export default function MainQuiz() {
  const [generatedPlan, setGeneratedPlan] = useState<string>("");
  const survey = new Model(surveyJson);
  const generatePlanMutation = api.openai.generateCompletion.useMutation();
  const surveyComplete = useCallback(async (sender: any) => {
    const requestForChatGPT = generateResultsForPromptChatGPT(sender.data);
    console.log(requestForChatGPT);
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
    const generatedPlanJSON = convertCsvToJson(
      generatedData.choices[0]?.message?.content
    );
    setGeneratedPlan(JSON.stringify(generatedPlanJSON));
  }, []);

  survey.onComplete.add(surveyComplete);
  return (
    <>
      <Survey model={survey} />
      {!!generatedPlan && (
        <div className="mb-16">
          <h2 className="text-2xl">Generated Plan</h2>
          <p>{generatedPlan}</p>
        </div>
      )}
      {generatePlanMutation.isLoading && <p>Generating Plan...</p>}
    </>
  );
}
