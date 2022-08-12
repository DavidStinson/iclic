const validators = {
    npmVer: "^8.12",
    nodeVer: "~16",
    nodemonVer: "^2.0.15",
    gitVer: "^2.35.0",
};
function checkCurrentShellZSH(currentShell, zshLoc) {
    const currentShellIsZSH = ((zshLoc === currentShell) && zshLoc.toLowerCase().includes("zsh"));
    return currentShellIsZSH;
}
export { checkCurrentShellZSH, };
