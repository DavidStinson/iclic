import compare from "compare-versions"
const { satisfies } = compare

const validators = {
  macOSVer: "~12",
  cpuTypes: ["Apple Silicon", "Intel"],
  appleSiliconBrewLoc: "/opt/homebrew/bin/brew",
  intelBrewLoc: "/usr/local/bin/brew",
  codeLocations: [
    "/Applications/Visual Studio Code.app/Contents/Resources/app/bin/code",
    "/usr/local/bin/code"
  ],
}

function osVersion(version: string): boolean {
  return satisfies(version, validators.macOSVer)
}

function cpuType(type = "Unknown"): boolean {
  return validators.cpuTypes.includes(type)
}

function brewLoc(type = "Unknown", location = "Unknown"): boolean {
  if (type === "Apple Silicon") {
    return location === validators.appleSiliconBrewLoc ? true : false
  } else if (type === "Intel") {
    return location === validators.intelBrewLoc ? true : false
  } else {
    return false
  }
}

function vsCodeLoc(codeLoc = "Unknown"): boolean {
  return codeLoc === "/Applications/Visual Studio Code.app" ? true : false
}

function vsCodeAlias(codeAlias: string): boolean {
  return validators.codeLocations.includes(codeAlias) ? true : false
}

export {
  osVersion,
  cpuType,
  brewLoc,
  vsCodeLoc,
  vsCodeAlias,
}