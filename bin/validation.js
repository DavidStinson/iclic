function checkCurrentShellZSH(currentShell, zshLoc) {
    const currentShellIsZSH = ((zshLoc === currentShell) && zshLoc.toLowerCase().includes("zsh"));
    return currentShellIsZSH;
}
export { checkCurrentShellZSH, };
