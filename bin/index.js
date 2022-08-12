#!/usr/bin/env node
import os from "os";
import chalk from "chalk";
import * as macOSData from "./data-collection/mac-os.js";
import * as wslLinuxData from "./data-collection/wsl-linux.js";
import * as sharedData from "./data-collection/shared.js";
import * as macOSValid from "./validation/mac-os.js";
import * as wslLinuxValid from "./validation/wsl-linux.js";
import * as sharedValid from "./validation/shared.js";
const osType = os.type();
const log = console.log;
const cErr = chalk.bold.red;
const data = {
    osName: "Unknown",
    osVersion: "Unknown",
    isValidOSVersion: false,
    cpuModel: "Unknown",
    ramInGB: 0,
    isEnoughRam: false,
    homedir: "Unknown",
    username: "Unknown",
    zshLoc: "Unknown",
    shell: "Unknown",
    isShellZSH: false,
    codeAlias: "Unknown",
    ghLoc: "Unknown",
    npmLoc: "Unknown",
    npmVer: "Unknown",
    isValidNPMVer: false,
    nodeLoc: "Unknown",
    nodeVer: "Unknown",
    isValidNodeVer: false,
    nodemonLoc: "Unknown",
    nodemonVer: "Unknown",
    isValidNodemonVer: false,
    herokuLoc: "Unknown",
    gitLoc: "Unknown",
    gitVer: "Unknown",
    isValidGitVer: false,
    gitEmail: "Unknown",
    gitEmailMatchesPrompt: false,
    gitDefBranch: "Unknown",
    isValidGitBranch: false,
    gitMergeBehavior: "Unknown",
    isValidGitMergeBehavior: false,
    gitIgnoreLoc: "Unknown",
    isValidGitIgnoreLoc: false,
    gitIgnoreExists: false,
    gitIgnore: "Unknown",
    gitIgnoreHasContent: false,
    zshrc: "Unknown",
    zshrcHasContent: false,
};
const commandsForData = [
    { dataKey: "zshLoc", command: "which zsh" },
    { dataKey: "codeAlias", command: "which code" },
    { dataKey: "ghLoc", command: "which gh" },
    { dataKey: "npmLoc", command: "which npm" },
    { dataKey: "npmVer", command: "npm --version" },
    { dataKey: "nodeLoc", command: "which node" },
    { dataKey: "nodeVer", command: "node --version" },
    { dataKey: "nodemonLoc", command: "which nodemon" },
    { dataKey: "nodemonVer", command: "nodemon --version" },
    { dataKey: "herokuLoc", command: "which heroku" },
    { dataKey: "gitLoc", command: "which git" },
    { dataKey: "gitVer", command: "git --version" },
    { dataKey: "gitEmail", command: "git config --global user.email" },
    { dataKey: "gitDefBranch", command: "git config --global init.defaultBranch" },
    { dataKey: "gitMergeBehavior", command: "git config --global pull.rebase" },
    { dataKey: "gitIgnoreLoc", command: "git config --global core.excludesfile" },
    { dataKey: "gitIgnore", command: "cat ~/.gitignore_global" },
    { dataKey: "zshrc", command: "cat ~/.zshrc" },
];
async function main() {
    switch (osType) {
        case 'Darwin': {
            getMacOSData();
            break;
        }
        case 'Linux': {
            getLinuxData();
            break;
        }
        default: {
            log(cErr("This OS is not supported"));
            return process.exit();
        }
    }
    await getGenericData();
    if (data.osName === "macOS") {
        data.isValidOSVariant = macOSValid.osVersion(data.osVersion);
        data.isValidCPUType = macOSValid.cpuType(data.cpuType);
    }
    else if (data.osName === "WSL2" || data.osName === "Linux") {
        data.isValidOSVariant = wslLinuxValid.osVariant(data.osVariant);
        data.isValidOSVersion = wslLinuxValid.osVersion(data.osVersion);
    }
    console.dir(data);
}
async function getMacOSData() {
    data.osName = "macOS";
    data.cpuType = macOSData.getCPUType();
    data.osVersion = macOSData.getOSVersion();
    data.isVSCodeInstalled = macOSData.getVSCodeInstallation();
    data.brewLoc = await sharedData.executeCommand("which brew");
}
async function getLinuxData() {
    const isWSL = wslLinuxData.getWSL();
    if (isWSL) {
        data.osName = "WSL2";
    }
    else {
        data.osName = "Linux";
    }
    data.osVariant = await wslLinuxData.getDistro();
    data.osVersion = await wslLinuxData.getOSVersion();
}
async function getGenericData() {
    data.cpuModel = sharedData.getCPUModel();
    data.ramInGB = sharedData.getTotalRAMInGB();
    data.homedir = sharedData.getHomedir();
    data.username = sharedData.getUsername();
    data.shell = sharedData.getCurrentShell();
    data.gitIgnoreExists = sharedData.getGitIgnoreExists(data.homedir);
    for await (const { dataKey, command } of commandsForData) {
        data[dataKey] = await sharedData.executeCommand(command);
    }
}
async function validation() {
    data.isShellZSH = sharedValid.checkCurrentShellZSH(data.shell, data.zshLoc);
}
main();
