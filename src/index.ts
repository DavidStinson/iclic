#!/usr/bin/env node

import os from "os"
import chalk from "chalk"
import * as macOS from "./mac-os.js"
import * as wslLinux from "./wsl-linux.js"

interface Data {
  osName: string;
  osVariant: string;
  cpuType?: string;
  cpuModel: string;

}

const log = console.log
const cErr = chalk.bold.red
const data: Data = {
  osName: "Unknown OS",
  osVariant: "Unknown Variant",
  cpuModel: "Unkown CPU"
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

log(`Operating System: ${data.osName}, ${data.osVariant}`)
