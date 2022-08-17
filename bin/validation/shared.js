import compare from 'compare-versions';
const { satisfies } = compare;
const machineValidators = {
    shell: 'zsh',
    minRAM: 7.95,
    recRAM: 15.95,
};
const installValidators = {
    nodeVer: '^16',
    nodemonVer: '^2.0.15',
    gitVer: '^2.35.0',
};
const configValidators = {
    gitBanch: 'main',
    gitMergeBehavior: 'false',
    gitEditor: 'code --wait',
    gitIgnConLoc: '/.gitignore_global',
};
function checkCurrentShellZSH(currentShell, zshLoc) {
    const currentShellIsZSH = zshLoc === currentShell &&
        currentShell.toLowerCase().includes(machineValidators.shell);
    return currentShellIsZSH;
}
function checkMinRAM(systemRAM) {
    return systemRAM >= machineValidators.minRAM;
}
function checkRecRAM(systemRAM) {
    return systemRAM >= machineValidators.recRAM;
}
function checkLoc(installData, iDKey) {
    return installData[iDKey] !== 'Unknown' ? true : false;
}
function checkNVM(nvmInstallStatus = 'Unknown') {
    return nvmInstallStatus === 'installed' ? true : false;
}
function checkVersions(ver = 'null', version) {
    try {
        // This is hacky and bad, should go back to data and adjust later
        if (ver === 'null')
            return { name: 'gitVer', vName: 'gitVer', isValid: false };
        version.isValid = satisfies(ver, installValidators[version.vName]);
        if (!version.isValid) {
            version.invalidReason = compare(ver, installValidators[version.vName]);
        }
        return version;
    }
    catch (error) {
        version.isValid = false;
        version.invalidReason = 2;
        return version;
    }
}
function checkGHAuth(ghAuthStatus) {
    return ghAuthStatus === 'authenticated' ? true : false;
}
function checkGitEmail(configMail) {
    return configMail ? true : false;
}
function checkGitEmailMatch(cliMail, configEmail) {
    return cliMail === configEmail ? true : false;
}
function checkGitBranch(gitDefaultBranch) {
    return gitDefaultBranch === configValidators.gitBanch ? true : false;
}
function checkGitMerge(gitMergeBehavior) {
    return gitMergeBehavior === configValidators.gitMergeBehavior ? true : false;
}
function checkGitEditor(gitEditor) {
    return gitEditor === configValidators.gitEditor ? true : false;
}
function checkGitIgnConLoc(gitIgnConLoc, homedir) {
    return gitIgnConLoc === `${homedir}${configValidators.gitIgnConLoc}`
        ? true
        : false;
}
function checkGitIgnExists(gitIgnConLoc) {
    return gitIgnConLoc ? true : false;
}
function checkGitIgnForContent(gitIgn) {
    return gitIgn.length ? true : false;
}
function checkZshrcForContent(zshrc) {
    return zshrc.length ? true : false;
}
export { checkCurrentShellZSH, checkMinRAM, checkRecRAM, checkLoc, checkNVM, checkVersions, checkGHAuth, checkGitEmailMatch, checkGitEmail, checkGitBranch, checkGitMerge, checkGitEditor, checkGitIgnConLoc, checkGitIgnExists, checkGitIgnForContent, checkZshrcForContent, };
