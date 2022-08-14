import compare from "compare-versions"

const { satisfies } = compare

const validators = {
  macOSVer: "^12",
  cpuTypes: ["Apple Silicon", "Intel"],
  appleSiliconBrewLoc: "/opt/homebrew/bin/brew",
  intelBrewLoc: "/usr/local/bin/brew",
  codeLocations: [
    "/Applications/Visual Studio Code.app/Contents/Resources/app/bin/code",
    "/usr/local/bin/code"
  ],
}

function checkOSVersion(version: string): boolean {
  try {
    return satisfies(version, validators.macOSVer)
  } catch (error) {
    return false
  }
}

function checkInvalidOSReason(osVersion: string) {
  try {
    return compare(osVersion, validators.macOSVer)
  } catch (error) {
    return 2
  }
}

function checkCPUType(type = "Unknown"): boolean {
  return validators.cpuTypes.includes(type)
}

function checkBrewLoc(type = "Unknown", location = "Unknown"): boolean {
  if (type === "Apple Silicon") {
    return location === validators.appleSiliconBrewLoc ? true : false
  } else if (type === "Intel") {
    return location === validators.intelBrewLoc ? true : false
  } else {
    return false
  }
}

function checkVSCodeLoc(codeLoc = "Unknown"): boolean {
  return codeLoc === "/Applications/Visual Studio Code.app" ? true : false
}

function checkVSCodeAlias(codeAlias: string): boolean {
  return validators.codeLocations.includes(codeAlias) ? true : false
}

export {
  checkOSVersion,
  checkInvalidOSReason,
  checkCPUType,
  checkBrewLoc,
  checkVSCodeLoc,
  checkVSCodeAlias,
}