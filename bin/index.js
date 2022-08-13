#!/usr/bin/env node
import { dataManager } from "./data-collection/manager.js";
import { validationManager } from "./validation/manager.js";
const userData = {
    preferredName: "Unknown",
    gitHubUsername: "Unknown",
    gitHubEmail: "Unknown",
    cohortID: "Unknown", // ! BLOCKED: ADD CLI PROMPT
};
const userValidation = {
    isValidCohortId: false,
    hasPreviousSubmission: false, // ! BLOCKED: ADD CLI PROMPT 
};
const machineData = {
    osName: "Unknown",
    osVersion: "Unknown",
    homedir: "Unkown",
    username: "Unknown",
    cpuModel: "Unknown",
    ramInGB: 0, // * done
};
const machineValidation = {
    isValidOSVersion: false,
    isMinRAM: false,
    isRecRAM: false, // * done
};
const installData = {
    zshLoc: "Unknown",
    shell: "Unknown",
    codeAlias: "Unknown",
    ghLoc: "Unknown",
    npmLoc: "Unknown",
    npmVer: "Unknown",
    nodeLoc: "Unknown",
    nodeVer: "Unknown",
    nodemonLoc: "Unknown",
    nodemonVer: "Unknown",
    herokuLoc: "Unknown",
    gitLoc: "Unknown",
    gitVer: "Unknown", // * done
};
const installValidation = {
    isShellZSH: false,
    isValidCodeAlias: false,
    isValidNPMVer: false,
    isValidNodeVer: false,
    isValidNodemonVer: false,
    isValidGitVer: false, // TODO: IN PROGRESS
};
const configData = {
    gitEmail: "Unknown",
    gitDefBranch: "Unknown",
    gitMergeBehavior: "Unknown",
    gitIgnConLoc: "Unknown",
    gitIgnLoc: "Unknown",
    gitIgn: "Unknown",
    zshrc: "Unknown", // * done
};
const configValidation = {
    gitEmailMatchesPrompt: false,
    isValidGitBranch: false,
    isValidGitMergeBehavior: false,
    isValidGitIgnConLoc: false,
    gitIgnExists: false,
    gitIgnHasContent: false,
    zshrcHasContent: false, // TODO: IN PROGRESS
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
}
main(initialData);
