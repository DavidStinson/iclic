import compare from "compare-versions";
const { satisfies } = compare;
const machineValidators = {
    shell: "zsh",
    minRAM: 8,
    recRAM: 16,
};
const installValidators = {
    npmVer: "^8.12",
    nodeVer: "^16",
    nodemonVer: "^2.0.15",
    gitVer: "^2.35.0",
};
const configValidators = {
    gitBanch: "main",
    gitMergeBehavior: "false",
    gitIgnConLoc: "/.gitignore_global",
};
function checkCurrentShellZSH(currentShell, zshLoc) {
    const currentShellIsZSH = zshLoc === currentShell &&
        currentShell.toLowerCase().includes(machineValidators.shell);
    return currentShellIsZSH;
}
function checkMinRAM(systemRAM) {
    return systemRAM > machineValidators.minRAM;
}
function checkRecRAM(systemRAM) {
    return systemRAM > machineValidators.recRAM;
}
function checkVersions(ver = "null", version) {
    // This is hacky and bad, should go back to data and adjust later
    if (ver === "null")
        return { name: "npmVer", vName: "npmVer", isValid: false };
    version.isValid = satisfies(ver, installValidators[version.vName]);
    if (!version.isValid) {
        version.reason = compare(ver, installValidators[version.vName]);
    }
    return version;
}
function checkGitBranch(gitDefaultBranch) {
    return gitDefaultBranch === configValidators.gitBanch ? true : false;
}
function checkGitMerge(gitMergeBehavior) {
    return gitMergeBehavior === configValidators.gitMergeBehavior ? true : false;
}
function checkGitIgnConLoc(gitIgnConLoc, homedir) {
    return gitIgnConLoc === `${homedir}${configValidators.gitIgnConLoc}`
        ? true
        : false;
}
export { checkCurrentShellZSH, checkMinRAM, checkRecRAM, checkVersions, checkGitBranch, checkGitMerge, checkGitIgnConLoc, };
