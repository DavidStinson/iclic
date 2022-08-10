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
    zshLoc: "Unknown",
    shell: "Unknown",
    isShellZSH: false,
    isVSCodeInstalled: false,
};
const osType = os.type();
switch (osType) {
    case 'Darwin': {
        data.osName = "macOS";
        data.cpuType = macOS.cpuType();
        data.osVariant = macOS.osVariant();
        data.isVSCodeInstalled = macOS.vsCodeInstalled();
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
async function runAsync() {
    data.shell = shared.checkCurrentShell();
    data.zshLoc = await shared.checkForZSH();
    data.isShellZSH = shared.checkCurrentShellZSH(data.shell, data.zshLoc);
    log(`Shell: ${data.shell}`);
    log(`ZSH Location: ${data.zshLoc}`);
    log(`Shell is ZSH: ${data.isShellZSH}`);
}
runAsync();
log(`Operating System: ${data.osName} ${data.osVariant}`);
if (data.osName === "macOS" && data.cpuType)
    log(`CPU Type: ${data.cpuType}`);
if (data.osName === "macOS" && data.isVSCodeInstalled)
    log(`VS Code installed`);
log(`CPU Model: ${data.cpuModel}`);
log(`Total RAM: ${data.ramInGB}GB`);
