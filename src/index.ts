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
}

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
  isVSCodeInstalled: false,
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

const osType = os.type()

switch(osType) {
  case 'Darwin': {
    data.osName = "macOS"
    data.cpuType = macOS.cpuType()
    data.osVariant = macOS.osVariant()
    data.isVSCodeInstalled = macOS.vsCodeInstalled()
    data.brewLoc = await shared.executeCommand("which brew")
    break;
  }
  case 'Linux': {
    const isWSL = wslLinux.checkForWSL()
    if (isWSL) {
      data.osName = "WSL2"
    } else {
      data.osName = "Linux"
    }
    data.osVariant = await wslLinux.checkDistro()
    break;
  }
  default: {
    log(cErr("This OS is not supported"));
    process.exit()
  }
}

data.cpuModel = shared.cpuModel()
data.ramInGB = shared.totalRAMInGB()
data.homedir = shared.homedir()
data.username = shared.username()
async function runAsync() {
  data.shell = shared.checkCurrentShell()
  data.zshLoc = await shared.executeCommand("which zsh")
  data.isShellZSH = shared.checkCurrentShellZSH(data.shell, data.zshLoc)
  log(`Shell: ${data.shell}`)
  log(`ZSH Location: ${data.zshLoc}`)
  log(`Shell is ZSH: ${data.isShellZSH}`)
  data.codeAlias = await shared.executeCommand("which code")
  log(`code alias: ${data.codeAlias}`)
  data.ghLoc = await shared.executeCommand("which gh")
  data.npmLoc = await shared.executeCommand("which npm")
  data.npmVer = await shared.executeCommand("npm --version")
  data.nodeLoc = await shared.executeCommand("which node")
  data.nodeVer = await shared.executeCommand("node --version")
  data.nodemonLoc = await shared.executeCommand("which nodemon")
  data.nodemonVer = await shared.executeCommand("nodemon --version")
  data.herokuLoc = await shared.executeCommand("which heroku")
  data.gitLoc = await shared.executeCommand("which git")
  data.gitVer = await shared.executeCommand("git --version")
  data.gitEmail = await shared.executeCommand("git config --global user.email")
  data.gitBranch = await shared.executeCommand("git config --global init.defaultBranch")
  data.gitMerge = await shared.executeCommand("git config --global pull.rebase")
  data.gitIgnore = await shared.executeCommand("git config --global core.excludesfile")
  data.gitIgnoreGlobal = await shared.executeCommand("cat ~/.gitignore_global")
  data.zshrc = await shared.executeCommand("cat ~/.zshrc")
  console.dir(data)
}
runAsync()



log(`Operating System: ${data.osName} ${data.osVariant}`)
if(data.osName === "macOS" && data.cpuType) log(`CPU Type: ${data.cpuType}`)
if(data.osName === "macOS" && data.isVSCodeInstalled) log(`VS Code installed`)
if(data.osName === "macOS" && data.brewLoc) log(`Homebrew: ${data.brewLoc}`)
log(`CPU Model: ${data.cpuModel}`)
log(`Total RAM: ${data.ramInGB}GB`)
log(`Username: ${data.username}`)
log(`Home Directory: ${data.homedir}`)


