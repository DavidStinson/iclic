#!/usr/bin/env node

import { dataManager } from './data-collection/manager.js'
import { validationManager } from './validation/manager.js'
import { Command } from 'commander'

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
  gitEditor: 'Unknown',
  gitIgnConLoc: 'Unknown',
  gitIgnLoc: 'Unknown',
  gitIgn: '',
  zshrc: '',
}

const configValidation: ConfigValidation = {
  gitEmailMatchesPrompt: false,
  isValidGitBranch: false,
  isValidGitMergeBehavior: false,
  isValidGitEditor: false,
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

async function main() {
  const cL = new Command()

  cL.version('1.0.0', '-v, --version', 'Outputs the current version.')
  cL.name('iclic')
  cL.description('A command line application for validating an installfest.')

  cL.command("test", { isDefault: true })
    .description(
      "Test your installfest configuration before submitting it. This is the default behavior of the application when run from the base iclic command."
    )
    .action(async () => {
      await base(initialData)
    })
  cL.command("submit")
    .description(
      "Submit your installfest configuration. You'll be asked some basic information and then submit your installfest configuration to be reviewed. Don't worry, you can resubmit your configuration again if you make changes later."
    )
    .action(async () => {
      await base(initialData)
    })

  cL.parse()
}

async function base(data: Data): Promise<void> {
  const collectedData = await dataManager(data)
  const validatedData = await validationManager(collectedData)
  console.dir(validatedData)
  console.dir(validatedData.installValidation)
}

main()
