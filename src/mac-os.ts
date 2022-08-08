import os from 'os'
import fs from 'fs'
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
  try {
    const jsonString = JSON.stringify(plist.parse(
      fs.readFileSync(
        '/System/Library/CoreServices/SystemVersion.plist', "utf8"
      )
    ))
    const obj = JSON.parse(jsonString)
    return obj.ProductVersion
  } catch (error) {
    return "Unkown OS Variant"
  }
  
}

export {
  cpuType,
  osVariant
}