import Joi from "joi"

import { error as renderError } from "../render/manager.js"
import * as schema from "./schemas.js"

function validateCLIInput(userData: UserData): UserData {
  Object.keys(userData).forEach(key => userData[key] = userData[key].trim())
  if (userData.gitHubEmail) {
    userData.gitHubEmail = validateStringField(
      userData.gitHubEmail,
      schema.gitHubEmail,
      "Invalid GitHub account email provided."
    )
  }
  if (userData.gitHubUsername) {
    userData.gitHubUsername = validateStringField(
      userData.gitHubUsername,
      schema.gitHubUsername,
      "Invalid GitHub username provided."
    )
  }
  if (userData.cohortId) {
    userData.cohortId = validateStringField(
      userData.cohortId,
      schema.cohortId,
      "Invalid cohort id provided."
    )
  }
  return userData
}

function validateStringField(
  field: string, 
  schema: Joi.StringSchema,
  errMsg = ""
): string {
  const { error, value } = schema.validate(field)
  if (error) {
    if (errMsg) renderError(errMsg)
    return ""
  } else {
    return value
  }
}

export {
  validateCLIInput,
  validateStringField
}
