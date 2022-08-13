import * as macOSValid from "./mac-os.js";
import * as wslLinuxValid from "./wsl-linux.js";
import * as sharedValid from "./shared.js";
async function validationManager(data) {
    const { osName } = data.machineData;
    if (osName === "macOS") {
        data.machineValidation = checkMacOSMachineData(data);
        data.installValidation = checkMacOSInstallData(data);
    }
    else if (osName === "WSL2" || osName === "Linux") {
        data.machineValidation = checkWSLLinuxMachineData(data);
        data.installValidation = checkWSLLinuxInstallData(data);
    }
    data.machineValidation = checkGenMachineData(data);
    data.installValidation = checkGenInstallData(data);
    return data;
}
function checkMacOSMachineData(data) {
    const { machineValidation: mV, machineData: mD } = data;
    mV.isValidOSVersion = macOSValid.osVersion(mD.osVersion);
    mV.isValidCPUType = macOSValid.cpuType(mD.cpuType);
    return mV;
}
function checkMacOSInstallData(data) {
    const { installValidation: iV, machineData: mD, installData: iD } = data;
    iV.isValidBrewLoc = macOSValid.brewLoc(mD.cpuType, iD.brewLoc);
    iV.isVSCodeInstalled = macOSValid.vsCodeLoc(iD.vsCodeLoc);
    iV.isValidCodeAlias = macOSValid.vsCodeAlias(iD.codeAlias);
    return iV;
}
function checkWSLLinuxMachineData(data) {
    const { machineValidation: mV, machineData: mD } = data;
    mV.isValidOSVariant = wslLinuxValid.osVariant(mD.osVariant);
    mV.isValidOSVersion = wslLinuxValid.osVersion(mD.osVersion);
    return mV;
}
function checkWSLLinuxInstallData(data) {
    const { installValidation: iV, installData: iD } = data;
    iV.isValidCodeAlias = wslLinuxValid.vsCodeAlias(iD.codeAlias);
    return iV;
}
function checkGenMachineData(data) {
    const { machineValidation: mV, machineData: mD } = data;
    mV.isMinRAM = sharedValid.checkMinRAM(mD.ramInGB);
    mV.isRecRAM = sharedValid.checkRecRAM(mD.ramInGB);
    return mV;
}
function checkGenInstallData(data) {
    const { installValidation: iV, installData: iD } = data;
    const installedVers = [
        { verKey: "npmVer", ver: iD.npmVer, iVKey: "isValidNPMVer" },
        { verKey: "nodeVer", ver: iD.nodeVer, iVKey: "isValidNodeVer" },
        { verKey: "nodemonVer", ver: iD.nodemonVer, iVKey: "isValidNodemonVer" },
        { verKey: "gitVer", ver: iD.gitVer, iVKey: "isValidGitVer" },
    ];
    iV.isShellZSH = sharedValid.checkCurrentShellZSH(iD.shell, iD.zshLoc);
    for (const { verKey, ver, iVKey } of installedVers) {
        iV[iVKey] = sharedValid.isValidVer(verKey, ver);
    }
    return iV;
}
export { validationManager };
