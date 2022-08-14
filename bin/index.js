#!/usr/bin/env node
import { dataManager } from './data-collection/manager.js';
import { validationManager } from './validation/manager.js';
const userData = {
    preferredName: 'Unknown',
    gitHubUsername: 'Unknown',
    gitHubEmail: 'Unknown',
    cohortID: 'Unknown',
};
const userValidation = {
    isValidCohortId: false,
    hasPreviousSubmission: false,
};
const machineData = {
    osName: 'Unknown',
    osVersion: 'Unknown',
    homedir: 'Unkown',
    username: 'Unknown',
    cpuModel: 'Unknown',
    ramInGB: 0,
};
const machineValidation = {
    isValidOSVersion: false,
    isMinRAM: false,
    isRecRAM: false,
};
const installData = {
    zshLoc: 'Unknown',
    shell: 'Unknown',
    codeAlias: 'Unknown',
    ghLoc: 'Unknown',
    npmLoc: 'Unknown',
    npmVer: '-1',
    nodeLoc: 'Unknown',
    nodeVer: '-1',
    nodemonLoc: 'Unknown',
    nodemonVer: '-1',
    herokuLoc: 'Unknown',
    gitLoc: 'Unknown',
    gitVer: '-1',
};
const installValidation = {
    isShellZSH: false,
    isValidCodeAlias: false,
    versions: [
        { name: "npmVer", vName: "npmVer", isValid: false },
        { name: "nodeVer", vName: "nodeVer", isValid: false },
        { name: "nodemonVer", vName: "nodemonVer", isValid: false },
        { name: "gitVer", vName: "gitVer", isValid: false },
    ]
};
const configData = {
    gitEmail: 'Unknown',
    gitDefBranch: 'Unknown',
    gitMergeBehavior: 'Unknown',
    gitIgnConLoc: 'Unknown',
    gitIgnLoc: 'Unknown',
    gitIgn: '',
    zshrc: '',
};
const configValidation = {
    gitEmailMatchesPrompt: false,
    isValidGitBranch: false,
    isValidGitMergeBehavior: false,
    isValidGitIgnConLoc: false,
    gitIgnExists: false,
    gitIgnHasContent: false,
    zshrcHasContent: false,
};
const initialData = {
    userData,
    userValidation,
    machineData,
    machineValidation,
    installData,
    installValidation,
    configData,
    configValidation,
};
async function main(data) {
    const collectedData = await dataManager(data);
    const validatedData = await validationManager(collectedData);
    console.dir(validatedData);
    console.dir(validatedData.installValidation);
}
main(initialData);
