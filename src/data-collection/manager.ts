import os from 'os'
import chalk from 'chalk'
import * as macOSData from './mac-os.js'
import * as wslLinuxData from './wsl-linux.js'
import * as sharedData from './shared.js'

const commandsForInstallData: CommandsForInstallData[] = [
  { dataKey: 'zshLoc', command: 'which zsh' },
  { dataKey: 'codeAlias', command: 'which code' },
  { dataKey: 'ghLoc', command: 'which gh' },
  { dataKey: 'npmLoc', command: 'which npm' },
  { dataKey: 'npmVer', command: 'npm --version' },
  { dataKey: 'nodeLoc', command: 'which node' },
  { dataKey: 'nodemonLoc', command: 'which nodemon' },
  { dataKey: 'nodemonVer', command: 'nodemon --version' },
  { dataKey: 'herokuLoc', command: 'which heroku' },
  { dataKey: 'gitLoc', command: 'which git' },
]

const commandsForConfigData: CommandsForConfigData[] = [
  { dataKey: 'gitEmail', command: 'git config --global user.email' },
  { dataKey: 'gitDefBranch', command: 'git config --global init.defaultBranch'},
  { dataKey: 'gitMergeBehavior', command: 'git config --global pull.rebase' },
  { dataKey: 'gitIgnConLoc', command: 'git config --global core.excludesfile' },
  { dataKey: 'gitIgnLoc', command: 'git config --global core.excludesfile' },
  { dataKey: 'gitIgn', command: 'cat ~/.gitignore_global' },
  { dataKey: 'zshrc', command: 'cat ~/.zshrc' },
]

async function dataManager(data: Data): Promise<Data> {
  switch (os.type()) {
    case 'Darwin': {
      data.machineData = getMacOSMachineData(data.machineData)
      data.installData = await getMacOSInstallData(data.installData)
      break
    }
    case 'Linux': {
      data.machineData = await getWSLLinuxMachineData(data.machineData)
      break
    }
    default: {
      console.log(chalk.bold.red('This OS is not supported.'))
      return process.exit()
    }
  }
  data.machineData = getGenMachineData(data.machineData)
  data.installData = await getGenInstallData(data.installData)
  data.configData = await getGenConfigData(
    data.configData,
    data.machineData.homedir
  )
  return data
}

function getMacOSMachineData(mD: MachineData): MachineData {
  mD.osName = 'macOS'
  mD.cpuType = macOSData.getCPUType()
  mD.osVersion = macOSData.getOSVersion()
  return mD
}

async function getMacOSInstallData(iD: InstallData): Promise<InstallData> {
  iD.vsCodeLoc = macOSData.getVSCodeLoc()
  iD.brewLoc = await sharedData.executeCommand('which brew')
  return iD
}

async function getWSLLinuxMachineData(mD: MachineData): Promise<MachineData> {
  const isWSL = wslLinuxData.getWSL()
  if (isWSL) {
    mD.osName = 'WSL2'
  } else {
    mD.osName = 'Linux'
    // TKTK NEED TO DO THIS
    // data.vtStatus =
  }
  mD.osVariant = await wslLinuxData.getDistro()
  mD.osVersion = await wslLinuxData.getOSVersion()
  return mD
}

function getGenMachineData(mD: MachineData): MachineData {
  mD.homedir = sharedData.getHomedir()
  mD.username = sharedData.getUsername()
  mD.cpuModel = sharedData.getCPUModel()
  mD.ramInGB = sharedData.getTotalRAMInGB()
  return mD
}

async function getGenInstallData(iD: InstallData): Promise<InstallData> {
  iD.shell = sharedData.getCurrentShell()
  iD.nodeVer = await sharedData.getNodeVer()
  iD.gitVer = await sharedData.getGitVer()
  for await (const { dataKey, command } of commandsForInstallData) {
    iD[dataKey] = await sharedData.executeCommand(command)
  }
  return iD
}

async function getGenConfigData(
  cD: ConfigData,
  homedir: string
): Promise<ConfigData> {
  cD.gitIgnLoc = sharedData.getGitIgnLoc(homedir)
  for await (const { dataKey, command } of commandsForConfigData) {
    cD[dataKey] = await sharedData.executeCommand(command)
  }
  cD.gitIgn = sharedData.getGitIgn(homedir)
  cD.zshrc = sharedData.getZshrc(homedir)
  return cD
}

export { dataManager }
