#!/usr/bin/env node

import { dataManager } from "./data-collection/manager.js"
import { validationManager } from "./validation/manager.js"

const initialData: Data = {
  osName: "Unknown", //done
  osVersion: "Unknown", //done
  isValidOSVersion: false, //done
  cpuModel: "Unknown", //done
  ramInGB: 0, //done
  isEnoughRam: false,
  homedir: "Unknown", //done
  username: "Unknown", //done
  zshLoc: "Unknown", //done
  shell: "Unknown", //done
  isShellZSH: false,
  codeAlias: "Unknown", //done
  ghLoc: "Unknown", //done
  npmLoc: "Unknown",
  npmVer: "Unknown",
  isValidNPMVer: false,
  nodeLoc: "Unknown",
  nodeVer: "Unknown",
  isValidNodeVer: false,
  nodemonLoc: "Unknown",
  nodemonVer: "Unknown",
  isValidNodemonVer: false,
  herokuLoc: "Unknown",
  gitLoc: "Unknown",
  gitVer: "Unknown",
  isValidGitVer: false,
  gitEmail: "Unknown",
  gitEmailMatchesPrompt: false,
  gitDefBranch: "Unknown",
  isValidGitBranch: false,
  gitMergeBehavior: "Unknown",
  isValidGitMergeBehavior: false,
  gitIgnoreLoc: "Unknown",
  isValidGitIgnoreLoc: false,
  gitIgnoreExists: false,
  gitIgnore: "Unknown",
  gitIgnoreHasContent: false,
  zshrc: "Unknown",
  zshrcHasContent: false,
}

async function main(data: Data) {
  const collectedData = await dataManager(data)
  const validatedData = await validationManager(collectedData)
  console.dir(validatedData)
}

main(initialData)
