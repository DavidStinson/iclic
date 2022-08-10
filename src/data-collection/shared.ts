import os from "os"
import util from "util"
import { exec } from "child_process"
import chalk from "chalk"

const execAsync = util.promisify(exec)

const log = console.log
const cErr = chalk.bold.red

function getCPUModel(): string {
  const cpuType = os.cpus()
  return cpuType[0].model ? cpuType[0].model : "Unknown CPU"
}

function getTotalRAMInGB(): number {
  const totalRAM = os.totalmem()
  // Get totalRAM in GB
  return totalRAM ? totalRAM / (1024 * 1024 * 1024) : 0
}

function getHomedir(): string {
  const osHomedir = os.homedir()
  if (osHomedir) return osHomedir
  return "Unknown"
}

function getUsername() {
  try {
    const currentUsername = os.userInfo().username
    if (currentUsername) return currentUsername
    return "Unknown"
  } catch (error) {
    return "Unknown"
  }
}

function getCurrentShell(): string {
  try {
    const currentShell = os.userInfo().shell
    if (currentShell) return currentShell
    return "Unknown"
  } catch (error) {
    return "Unknown"
  }
}

async function executeCommand(command: string): Promise<string> {
  try {
    const { stdout, stderr } = await execAsync(command)
    if(stderr) throw new Error(stderr);
    const stdoutTrim = stdout.trim()
    if(stdoutTrim) return stdoutTrim
    return "Unknown"
  } catch (error) {
    log(cErr(error))
    return "Unknown"
  }
}

export {
  getCPUModel,
  getTotalRAMInGB,
  getHomedir,
  getUsername,
  getCurrentShell,
  executeCommand,
}