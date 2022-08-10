function checkCurrentShellZSH(currentShell: string, zshLoc: string): boolean {
  const currentShellIsZSH = (
    (zshLoc === currentShell) && zshLoc.toLowerCase().includes("zsh")
  )
  return currentShellIsZSH
}

export {
  checkCurrentShellZSH,
}