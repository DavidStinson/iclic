import os from 'os'
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

export {
  cpuType
}