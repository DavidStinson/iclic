#!/usr/bin/env node

import os from "os"
import chalk from "chalk"
import * as macOS from "./mac-os.js"
import * as wslLinux from "./wsl-linux.js"
import * as shared from "./shared.js"

interface Data {
  osName: string;
  osVariant: string;
  cpuType?: string;
  cpuModel: string;
  ramInGB: number;
  homedir: string;
  username: string;
  zshLoc: string;
  shell: string;
  isShellZSH: boolean;
  isVSCodeInstalled?: boolean;
  codeAlias: string;
  brewLoc?: string;
  ghLoc: string;
  npmLoc: string;
  npmVer: string;
  nodeLoc: string;
  nodeVer: string;
  nodemonLoc: string;
  nodemonVer: string;
  herokuLoc: string;
  gitLoc: string;
  gitVer: string;
  gitEmail: string;
  gitBranch: string;
  gitMerge: string;
  gitIgnore: string;
  gitIgnoreGlobal: string;
  zshrc: string;
  [key: string]: string | number | boolean | undefined;
}

interface CommandsForData {
  dataKey: keyof Data;
  command: string;
}

const osType = os.type()
const log = console.log
const cErr = chalk.bold.red

const data: Data = {
  osName: "Unknown",
  osVariant: "Unknown",
  cpuModel: "Unknown",
  ramInGB: 0,
  homedir: "Unknown",
  username: "Unknown",
  zshLoc: "Unknown",
  shell: "Unknown",
  isShellZSH: false,
  codeAlias: "Unknown",
  ghLoc: "Unknown",
  npmLoc: "Unknown",
  npmVer: "Unknown",
  nodeLoc: "Unknown",
  nodeVer: "Unknown",
  nodemonLoc: "Unknown",
  nodemonVer: "Unknown",
  herokuLoc: "Unknown",
  gitLoc: "Unknown",
  gitVer: "Unknown",
  gitEmail: "Unknown",
  gitBranch: "Unknown",
  gitMerge: "Unknown",
  gitIgnore: "Unknown",
  gitIgnoreGlobal: "Unknown",
  zshrc: "Unknown",
}

const commandsForData: CommandsForData[] = [
  {dataKey: "zshLoc", command: "which zsh"},
  {dataKey: "codeAlias", command: "which code"},
  {dataKey: "ghLoc", command: "which gh"},
  {dataKey: "npmLoc", command: "which npm"},
  {dataKey: "npmVer", command: "npm --version"},
  {dataKey: "nodeLoc", command: "which node"},
  {dataKey: "nodeVer", command: "node --version"},
  {dataKey: "nodemonLoc", command: "which nodemon"},
  {dataKey: "nodemonVer", command: "nodemon --version"},
  {dataKey: "herokuLoc", command: "which heroku"},
  {dataKey: "gitLoc", command: "which git"},
  {dataKey: "gitVer", command: "git --version"},
  {dataKey: "gitEmail", command: "git config --global user.email"},
  {dataKey: "gitBranch", command: "git config --global init.defaultBranch"},
  {dataKey: "gitMerge", command: "git config --global pull.rebase"},
  {dataKey: "gitIgnore", command: "git config --global core.excludesfile"},
  {dataKey: "gitIgnoreGlobal", command: "cat ~/.gitignore_global"},
  {dataKey: "zshrc", command: "cat ~/.zshrc"},
]

async function main() {
  switch(osType) {
    case 'Darwin': {
      getMacOSData()
      break;
    }
    case 'Linux': {
      getLinuxData()
      break;
    }
    default: {
      log(cErr("This OS is not supported"));
      return process.exit()
    }
  }
  await getGenericData()
  console.dir(data)
}

async function getMacOSData() {
  data.osName = "macOS"
  data.cpuType = macOS.cpuType()
  data.osVariant = macOS.osVariant()
  data.isVSCodeInstalled = macOS.vsCodeInstalled()
  data.brewLoc = await shared.executeCommand("which brew")
}

async function getLinuxData() {
  const isWSL = wslLinux.checkForWSL()
  if (isWSL) {
    data.osName = "WSL2"
  } else {
    data.osName = "Linux"
  }
  data.osVariant = await wslLinux.checkDistro()
}

async function getGenericData() {
  data.cpuModel = shared.cpuModel()
  data.ramInGB = shared.totalRAMInGB()
  data.homedir = shared.homedir()
  data.username = shared.username()
  data.shell = shared.checkCurrentShell()
  for await (const { dataKey, command } of commandsForData) {
    data[dataKey] = await shared.executeCommand(command)
  }
  data.codeAlias = await shared.executeCommand("which code")
  data.isShellZSH = shared.checkCurrentShellZSH(data.shell, data.zshLoc)
}

main()