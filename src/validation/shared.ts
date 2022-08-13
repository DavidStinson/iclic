import compare from "compare-versions"

const { satisfies } = compare

const validators: SharedValidators = {
  shell: "zsh",
  minRAM: 8,
  recRAM: 16,
  versions: {
    npmVer: "^8.12",
    nodeVer: "~16",
    nodemonVer: "^2.0.15",
    gitVer: "^2.35.0",
  }
}

function checkCurrentShellZSH(currentShell: string, zshLoc: string): boolean {
  const currentShellIsZSH = 
    zshLoc === currentShell && 
    currentShell.toLowerCase().includes(validators.shell)
  return currentShellIsZSH
}

function checkMinRAM(systemRAM: number): boolean {
  return systemRAM > validators.minRAM
}

function checkRecRAM(systemRAM: number): boolean {
  return systemRAM > validators.recRAM
}

function isValidVer(
  iV: InstallValidation,
  verKey: string,
  ver: string
): boolean {
  return satisfies(ver, validators.versions[verKey])
}

function isValidNodeVer(nodeVer: string): boolean {
  return true
}

export {
  checkCurrentShellZSH,
  checkMinRAM,
  checkRecRAM,
  isValidVer,
}