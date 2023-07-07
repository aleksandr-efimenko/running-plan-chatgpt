import "survey-core/modern.min.css";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import mainQuizJson from "~/data/MainQuiz.json";

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

export default function MainQuiz() {
  const survey = new Model(surveyJson);
  return <Survey model={survey} />;
}
