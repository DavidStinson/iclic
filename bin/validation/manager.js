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
    return iV;
}
function checkWSLLinuxMachineData(data) {
    const { machineValidation: mV, machineData: mD } = data;
    mV.isValidOSVariant = wslLinuxValid.osVariant(mD.osVariant);
    mV.isValidOSVersion = wslLinuxValid.osVersion(mD.osVersion);
    return mV;
}
function checkGenMachineData(data) {
    const { machineValidation: mV, machineData: mD } = data;
    mV.isMinRAM = sharedValid.checkMinRAM(mD.ramInGB);
    mV.isRecRAM = sharedValid.checkRecRAM(mD.ramInGB);
    return mV;
}
function checkGenInstallData(data) {
    const { installValidation: iV, installData: iD } = data;
    iV.isShellZSH = sharedValid.checkCurrentShellZSH(iD.shell, iD.zshLoc);
    return iV;
}
export { validationManager };
