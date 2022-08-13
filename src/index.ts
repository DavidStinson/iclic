#!/usr/bin/env node

import { dataManager } from "./data-collection/manager.js"
import { validationManager } from "./validation/manager.js"

const userData: UserData = {
  preferredName: "Unknown", // ! BLOCKED: ADD CLI PROMPT
  gitHubUsername: "Unknown", // ! BLOCKED: ADD CLI PROMPT
  gitHubEmail: "Unknown", // ! BLOCKED: ADD CLI PROMPT
  cohortID: "Unknown", // ! BLOCKED: ADD CLI PROMPT
}

const userValidation: UserValidation = {
  isValidCohortId: false, // ! BLOCKED: ADD CLI PROMPT
  hasPreviousSubmission: false, // ! BLOCKED: ADD CLI PROMPT 
}

const machineData: MachineData = {
  osName: "Unknown", // * done
  osVersion: "Unknown", // * done
  homedir: "Unkown", // * done
  username: "Unknown", // * done
  cpuModel: "Unknown", // * done
  ramInGB: 0, // * done
}

const machineValidation: MachineValidation = {
  isValidOSVersion: false, // * done
  isMinRAM: false, // * done
  isRecRAM: false, // * done
}

const installData: InstallData = {
  zshLoc: "Unknown", // * done
  shell: "Unknown",  // * done
  codeAlias: "Unknown", // * done
  ghLoc: "Unknown", // * done
  npmLoc: "Unknown", // * done
  npmVer: "Unknown", // * done
  nodeLoc: "Unknown", // * done
  nodeVer: "Unknown", // * done
  nodemonLoc: "Unknown", // * done
  nodemonVer: "Unknown", // * done
  herokuLoc: "Unknown", // * done
  gitLoc: "Unknown", // * done
  gitVer: "Unknown", // * done
}

const installValidation: InstallValidation = {
  isShellZSH: false, // * done
  isValidCodeAlias: false, 
  isValidNPMVer: false, // * done
  isValidNodeVer: false, // TODO: IN PROGRESS
  isValidNodemonVer: false, // TODO: IN PROGRESS
  isValidGitVer: false, // TODO: IN PROGRESS
}

const configData: ConfigData = {
  gitEmail: "Unknown", // * done
  gitDefBranch: "Unknown", // * done
  gitMergeBehavior: "Unknown", // * done
  gitIgnConLoc: "Unknown", // * done
  gitIgnLoc: "Unknown", // * done
  gitIgn: "Unknown", // * done
  zshrc: "Unknown", // * done
}

const configValidation: ConfigValidation = {
  gitEmailMatchesPrompt: false, // ! BLOCKED: ADD CLI PROMPT
  isValidGitBranch: false, // TODO: IN PROGRESS
  isValidGitMergeBehavior: false, // TODO: IN PROGRESS
  isValidGitIgnConLoc: false, // TODO: IN PROGRESS
  gitIgnExists: false, // TODO: IN PROGRESS
  gitIgnHasContent: false, // TODO: IN PROGRESS
  zshrcHasContent: false, // TODO: IN PROGRESS
}

const initialData: Data = {
  userData,
  userValidation,
  machineData,
  machineValidation,
  installData,
  installValidation,
  configData,
  configValidation,
}

async function main(data: Data) {
  const collectedData = await dataManager(data)
  const validatedData = await validationManager(collectedData)
  console.dir(validatedData)
}

main(initialData)
