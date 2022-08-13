#!/usr/bin/env node

import { dataManager } from './data-collection/manager.js'
import { validationManager } from './validation/manager.js'

const userData: UserData = {
  preferredName: 'Unknown',
  gitHubUsername: 'Unknown',
  gitHubEmail: 'Unknown',
  cohortID: 'Unknown',
}

const userValidation: UserValidation = {
  isValidCohortId: false,
  hasPreviousSubmission: false,
}

const machineData: MachineData = {
  osName: 'Unknown',
  osVersion: 'Unknown',
  homedir: 'Unkown',
  username: 'Unknown',
  cpuModel: 'Unknown',
  ramInGB: 0,
}

const machineValidation: MachineValidation = {
  isValidOSVersion: false,
  isMinRAM: false,
  isRecRAM: false,
}

const installData: InstallData = {
  zshLoc: 'Unknown',
  shell: 'Unknown',
  codeAlias: 'Unknown',
  ghLoc: 'Unknown',
  npmLoc: 'Unknown',
  npmVer: 'Unknown',
  nodeLoc: 'Unknown',
  nodeVer: 'Unknown',
  nodemonLoc: 'Unknown',
  nodemonVer: 'Unknown',
  herokuLoc: 'Unknown',
  gitLoc: 'Unknown',
  gitVer: 'Unknown',
}

const installValidation: InstallValidation = {
  isShellZSH: false,
  isValidCodeAlias: false,
  isValidNPMVer: false,
  isValidNodeVer: false,
  isValidNodemonVer: false,
  isValidGitVer: false,
}

const configData: ConfigData = {
  gitEmail: 'Unknown',
  gitDefBranch: 'Unknown',
  gitMergeBehavior: 'Unknown',
  gitIgnConLoc: 'Unknown',
  gitIgnLoc: 'Unknown',
  gitIgn: 'Unknown',
  zshrc: 'Unknown',
}

const configValidation: ConfigValidation = {
  gitEmailMatchesPrompt: false,
  isValidGitBranch: false,
  isValidGitMergeBehavior: false,
  isValidGitIgnConLoc: false,
  gitIgnExists: false,
  gitIgnHasContent: false,
  zshrcHasContent: false,
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
