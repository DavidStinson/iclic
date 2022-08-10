#!/usr/bin/env node

import os from "os"
import chalk from "chalk"
import * as macOS from "./data-collection/mac-os.js"
import * as wslLinux from "./data-collection/wsl-linux.js"
import * as shared from "./data-collection/shared.js"
import * as validate from "./validation.js"

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
  await validation()
}

async function getMacOSData() {
  data.osName = "macOS"
  data.cpuType = macOS.getCPUType()
  data.osVariant = macOS.getOSVariant()
  data.isVSCodeInstalled = macOS.getVSCodeInstallation()
  data.brewLoc = await shared.executeCommand("which brew")
}

async function getLinuxData() {
  const isWSL = wslLinux.getWSL()
  if (isWSL) {
    data.osName = "WSL2"
  } else {
    data.osName = "Linux"
  }
  data.osVariant = await wslLinux.getDistro()
}

async function getGenericData() {
  data.cpuModel = shared.getCPUModel()
  data.ramInGB = shared.getTotalRAMInGB()
  data.homedir = shared.getHomedir()
  data.username = shared.getUsername()
  data.shell = shared.getCurrentShell()
  for await (const { dataKey, command } of commandsForData) {
    data[dataKey] = await shared.executeCommand(command)
  }
  data.codeAlias = await shared.executeCommand("which code")
}

async function validation() {
  data.isShellZSH = validate.checkCurrentShellZSH(data.shell, data.zshLoc)
}

main()