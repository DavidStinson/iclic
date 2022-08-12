import * as macOSValid from "./mac-os.js"
import * as wslLinuxValid from "./wsl-linux.js"
import * as sharedValid from "./shared.js"

async function validationManager(data: Data): Promise<Data> {
  if (data.osName === "macOS") {
    data = await checkMacOSData(data)
  } else if (data.osName === "WSL2" || data.osName === "Linux") {
    data = await checkWSLLinuxData(data)
  }
  data = await checkGenericData(data)
  return data
}

async function checkMacOSData(data: Data): Promise<Data> {
  data.isValidOSVersion = macOSValid.osVersion(data.osVersion)
  data.isValidCPUType = macOSValid.cpuType(data.cpuType)
  data.isValidBrewLoc = macOSValid.brewLoc(data.cpuType, data.brewLoc)
  return data
}

async function checkWSLLinuxData(data: Data): Promise<Data> {
  data.isValidOSVariant = wslLinuxValid.osVariant(data.osVariant)
  data.isValidOSVersion = wslLinuxValid.osVersion(data.osVersion)
  return data
}

async function checkGenericData(data: Data): Promise<Data> {
  data.isShellZSH = sharedValid.checkCurrentShellZSH(data.shell, data.zshLoc)
  data.isMinRAM = sharedValid.checkMinRAM(data.ramInGB)
  data.isRecRAM = sharedValid.checkRecRAM(data.ramInGB)
  return data
}


export {
  validationManager
}