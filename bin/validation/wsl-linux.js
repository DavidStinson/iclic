import compare from "compare-versions";
const { satisfies } = compare;
const validators = {
    distro: "ubuntu",
    osVersion: "^22",
    gitCredMan: "/mnt/c/Program\\ Files/Git/mingw64/bin/git-credential-manager-core.exe",
};
function osVariant(distro = "Linux - Unknown Distro") {
    return distro.toLowerCase() === validators.distro;
}
function osVersion(version) {
    try {
        return satisfies(version, validators.osVersion);
    }
    catch (error) {
        return false;
    }
}
function checkInvalidOSReason(osVersion) {
    try {
        return compare(osVersion, validators.osVersion);
    }
    catch (error) {
        return 2;
    }
}
function vsCodeAlias(codeAlias) {
    return codeAlias !== "Unknown" ? true : false;
}
function checkCPUChecker(vtStatus = "Unknown") {
    return vtStatus !== "Unknown" ? true : false;
}
function checkVTEnabled(vtStatus = "Unknown") {
    return vtStatus === "Enabled" ? true : false;
}
function checkGitCredMan(gitCredMan = "Unknown") {
    return gitCredMan === validators.gitCredMan ? true : false;
}
export { osVariant, osVersion, checkInvalidOSReason, vsCodeAlias, checkCPUChecker, checkVTEnabled, checkGitCredMan };
