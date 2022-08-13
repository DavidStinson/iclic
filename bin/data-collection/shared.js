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
function getGitIgnLoc(homedir) {
    try {
        return fs.existsSync(`${homedir}/.gitignore_global`)
            ? `${homedir}/.gitignore_global`
            : "Unknown";
    }
    catch (error) {
        log(error);
        return "Unknown";
    }
}
async function getNodeVer() {
    try {
        const { stdout, stderr } = await execAsync("node --version");
        if (stderr)
            throw new Error(stderr);
        if (stdout) {
            const stdoutTrim = stdout.trim();
            return stdoutTrim[0] === "v" ? stdoutTrim.substring(1) : stdoutTrim;
        }
        return "Unknown";
    }
    catch (error) {
        log(cErr(error));
        return "Unknown";
    }
}
async function getGitVer() {
    try {
        const { stdout, stderr } = await execAsync("git --version");
        if (stderr)
            throw new Error(stderr);
        if (stdout) {
            const stdoutTrim = stdout.trim();
            return stdoutTrim.startsWith("git version")
                ? stdoutTrim.substring(12)
                : stdoutTrim;
        }
        return "Unknown";
    }
    catch (error) {
        log(cErr(error));
        return "Unknown";
    }
}
function getGitIgn(homedir) {
    try {
        const gitIgnText = fs.readFileSync(`${homedir}/.gitignore_global`, "utf8");
        const cleanedGitIgn = gitIgnText.split("\n").map(text => (!text.startsWith("#") ? text : "")).filter(text => text !== "").join("\n");
        return cleanedGitIgn;
    }
    catch (error) {
        log(error);
        return "Unknown";
    }
}
function getZshrc(homedir) {
    try {
        const zshrcText = fs.readFileSync(`${homedir}/.zshrc`, "utf8");
        const cleanedZshrcText = zshrcText.split("\n").map(text => (!text.startsWith("#") ? text : "")).filter(text => text !== "").join("\n");
        return cleanedZshrcText;
    }
    catch (error) {
        log(error);
        return "Unknown";
    }
}
async function executeCommand(command) {
    try {
        const { stdout, stderr } = await execAsync(command);
        if (stderr)
            throw new Error(stderr);
        if (stdout) {
            const stdoutTrim = stdout.trim();
            if (stdoutTrim)
                return stdoutTrim;
        }
        return "Unknown";
    }
    catch (error) {
        log(cErr(error));
        return "Unknown";
    }
}
export { getCPUModel, getTotalRAMInGB, getHomedir, getUsername, getCurrentShell, getGitIgnLoc, getNodeVer, getGitVer, getGitIgn, getZshrc, executeCommand, };
