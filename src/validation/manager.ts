import * as macOSValid from "./mac-os.js"
import * as wslLinuxValid from "./wsl-linux.js"
import * as sharedValid from "./shared.js"

async function validationManager(data: Data): Promise<Data> {
  const { osName } = data.machineData
  if (osName === "macOS") {
    data.machineValidation = checkMacOSMachineData(data)
    data.installValidation = checkMacOSInstallData(data)
  } else if (osName === "WSL2" || osName === "Linux") {
    data.machineValidation = checkWSLLinuxMachineData(data)
    data.installValidation = checkWSLLinuxInstallData(data)
  }
  if (osName === "Linux") {
    data.machineValidation = checkLinuxMachineData(data)
  }
  if (osName === "WSL2") {
    data.configValidation = checkWSLConfigData(data)
  }
  data.machineValidation = checkGenMachineData(data)
  data.installValidation = checkGenInstallData(data)
  data.configValidation = checkGenConfigData(data)
  return data
}

function checkMacOSMachineData(data: Data): MachineValidation {
  const { machineValidation: mV, machineData: mD } = data
  mV.isValidOSVersion = macOSValid.checkOSVersion(mD.osVersion)
  if (!mV.isValidOSVersion) {
    mV.isInvaidOSReason = macOSValid.checkInvalidOSReason(mD.osVersion)
  }
  mV.isValidCPUType = macOSValid.checkCPUType(mD.cpuType)
  return mV
}

function checkMacOSInstallData(data: Data): InstallValidation {
  const { installValidation: iV, machineData: mD, installData: iD } = data
  iV.isValidBrewLoc = macOSValid.checkBrewLoc(mD.cpuType, iD.brewLoc)
  iV.isVSCodeInstalled = macOSValid.checkVSCodeLoc(iD.vsCodeLoc)
  iV.isValidCodeAlias = macOSValid.checkVSCodeAlias(iD.codeAlias)
  return iV
}

function checkWSLLinuxMachineData(data: Data): MachineValidation {
  const { machineValidation: mV, machineData: mD } = data
  mV.isValidOSVariant = wslLinuxValid.osVariant(mD.osVariant)
  if (mV.isValidOSVersion) {
    mV.isInvaidOSReason = wslLinuxValid.checkInvalidOSReason(mD.osVersion)
  }
  mV.isValidOSVersion = wslLinuxValid.osVersion(mD.osVersion)
  return mV
}

function checkWSLLinuxInstallData(data: Data): InstallValidation {
  const { installValidation: iV, installData: iD } = data
  iV.isValidCodeAlias = wslLinuxValid.vsCodeAlias(iD.codeAlias)
  
  return iV
}

function checkLinuxMachineData(data: Data): MachineValidation {
  const { machineValidation: mV, machineData: mD } = data
  mV.isCPUCheckerInstalled = wslLinuxValid.checkCPUChecker(mD.vtStatus)
  if(mV.isCPUCheckerInstalled) {
    mV.isVTEnabled = wslLinuxValid.checkVTEnabled(mD.vtStatus)
  }
  return mV
}

function checkWSLConfigData(data: Data): ConfigValidation {
  const { configValidation: cV, configData: cD} = data
  cV.isValidGitCredMan = wslLinuxValid.checkGitCredMan(cD.gitCredMan)
  return cV
}

function checkGenMachineData(data: Data): MachineValidation{
  const { machineValidation: mV, machineData: mD } = data 
  mV.isMinRAM = sharedValid.checkMinRAM(mD.ramInGB)
  mV.isRecRAM = sharedValid.checkRecRAM(mD.ramInGB)
  return mV
}

function checkGenInstallData(data: Data): InstallValidation{
  const { installValidation: iV, installData: iD } = data
  iV.isShellZSH = sharedValid.checkCurrentShellZSH(iD.shell, iD.zshLoc)
  iV.isValidGHLoc = sharedValid.checkLoc(iD, "ghLoc")
  iV.isNVMInstalled = sharedValid.checkNVM(iD.nvmInstallStatus)
  iV.isValidHerokuLoc = sharedValid.checkLoc(iD, "herokuLoc")
  iV.versions = iV.versions.map(version => (
    sharedValid.checkVersions(iD[version.name], version)
  ))
  return iV
}

function checkGenConfigData(data: Data): ConfigValidation {
  const { 
    configValidation: cV, 
    configData: cD, 
    machineData: mD,
    userData: uD,
    installData: iD,
  } = data
  if(iD.ghLoc !== "Unknown") {
    cV.isLoggedIntoGH = sharedValid.checkGHAuth(cD.ghLoginStatus)
  }
  if(uD.gitHubEmail) {
    cV.gitEmailMatchesPrompt = sharedValid.checkGitEmailMatch(
      uD.gitHubEmail, 
      cD.gitEmail
    )
  }
  cV.isValidGitBranch = sharedValid.checkGitBranch(cD.gitDefBranch)
  cV.isValidGitMergeBehavior = sharedValid.checkGitMerge(cD.gitMergeBehavior)
  cV.isValidGitEditor = sharedValid.checkGitEditor(cD.gitEditor)
  cV.isValidGitIgnConLoc = sharedValid.checkGitIgnConLoc(
    cD.gitIgnConLoc, 
    mD.homedir
  )
  cV.gitIgnExists = sharedValid.checkGitIgnExists(cD.gitIgnConLoc)
  cV.gitIgnHasContent = sharedValid.checkGitIgnForContent(cD.gitIgn)
  cV.zshrcHasContent = sharedValid.checkZshrcForContent(cD.zshrc)
  return cV
}

export {
  validationManager
}
