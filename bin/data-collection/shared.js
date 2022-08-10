import os from "os";
import util from "util";
import { exec } from "child_process";
import chalk from "chalk";
const execAsync = util.promisify(exec);
const log = console.log;
const cErr = chalk.bold.red;
function cpuModel() {
    const cpuType = os.cpus();
    return cpuType[0].model ? cpuType[0].model : "Unknown CPU";
}
function totalRAMInGB() {
    const totalRAM = os.totalmem();
    // Get totalRAM in GB
    return totalRAM ? totalRAM / (1024 * 1024 * 1024) : 0;
}
function homedir() {
    const osHomedir = os.homedir();
    if (osHomedir)
        return osHomedir;
    return "Unknown";
}
function username() {
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
function checkCurrentShell() {
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
function checkCurrentShellZSH(currentShell, zshLoc) {
    const currentShellIsZSH = ((zshLoc === currentShell) && zshLoc.toLowerCase().includes("zsh"));
    return currentShellIsZSH;
}
export { cpuModel, totalRAMInGB, homedir, username, checkCurrentShell, executeCommand, checkCurrentShellZSH };
