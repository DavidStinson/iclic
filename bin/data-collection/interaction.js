import inquirer from "inquirer";
import * as schemas from "../validation/schemas.js";
import { validateStringField } from "../validation/input.js";
const userQuestions = [
    {
        type: "input",
        name: "preferredName",
        message: "What is your full preferred name?",
        filter(val) {
            return val.trim();
        },
        validate(val) {
            return val ? true : "Please provide a preferred name";
        },
    },
    {
        type: "input",
        name: "gitHubUsername",
        message: "What is your GitHub Username?",
        filter(val) {
            return val.trim();
        },
        validate(val) {
            const validVal = validateStringField(val, schemas.gitHubUsername);
            return validVal ? true : "Please provide a valid GitHub Username.";
        }
    },
    {
        type: "input",
        name: "gitHubEmail",
        message: "What's the email address associated with your GitHub account?",
        filter(val) {
            return val.trim();
        },
        validate(val) {
            const validVal = validateStringField(val, schemas.gitHubEmail);
            return validVal ? true : "Please provide a valid email address.";
        },
    },
    {
        type: "input",
        name: "cohortId",
        message: "What is the cohort ID you were given?",
        filter(val) {
            return val.trim();
        },
        validate(val) {
            const validVal = validateStringField(val, schemas.cohortId);
            // TKTK CHECK THAT COHORT EXISTS
            return validVal ? true : "Plase provide a valid cohort ID.";
        },
    }
];
async function getUserData(userData) {
    const questions = buildUserQuestions(userData);
    try {
        const answers = await inquirer.prompt(questions);
        userData = { ...userData, ...answers };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        if (error.isTtyError) {
            console.log("Prompt couldn't be rendered, use command options instead!");
        }
    }
    return userData;
}
function buildUserQuestions(userData) {
    const questions = [];
    const unansweredQs = Object.keys(userData).filter(key => !userData[key]);
    unansweredQs.forEach(question => {
        const newQ = userQuestions.find(userQ => userQ.name === question);
        if (newQ)
            questions.push(newQ);
    });
    return questions;
}
export { getUserData };
