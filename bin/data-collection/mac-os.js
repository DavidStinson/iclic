import os from 'os';
import fs from 'fs';
import plist from 'plist';
const log = console.log;
function getCPUType() {
    const cpuType = os.cpus();
    if (cpuType[0].model.includes("Apple")) {
        return "Apple Silicon";
    }
    else if (cpuType[0].model.includes("Intel")) {
        return "Intel";
    }
    else {
        return "Unknown";
    }
}
function getOSVersion() {
    try {
        const jsonobj = plist.parse(fs.readFileSync('/System/Library/CoreServices/SystemVersion.plist', "utf8"));
        return (jsonobj.ProductUserVisibleVersion
            ? jsonobj.ProductUserVisibleVersion
            : "Unknown OS Variant");
    }
    catch (error) {
        return "Unknown OS Variant";
    }
}
function getVSCodeInstallation() {
    try {
        return fs.existsSync("/Applications/Visual Studio Code.app") ? true : false;
    }
    catch (error) {
        log(error);
        return false;
    }
}
export { getCPUType, getOSVersion, getVSCodeInstallation, };
