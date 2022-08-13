import compare from "compare-versions"
const { satisfies } = compare

const validators = {
  distro: "ubuntu",
  osVersion: "^22",
}

function osVariant(distro = "Unknown"):boolean {
  return distro.toLowerCase() === validators.distro
}

function osVersion(version: string):boolean {
  return satisfies(version, validators.osVersion)
}

function checkInvalidOSReason(osVersion: string) {
  return compare(osVersion, validators.osVersion)
}

function vsCodeAlias(codeAlias: string): boolean {
  return codeAlias !== "Unknown" ? true : false
}

export {
  osVariant,
  osVersion,
  checkInvalidOSReason,
  vsCodeAlias,
}