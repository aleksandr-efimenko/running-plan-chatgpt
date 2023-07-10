import { useState } from "react";
import { api } from "~/utils/api";

export function CreateQuiz() {
  const [quizTitle, setQuizTitle] = useState("");
  const createQuizMutation = api.quiz.createQuiz.useMutation();
  async () => {
    const quiz = await createQuizMutation.mutateAsync({
      title: quizTitle,
    });
    console.log(quiz);
  };
  return (
    <>
      <h1 className="">Create Quiz</h1>
      <input
        type="text"
        value={quizTitle}
        onChange={(e) => setQuizTitle(e.target.value)}
      />
    </>
  );
}
