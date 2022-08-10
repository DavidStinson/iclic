import os from 'os'
import fs from 'fs'
import plist from 'plist'

const log = console.log

function getCPUType(): string {
  const cpuType = os.cpus()
  if (cpuType[0].model.includes("Apple")){
    log("Apple Silicon Chip")
    return "Apple Silicon"
  } else if (cpuType[0].model.includes("Intel")) {
    log("Intel Chip")
    return "Intel"
  } else {
    log("Unknown Chip")
    return "Unknown"
  }
}

function getOSVariant(): string {
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

function getVSCodeInstallation(): boolean {
  try {
    if (fs.existsSync("/Applications/Visual Studio Code.app")) {
      return true
    } else {
      return false
    }
  } catch (error) {
    log(error)
    return false
  }
}


export {
  getCPUType,
  getOSVariant,
  getVSCodeInstallation,
}