import compare from "compare-versions"
const { satisfies } = compare

const validators = {
  distro: "ubuntu",
  ubuntu: "~22",
}

function osVariant(distro = "Unknown"):boolean {
  return distro.toLowerCase() === validators.distro
}

function osVersion(version: string):boolean {
  return satisfies(version, validators.ubuntu)
}


export {
  osVariant,
  osVersion,
}