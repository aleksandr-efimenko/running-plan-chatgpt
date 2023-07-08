import mainQuizJson from "~/data/MainQuiz.json";

//use ids for answers and questions in case there will be changes in questions in the future
export function generateResultsForPromptChatGPT(json: Record<string, string>) {
  let prompt = "Generate a marathon preparation plan: \n";
  const { questions } = mainQuizJson.Quiz;

  for (const questionId of Object.keys(json)) {
    const question = questions.find(
      (questionFromList) => questionFromList.id === questionId
    );
    if (!question) continue;

    const answer = question.answers.find(
      (answer) => answer.id === json[questionId]
    );
    if (!answer || !answer.prompt) continue;

    prompt += `-${answer.prompt};\n`;
  }
  //get tomorrow date and add it to the prompt
  const date = new Date();
  date.setDate(date.getDate() + 1);
  const tomorrowDate = date.toISOString().split("T")[0];
  prompt += `-Start training on ${tomorrowDate};\n`;
  prompt += `-Plan can contain but not limited to: (Cross-Training, 
      Easy Run, Interval Training, Long Run, Tempo Run, Stretching) 
      and must contain description of the training with minimum of 5 words;\n`;
  prompt += "-Do not mention rest days;\n";
  prompt += "-Show date in the format: yyyy-mm-dd;\n";
  prompt += "In the .csv format: \n";
  prompt += "date,training_description \n";

  return prompt;
}
