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
  npmVer: '-1',
  nodeLoc: 'Unknown',
  nodeVer: '-1',
  nodemonLoc: 'Unknown',
  nodemonVer: '-1',
  herokuLoc: 'Unknown',
  gitLoc: 'Unknown',
  gitVer: '-1',
}

const installValidation: InstallValidation = {
  isShellZSH: false,
  isValidCodeAlias: false,
  versions: [
    { name: "npmVer", vName: "npmVer", isValid: false },
    { name: "nodeVer", vName: "nodeVer", isValid: false },
    { name: "nodemonVer", vName: "nodemonVer", isValid: false },
    { name: "gitVer", vName: "gitVer", isValid: false },
  ]
}

const configData: ConfigData = {
  gitEmail: 'Unknown',
  gitDefBranch: 'Unknown',
  gitMergeBehavior: 'Unknown',
  gitIgnConLoc: 'Unknown',
  gitIgnLoc: 'Unknown',
  gitIgn: '',
  zshrc: '',
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
  console.dir(validatedData.installValidation)
}

main(initialData)
