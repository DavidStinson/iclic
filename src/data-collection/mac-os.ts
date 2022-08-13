import os from 'os'
import fs from 'fs'
import plist from 'plist'

const log = console.log

function getCPUType(): string {
  const cpuType = os.cpus()
  if (cpuType[0].model.includes("Apple")){
    return "Apple Silicon"
  } else if (cpuType[0].model.includes("Intel")) {
    return "Intel"
  } else {
    return "Unknown"
  }
}

function getOSVersion(): string {
  try {
    const jsonobj = plist.parse(
      fs.readFileSync(
        '/System/Library/CoreServices/SystemVersion.plist', "utf8"
      )
    )
    return (
      jsonobj.ProductUserVisibleVersion 
        ? jsonobj.ProductUserVisibleVersion 
        : "Unknown OS Variant"
    )
  } catch (error) {
    return "Unknown OS Variant"
  }
}

function getVSCodeLoc(): string {
  try {
    return fs.existsSync("/Applications/Visual Studio Code.app") 
      ? "/Applications/Visual Studio Code.app"
      : "Unknown"
  } catch (error) {
    log(error)
    return "Unknown"
  }
}

export {
  getCPUType,
  getOSVersion,
  getVSCodeLoc,
}