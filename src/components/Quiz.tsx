import { useCallback } from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";

const surveyJson = {
  elements: [
    {
      name: "FirstName",
      title: "Enter your first name:",
      type: "text",
    },
    {
      name: "LastName",
      title: "Enter your last name:",
      type: "text",
    },
  ],
};

export function Quiz() {
  const survey = new Model(surveyJson);
  //   const surveyComplete = useCallback((sender) => {
  //     saveSurveyResults("https://your-web-service.com/" + SURVEY_ID, sender.data);
  //   }, []);

  //   survey.onComplete.add(surveyComplete);
  return <Survey model={survey} />;
}

function saveSurveyResults(url: string, json: any) {
  const request = new XMLHttpRequest();
  request.open("POST", url);
  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  request.addEventListener("load", () => {
    // Handle "load"
  });
  request.addEventListener("error", () => {
    // Handle "error"
  });
  request.send(JSON.stringify(json));
}
