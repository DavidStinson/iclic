import isWsl from "is-wsl"
import { readFile } from 'fs/promises'

interface ReleaseDetails {
  [key: string]: string
}

function getWSL(): boolean {
  return isWsl ? true : false
}

async function getDistro(): Promise<string> {
  try {
    const data = await readFile('/etc/os-release', 'utf8')
    const lines = data.split('\n')
    const releaseDetails: ReleaseDetails = {}
    lines.forEach(line => {
      // Split the line into an array of words delimited by '='
      const words = line.split('=')
      releaseDetails[words[0].trim().toLowerCase()] = words[1]?.trim()
    })    
    if (releaseDetails.name){
      return releaseDetails.name.replace(/"/g, "")
    } else {
      return "Linux - Unknown Distro"
    }
  } catch (error) {
    return "Linux - Unknown Distro"
  }
}

async function getOSVersion(): Promise<string> {
  try {
    const data = await readFile('/etc/os-release', 'utf8')
    const lines = data.split('\n')
    const releaseDetails: ReleaseDetails = {}
    lines.forEach(line => {
      // Split the line into an array of words delimited by '='
      const words = line.split('=')
      releaseDetails[words[0].trim().toLowerCase()] = words[1]?.trim()
    })    
    if (releaseDetails.version_id){
      return releaseDetails.version_id.replace(/"/g, "")
    } else {
      return "Linux - Unknown Distro"
    }
  } catch (error) {
    return "Linux - Unknown Distro"
  }
}

export {
  getWSL,
  getDistro,
  getOSVersion,
}