const validators = {
  shell: "zsh",
  minRAM: 8,
  recRAM: 16,
  npmVer: "^8.12",
  nodeVer: "~16",
  nodemonVer: "^2.0.15",
  gitVer: "^2.35.0",
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

export {
  checkCurrentShellZSH,
  checkMinRAM,
  checkRecRAM,
}