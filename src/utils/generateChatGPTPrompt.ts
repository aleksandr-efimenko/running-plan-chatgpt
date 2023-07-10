import mainQuizJson from "~/data/MainQuiz.json";

//use ids for answers and questions in case there will be changes in questions in the future
export function generateResultsForPromptChatGPT(
  quizResultsJson: Record<string, string | string[]>
) {
  let prompt = "Generate a marathon preparation plan: \n";

  // for each question in the quiz get the answer and add it to the prompt
  for (const [questionId, answerIds] of Object.entries(quizResultsJson)) {
    const fullQuestion = mainQuizJson.Quiz.questions.find(
      (question) => question.id === questionId
    );

    if (fullQuestion?.type === "radiogroup") {
      const answerPrompt = fullQuestion?.answers.find(
        (answer) => answerIds === answer.id
      )?.prompt;
      prompt += `-${answerPrompt || ""};\n`;
    }
    if (fullQuestion?.type === "checkbox") {
      const answerPrompts = fullQuestion?.answers
        .filter((answer) => (answerIds as string[]).includes(answer.id))
        .map((answer) => answer.prompt);
      prompt += `-${answerPrompts.join(", ")};\n`;
    }
  }

  //get tomorrow date and add it to the prompt
  const date = new Date();
  date.setDate(date.getDate() + 1);
  const tomorrowDate = date.toISOString().split("T")[0];
  prompt += `-The first training is on ${tomorrowDate || "tomorrow"};\n`;
  prompt += `-Plan can contain but not limited to: 
      (Easy Run, Interval Training, Long Run, Tempo Run) 
      and must contain description of the training with minimum of 5 words;\n`;
  prompt += "-Do not mention rest days;\n";
  prompt += "-The training days must be spread evenly;\n";
  prompt += "In the .csv format: \n";
  prompt += "date,training \n";
  prompt += "yyyy-mm-dd,{RUNNING_TYPE}: {DISTANCE} {DESCRIPTION};\n";
  prompt += "Or for cross-training;\n";
  prompt += "yyyy-mm-dd,{TRAINING_TYPE}: {DURATION} {DESCRIPTION};\n";

  return prompt;
}
