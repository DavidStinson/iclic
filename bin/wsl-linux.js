import isWsl from "is-wsl";
function checkForWSL() {
    return isWsl ? "WSL" : "Linux";
}
export { checkForWSL };
