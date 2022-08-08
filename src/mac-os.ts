import os from 'os'
import plist from 'plist'
const log = console.log

function cpuType(): string {
  const cpuType = os.cpus()
  if (cpuType[0].model.includes("Apple")){
    log("Apple Silicon Mac")
    return "Apple Silicon"
  }
  else if (cpuType[0].model.includes("Intel")) {
    log("Intel Mac")
    return "Intel"
  }
  else {
    log("Unknown Mac")
    return "Unknown"
  }
}

function osVariant(): string {
  return JSON.stringify(
    plist.parse('/System/Library/CoreServices/SystemVersion.plist')
  )
}

export {
  cpuType,
  osVariant
}