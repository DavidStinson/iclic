import os from "os";
import fs from 'fs';
import util from "util";
import { exec } from "child_process";
import chalk from "chalk";
const execAsync = util.promisify(exec);
const log = console.log;
const cErr = chalk.bold.red;
function getCPUModel() {
    const cpuType = os.cpus();
    return cpuType[0].model ? cpuType[0].model : "Unknown CPU";
}
function getTotalRAMInGB() {
    const totalRAM = os.totalmem();
    // Get totalRAM in GB
    return totalRAM ? totalRAM / (1024 * 1024 * 1024) : 0;
}
function getHomedir() {
    const osHomedir = os.homedir();
    if (osHomedir)
        return osHomedir;
    return "Unknown";
}
function getUsername() {
    try {
        const currentUsername = os.userInfo().username;
        if (currentUsername)
            return currentUsername;
        return "Unknown";
    }
    catch (error) {
        return "Unknown";
    }
}
function getCurrentShell() {
    try {
        const currentShell = os.userInfo().shell;
        if (currentShell)
            return currentShell;
        return "Unknown";
    }
    catch (error) {
        return "Unknown";
    }
}
function getGitIgnoreExists(homedir) {
    try {
        return fs.existsSync(`${homedir}/.gitignore_global`) ? true : false;
    }
    catch (error) {
        log(error);
        return false;
    }
}
async function executeCommand(command) {
    try {
        const { stdout, stderr } = await execAsync(command);
        if (stderr)
            throw new Error(stderr);
        const stdoutTrim = stdout.trim();
        if (stdoutTrim)
            return stdoutTrim;
        return "Unknown";
    }
    catch (error) {
        log(cErr(error));
        return "Unknown";
    }
}
export { getCPUModel, getTotalRAMInGB, getHomedir, getUsername, getCurrentShell, executeCommand, getGitIgnoreExists, };
