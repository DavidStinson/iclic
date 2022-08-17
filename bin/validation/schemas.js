import Joi from 'joi';
const gitHubEmail = Joi.string().email({ tlds: { allow: false } });
const gitHubUsername = Joi.string().pattern(/[a-z0-9_-]{1,39}/i);
const cohortId = Joi.string().pattern(/SEI-[A-Z\d]{6}/);
export { gitHubEmail, gitHubUsername, cohortId };
