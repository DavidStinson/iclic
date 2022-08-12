import * as macOSValid from "./mac-os.js";
import * as wslLinuxValid from "./wsl-linux.js";
async function validationManager(data) {
    if (data.osName === "macOS") {
        data.isValidOSVariant = macOSValid.osVersion(data.osVersion);
        data.isValidCPUType = macOSValid.cpuType(data.cpuType);
        data.isValidBrewLoc = macOSValid.brewLoc(data.cpuType, data.brewLoc);
    }
    else if (data.osName === "WSL2" || data.osName === "Linux") {
        data.isValidOSVariant = wslLinuxValid.osVariant(data.osVariant);
        data.isValidOSVersion = wslLinuxValid.osVersion(data.osVersion);
    }
    return data;
}
// async function validation() {
//   data.isShellZSH = sharedValid.checkCurrentShellZSH(data.shell, data.zshLoc)
// }
export { validationManager };
