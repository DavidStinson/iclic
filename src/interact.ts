import inquirer from "inquirer"

const questions = [
  {
    type: "input",
    name: "preferredName",
    message: "What is your full preferred name?"
  },
  {
    type: "input",
    name: "gitHubUsername",
    message: "What is your GitHub Username?"
  },
  {
    type: "input",
    name: "gitHubEmail",
    message: "What is your the email address associated with your GitHub account?"
  },
]