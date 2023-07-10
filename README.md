# ChatGPT marathon preparation plan generator

Live Site: [https://running-plan-chatgpt.up.railway.app/](https://running-plan-chatgpt.up.railway.app/)

**It is an experimental project that I created to learn how to use OpenAI API and to try out SurveyJS.**

## Table of contents

- [Overview](#overview)
- [The challenge](#the-challenge)
- [Built with](#built-with)
- [Author](#author)

## Overview

This is a simple app that generates a marathon preparation plan based on the user's answers to the questions of the survey. The app uses [SurveyJS](https://surveyjs.io/) to create a survey and [OpenAI API](https://platform.openai.com/docs/api-reference/introduction) to generate a plan based on the survey results.

## The challenge

Users should be able to:

- Answer questions about their running experience, goals, and preferences
- Get a marathon preparation plan based on their answers shown in calendar format

## Built with

- [TypeScript](https://www.typescriptlang.org/) - For type checking
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - For styles
- [SurveyJS](https://surveyjs.io/) - For creating a survey
- [OpenAI API](https://platform.openai.com/docs/api-reference/introduction) - For generating a plan based on the survey results
- [Full calendar](https://fullcalendar.io/) - For displaying the plan

### What I learned

Eventually, the application generates plans that, unfortunately, are not always good. Probably, for that task it would be better to use fine-tuning on a specific dataset or don’t use ML at all and create an algorithm with custom logic. Anyway, it was a good experience for me.

## Author

- Website - [Alex Efimenko](https://alexefimenko.com/)
- LinkedIn - [@aleksandr-efimenko](https://www.linkedin.com/in/aleksandr-efimenko/)
