import os from "os";
import chalk from "chalk";
import * as macOSData from "./mac-os.js";
import * as wslLinuxData from "./wsl-linux.js";
import * as sharedData from "./shared.js";
const osType = os.type();
const log = console.log;
const cErr = chalk.bold.red;
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
async function dataManager(data) {
    switch (osType) {
        case 'Darwin': {
            data = await getMacOSData(data);
            break;
        }
        case 'Linux': {
            data = await getLinuxData(data);
            break;
        }
        default: {
            log(cErr("This OS is not supported"));
            return process.exit();
        }
    }
    data = await getGenericData(data);
    return data;
}
async function getMacOSData(data) {
    data.osName = "macOS";
    data.cpuType = macOSData.getCPUType();
    data.osVersion = macOSData.getOSVersion();
    data.isVSCodeInstalled = macOSData.getVSCodeInstallation();
    data.brewLoc = await sharedData.executeCommand("which brew");
    return data;
}
async function getLinuxData(data) {
    const isWSL = wslLinuxData.getWSL();
    if (isWSL) {
        data.osName = "WSL2";
    }
    else {
        data.osName = "Linux";
        // TKTK NEED TO DO THIS
        // data.vtStatus = 
    }
    data.osVariant = await wslLinuxData.getDistro();
    data.osVersion = await wslLinuxData.getOSVersion();
    return data;
}
async function getGenericData(data) {
    data.cpuModel = sharedData.getCPUModel();
    data.ramInGB = sharedData.getTotalRAMInGB();
    data.homedir = sharedData.getHomedir();
    data.username = sharedData.getUsername();
    data.shell = sharedData.getCurrentShell();
    data.gitIgnoreExists = sharedData.getGitIgnoreExists(data.homedir);
    for await (const { dataKey, command } of commandsForData) {
        data[dataKey] = await sharedData.executeCommand(command);
    }
    return data;
}
export { dataManager };
