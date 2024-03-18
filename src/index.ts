#!/usr/bin/env node

import { Command } from 'commander'
import ora from 'ora'

import { validateCLIInput } from './validation/input.js'
import {
  collectInstallData,
  collectUserData,
} from './data-collection/manager.js'
import { validationManager } from './validation/manager.js'
import { renderData } from './render/manager.js'

const userData: UserData = {
  preferredName: '',
  gitHubUsername: '',
  gitHubEmail: '',
  cohortId: '',
}

const userValidation: UserValidation = {
  isUser: false,
  isValidCohortId: false,
  hasPreviousSubmission: false,
  cohortName: '',
}

const machineData: MachineData = {
  osName: 'Unknown',
  osVersion: 'Unknown',
  homedir: 'Unknown',
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
  nvmInstallStatus: 'Unknown',
  nodeLoc: 'Unknown',
  nodeVer: '-1',
  nodemonLoc: 'Unknown',
  nodemonVer: '-1',
  gitLoc: 'Unknown',
  gitVer: '-1',
}

const installValidation: InstallValidation = {
  isShellZSH: false,
  isValidCodeAlias: false,
  isValidGHLoc: false,
  isNVMInstalled: false,
  versions: [
    { name: 'nodeVer', vName: 'nodeVer', isValid: false },
    { name: 'nodemonVer', vName: 'nodemonVer', isValid: false },
    { name: 'gitVer', vName: 'gitVer', isValid: false },
  ],
}

const configData: ConfigData = {
  gitEmail: '',
  ghLoginStatus: '',
  gitDefBranch: '',
  gitMergeBehavior: '',
  gitEditor: '',
  gitIgnConLoc: '',
  gitIgnLoc: '',
  gitIgn: '',
  zshrc: '',
}

const configValidation: ConfigValidation = {
  isLoggedIntoGH: false,
  isValidGitEmail: false,
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

  cL.version('0.3.2', '-v, --version', 'Outputs the current version.')
  cL.name('iclic')
  cL.description('A command line application for validating an installfest.')

  cL.command('test', { isDefault: true })
    .description(
      'Test your installfest configuration before submitting it. This is the default behavior of the application when run from the base iclic command.'
    )
    .action(async () => {
      const dataSpinner = ora({
        text: 'Collecting System Configuration',
        spinner: 'triangle',
      })
      dataSpinner.start()
      const collectedData = await getInstallState(initialData)
      dataSpinner.succeed('System Configuration Retrieved')
      await renderData(collectedData)
    })
  cL.command('submit')
    .description(
      "Submit your installfest configuration. You'll be asked some basic information and then submit your installfest configuration to be reviewed. Don't worry, you can resubmit your configuration again if you make changes later."
    )
    .option('-n, --preferredName <name>', 'Your preferred name.')
    .option('-u, --gitHubUsername <username>', 'Your GitHub username.')
    .option(
      '-g, --gitHubEmail <email-address>',
      'The email address associated with your GitHub account.'
    )
    .option(
      '-c, --cohortId <cohort-id>',
      'The cohort ID provided to you by your instructor.'
    )
    .action(async cliOptions => {
      const validatedCLIOptions = validateCLIInput(cliOptions)
      initialData.userData = { ...userData, ...validatedCLIOptions }
      if (Object.values(initialData.userData).some(val => !val)) {
        initialData.userData = await collectUserData(initialData.userData)
      }
      initialData.userValidation.isUser = true
      const dataSpinner = ora({
        text: 'Collecting System Configuration',
        spinner: 'triangle',
      })
      dataSpinner.start()
      const collectedData = await getInstallState(initialData)
      dataSpinner.succeed('System Configuration Retrieved')
      await renderData(collectedData)
    })
  cL.parse()
}

async function getInstallState(data: Data): Promise<Data> {
  const collectedData = await collectInstallData(data)
  const validatedData = await validationManager(collectedData)
  return validatedData
}

main()
