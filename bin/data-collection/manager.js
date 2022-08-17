import os from 'os';
import chalk from 'chalk';
import * as macOSData from './mac-os.js';
import * as wslLinuxData from './wsl-linux.js';
import * as sharedData from './shared.js';
import * as interactionData from './interaction.js';
const commandsForInstallData = [
    { dataKey: 'zshLoc', command: 'which zsh' },
    { dataKey: 'codeAlias', command: 'which code' },
    { dataKey: 'ghLoc', command: 'which gh' },
    { dataKey: 'nodeLoc', command: 'which node' },
    { dataKey: 'nodemonLoc', command: 'which nodemon' },
    { dataKey: 'nodemonVer', command: 'nodemon --version' },
    { dataKey: 'herokuLoc', command: 'which heroku' },
    { dataKey: 'gitLoc', command: 'which git' },
];
const commandsForConfigData = [
    { dataKey: 'gitEmail', command: 'git config --global user.email' },
    { dataKey: 'gitDefBranch', command: 'git config --global init.defaultBranch' },
    { dataKey: 'gitMergeBehavior', command: 'git config --global pull.rebase' },
    { dataKey: 'gitEditor', command: 'git config --global core.editor' },
    { dataKey: 'gitIgnConLoc', command: 'git config --global core.excludesfile' },
];
async function collectUserData(userData) {
    const collectedUserData = await interactionData.getUserData(userData);
    return collectedUserData;
}
async function collectInstallData(data) {
    switch (os.type()) {
        case 'Darwin': {
            data.machineData = getMacOSMachineData(data.machineData);
            data.installData = await getMacOSInstallData(data.installData);
            break;
        }
        case 'Linux': {
            data.machineData = await getWSLLinuxMachineData(data.machineData);
            break;
        }
        default: {
            console.log(chalk.bold.red('This OS is not supported.'));
            return process.exit();
        }
    }
    data.machineData = getGenMachineData(data.machineData);
    data.installData = await getGenInstallData(data);
    data.configData = await getGenConfigData(data.installData, data.configData, data.machineData.homedir);
    if (data.machineData.osName === "WSL2") {
        data.configData = await getWSLConfigData(data.configData);
    }
    return data;
}
function getMacOSMachineData(mD) {
    mD.osName = 'macOS';
    mD.cpuType = macOSData.getCPUType();
    mD.osVersion = macOSData.getOSVersion();
    return mD;
}
async function getMacOSInstallData(iD) {
    iD.vsCodeLoc = macOSData.getVSCodeLoc();
    iD.brewLoc = await sharedData.executeCommand('which brew');
    return iD;
}
async function getWSLLinuxMachineData(mD) {
    const isWSL = wslLinuxData.getWSL();
    if (isWSL) {
        mD.osName = 'WSL2';
    }
    else {
        mD.osName = 'Linux';
        mD.vtStatus = await wslLinuxData.getVTStatus();
    }
    mD.osVariant = await wslLinuxData.getDistro();
    mD.osVersion = await wslLinuxData.getOSVersion();
    return mD;
}
function getGenMachineData(mD) {
    mD.homedir = sharedData.getHomedir();
    mD.username = sharedData.getUsername();
    mD.cpuModel = sharedData.getCPUModel();
    mD.ramInGB = sharedData.getTotalRAMInGB();
    return mD;
}
async function getGenInstallData(data) {
    const { machineData: mD, installData: iD } = data;
    iD.shell = sharedData.getCurrentShell();
    iD.nvmInstallStatus = await sharedData.getNVMInstallStatus(mD.homedir);
    iD.nodeVer = await sharedData.getNodeVer();
    iD.gitVer = await sharedData.getGitVer();
    for await (const { dataKey, command } of commandsForInstallData) {
        iD[dataKey] = await sharedData.executeCommand(command);
    }
    return iD;
}
async function getGenConfigData(iD, cD, homedir) {
    if (iD.ghLoc !== "Unknown") {
        cD.ghLoginStatus = await sharedData.getGHLoginStatus();
    }
    cD.gitIgnLoc = sharedData.getGitIgnLoc(homedir);
    for await (const { dataKey, command } of commandsForConfigData) {
        cD[dataKey] = await sharedData.executeConfigCommand(command);
    }
    cD.gitIgn = sharedData.getGitIgn(homedir);
    cD.zshrc = sharedData.getZshrc(homedir);
    return cD;
}
async function getWSLConfigData(cD) {
    cD.gitCredMan = await sharedData.executeConfigCommand("git config --global credential.helper");
    return cD;
}
export { collectUserData, collectInstallData, };
