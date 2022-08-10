import os from "os"
import util from "util"
import { exec } from "child_process"
import chalk from "chalk"

const execAsync = util.promisify(exec)

const log = console.log
const cErr = chalk.bold.red

function cpuModel(): string {
  const cpuType = os.cpus()
  return cpuType[0].model ? cpuType[0].model : "Unknown CPU"
}

function totalRAMInGB(): number {
  const totalRAM = os.totalmem()
  // Get totalRAM in GB
  return totalRAM ? totalRAM / (1024 * 1024 * 1024) : 0
}

function homedir(): string {
  const osHomedir = os.homedir()
  if (osHomedir) return osHomedir
  return "Unknown"
}

function checkCurrentShell(): string {
  try {
    const currentShell = os.userInfo().shell
    if (currentShell) return currentShell
    return "Unknown"
  } catch (error) {
    return "Unknown"
  }
}

async function checkForZSH(): Promise<string> {
  try {
    const { stdout, stderr } = await execAsync("which zsh")
    if(stderr) throw new Error(stderr);
    const whichZSH = stdout.trim()
    if(whichZSH) return whichZSH
    return "Unknown"
  } catch (error) {
    log(cErr(error))
    return "Unknown"
  }
}

function checkCurrentShellZSH(currentShell: string, zshLoc: string): boolean {
  const currentShellIsZSH = (
    (zshLoc === currentShell) && zshLoc.toLowerCase().includes("zsh")
  )
  return currentShellIsZSH
}

export {
  cpuModel,
  totalRAMInGB,
  homedir,
  checkCurrentShell,
  checkForZSH,
  checkCurrentShellZSH
}