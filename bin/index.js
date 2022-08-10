#!/usr/bin/env node
import os from "os";
import chalk from "chalk";
import * as macOS from "./mac-os.js";
import * as wslLinux from "./wsl-linux.js";
import * as shared from "./shared.js";
const log = console.log;
const cErr = chalk.bold.red;
const data = {
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
};
const osType = os.type();
switch (osType) {
    case 'Darwin': {
        data.osName = "macOS";
        data.cpuType = macOS.cpuType();
        data.osVariant = macOS.osVariant();
        data.isVSCodeInstalled = macOS.vsCodeInstalled();
        data.brewLoc = await shared.executeCommand("which brew");
        break;
    }
    case 'Linux': {
        const isWSL = wslLinux.checkForWSL();
        if (isWSL) {
            data.osName = "WSL2";
        }
        else {
            data.osName = "Linux";
        }
        data.osVariant = await wslLinux.checkDistro();
        break;
    }
    default: {
        log(cErr("This OS is not supported"));
        process.exit();
    }
}
data.cpuModel = shared.cpuModel();
data.ramInGB = shared.totalRAMInGB();
data.homedir = shared.homedir();
data.username = shared.username();
async function runAsync() {
    data.shell = shared.checkCurrentShell();
    data.zshLoc = await shared.executeCommand("which zsh");
    data.isShellZSH = shared.checkCurrentShellZSH(data.shell, data.zshLoc);
    log(`Shell: ${data.shell}`);
    log(`ZSH Location: ${data.zshLoc}`);
    log(`Shell is ZSH: ${data.isShellZSH}`);
    data.codeAlias = await shared.executeCommand("which code");
    log(`code alias: ${data.codeAlias}`);
    log(` alias: ${data.codeAlias}`);
}
runAsync();
log(`Operating System: ${data.osName} ${data.osVariant}`);
if (data.osName === "macOS" && data.cpuType)
    log(`CPU Type: ${data.cpuType}`);
if (data.osName === "macOS" && data.isVSCodeInstalled)
    log(`VS Code installed`);
if (data.osName === "macOS" && data.brewLoc)
    log(`Homebrew location: ${data.brewLoc}`);
log(`CPU Model: ${data.cpuModel}`);
log(`Total RAM: ${data.ramInGB}GB`);
log(`Username: ${data.username}`);
log(`Home Directory: ${data.homedir}`);
