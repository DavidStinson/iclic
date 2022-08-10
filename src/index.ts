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
}

const log = console.log
const cErr = chalk.bold.red
const data: Data = {
  osName: "Unknown OS",
  osVariant: "Unknown Variant",
  cpuModel: "Unknown CPU",
  ramInGB: 0
}

const osType = os.type()

switch(osType) {
  case 'Darwin': {
    data.osName = "macOS"
    data.cpuType = macOS.cpuType()
    data.osVariant = macOS.osVariant()
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

log(`Operating System: ${data.osName} ${data.osVariant}`)
if(data.osName === "macOS" && data.cpuType) log(`CPU Type: ${data.cpuType}`)
log(`CPU Model: ${data.cpuModel}`)
log(`Total RAM: ${data.ramInGB}GB`)


