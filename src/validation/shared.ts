import compare from "compare-versions"

const { satisfies } = compare

const machineValidators = {
  shell: "zsh",
  minRAM: 8,
  recRAM: 16,
}

const installValidators: InstallValidators = {
  npmVer: "^8.12",
  nodeVer: "^16",
  nodemonVer: "^2.0.15",
  gitVer: "^2.35.0",
}

function checkCurrentShellZSH(currentShell: string, zshLoc: string): boolean {
  const currentShellIsZSH = 
    zshLoc === currentShell && 
    currentShell.toLowerCase().includes(machineValidators.shell)
  return currentShellIsZSH
}

function checkMinRAM(systemRAM: number): boolean {
  return systemRAM > machineValidators.minRAM
}

function checkRecRAM(systemRAM: number): boolean {
  return systemRAM > machineValidators.recRAM
}

function validateVer(ver = "null", version: InstallVersion): InstallVersion {
  // This is hacky and bad, should go back to data and adjust later
  if (ver === "null") return {name: "npmVer", vName: "npmVer", isValid: false}
  version.isValid = satisfies(ver, installValidators[version.vName])
  if (!version.isValid) {
    version.reason = compare(ver, installValidators[version.vName])
  }
  return version
}

export {
  checkCurrentShellZSH,
  checkMinRAM,
  checkRecRAM,
  validateVer,
}