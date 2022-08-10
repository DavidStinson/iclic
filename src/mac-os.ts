import os from 'os'
import fs from 'fs'
import plist from 'plist'
const log = console.log

function cpuType(): string {
  const cpuType = os.cpus()
  if (cpuType[0].model.includes("Apple")){
    log("Apple Silicon Chip")
    return "Apple Silicon"
  }
  else if (cpuType[0].model.includes("Intel")) {
    log("Intel Chip")
    return "Intel"
  }
  else {
    log("Unknown Chip")
    return "Unknown"
  }
}

function osVariant(): string {
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

export {
  cpuType,
  osVariant
}