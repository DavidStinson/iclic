#!/usr/bin/env node
import { dataManager } from "./data-collection/manager.js";
import { validationManager } from "./validation/manager.js";
const initialData = {
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
async function main(data) {
    const collectedData = await dataManager(data);
    const validatedData = await validationManager(collectedData);
    console.dir(validatedData);
}
main(initialData);
