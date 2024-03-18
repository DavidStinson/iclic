import compare from 'compare-versions';
const { satisfies } = compare;
const validators = {
    macOSVer: '^14',
    cpuTypes: ['Apple Silicon', 'Intel'],
    appleSiliconBrewLoc: '/opt/homebrew/bin/brew',
    intelBrewLoc: '/usr/local/bin/brew',
    codeLocations: [
        '/Applications/Visual Studio Code.app/Contents/Resources/app/bin/code',
        '/usr/local/bin/code',
    ],
};
function checkOSVersion(version) {
    try {
        return satisfies(version, validators.macOSVer);
    }
    catch (error) {
        return false;
    }
}
function checkInvalidOSReason(osVersion) {
    try {
        return compare(osVersion, validators.macOSVer);
    }
    catch (error) {
        return 2;
    }
}
function checkCPUType(type = 'Unknown') {
    return validators.cpuTypes.includes(type);
}
function checkVSCodeLoc(codeLoc = 'Unknown') {
    return codeLoc === '/Applications/Visual Studio Code.app' ? true : false;
}
function checkVSCodeAlias(codeAlias) {
    return validators.codeLocations.includes(codeAlias) ? true : false;
}
function checkBrewLoc(type = 'Unknown', location = 'Unknown') {
    if (type === 'Apple Silicon') {
        return location === validators.appleSiliconBrewLoc ? true : false;
    }
    else if (type === 'Intel') {
        return location === validators.intelBrewLoc ? true : false;
    }
    else {
        return false;
    }
}
export { checkOSVersion, checkInvalidOSReason, checkCPUType, checkVSCodeAlias, checkVSCodeLoc, checkBrewLoc, };
