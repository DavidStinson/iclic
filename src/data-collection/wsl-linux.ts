import isWsl from 'is-wsl'
import { readFile } from 'fs/promises'
import util from 'util'
import { exec } from 'child_process'

interface UnknownObject {
  [key: string]: string
}

const execAsync = util.promisify(exec)

function getWSL(): boolean {
  return isWsl ? true : false
}

async function getDistro(): Promise<string> {
  try {
    const data = await readFile('/etc/os-release', 'utf8')
    const lines = data.split('\n')
    const releaseDetails: UnknownObject = {}
    lines.forEach(line => {
      // Split the line into an array of words delimited by '='
      const words = line.split('=')
      releaseDetails[words[0].trim().toLowerCase()] = words[1]?.trim()
    })
    if (releaseDetails.name) {
      return releaseDetails.name.replace(/"/g, '')
    } else {
      return 'Linux - Unknown Distro'
    }
  } catch (error) {
    return 'Linux - Unknown Distro'
  }
}

async function getOSVersion(): Promise<string> {
  try {
    const data = await readFile('/etc/os-release', 'utf8')
    const lines = data.split('\n')
    const releaseDetails: UnknownObject = {}
    lines.forEach(line => {
      // Split the line into an array of words delimited by '='
      const words = line.split('=')
      releaseDetails[words[0].trim().toLowerCase()] = words[1]?.trim()
    })
    if (releaseDetails.version_id) {
      return releaseDetails.version_id.replace(/"/g, '')
    } else {
      return 'Unknown'
    }
  } catch (error) {
    return 'Unknown'
  }
}

async function getVTStatus(): Promise<string> {
  try {
    const { stdout, stderr } = await execAsync('kvm-ok')
    if (stderr) throw new Error(stderr)
    if (stdout) {
      return 'Enabled'
    }
    return 'Unknown'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.code === 1 || error.code === 2) {
      return 'Disabled'
    } else {
      return 'Unknown'
    }
  }
}

export { getWSL, getDistro, getOSVersion, getVTStatus }
