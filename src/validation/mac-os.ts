import compare from "compare-versions"
const { satisfies } = compare

const validators = {
  macOSVer: "~12",
  cpuTypes: ["Apple Silicon", "Intel"]
}

function osVersion(version: string):boolean {
  return satisfies(version, validators.macOSVer)
}

function cpuType(type = "Unknown") {
  return validators.cpuTypes.includes(type)
}

export {
  osVersion,
  cpuType,
}