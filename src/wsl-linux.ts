import isWsl from "is-wsl"

function checkForWSL(): string {
  return isWsl ? "WSL" : "Linux"
}

export {
  checkForWSL
}