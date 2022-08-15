function manager(data: Data, messages: Messages): Messages {
  const { machineData: mD, machineValidation: mV } = data
  messages = renderOS(data, messages)
  if (mD.osName === "WSL2" || mD.osName === "Linux") {
    if (mV.isValidOSVariant){
      messages = renderValidLinuxVariant(data, messages)
    } else {
      messages = renderInvalidLinuxVariant(data, messages)
    }
    messages = renderLinuxCPUModel(data, messages)
  } else if (mD.osName === "macOS") {
    messages = renderMacOSVersion(data, messages)
    messages = renderMacCPUType(data, messages)
  }
  messages = renderRAM(data, messages)
  messages = renderHomedirUsername(data, messages)
  if(mD.osName === "Linux") {
    messages = renderVTStatus(data, messages)
  }
  return messages
}

function renderOS(data: Data, messages: Messages): Messages {
  const { machineData: mD} = data
  messages.info.push({
    msg: `Your Operating System is: ${mD.osName}`
  })
  return messages
}

function renderInvalidLinuxVariant(data: Data, messages: Messages): Messages {
  const { machineData: mD} = data
  messages.errors.push({
    msg: `We do not offer official support for ${mD.osVariant} ${mD.osVersion}.`
  })
  return messages
}

function renderValidLinuxVariant(data: Data, messages: Messages): Messages {
  const { machineData: mD, machineValidation: mV } = data
  if (mV.isValidOSVersion) {
    messages.info.push({
      msg: `Your device is running ${mD.osName} ${mD.osVariant} ${mD.osVersion}.`
    })
  } else {
    if (mV.isInvaidOSReason === 1) {
      messages.warns.push({
        msg: `We do not offer official support for ${mD.osName} Ubuntu ${mD.osVersion}. Note that we very strongly recommend against running pre-release or beta versions of Ubuntu and recommend running Ubuntu 22.04.`
      })
    } else if (mV.isInvaidOSReason === -1) {
      messages.warns.push({
        msg: `We do not offer official support for ${mD.osName} Ubuntu ${mD.osVersion}. We strongly recommend updating to Ubuntu 22.04.`
      })
    } else {
      messages.warns.push({
        msg: `We do not offer official support for ${mD.osName} Ubuntu ${mD.osVersion} and recommend running Ubuntu 22.04.`
      })
    }
  }
  return messages
}

function renderLinuxCPUModel(data: Data, messages: Messages): Messages {
  const { machineData: mD} = data
  messages.info.push({
    msg: `Your processor model is: ${mD.cpuModel}`
  })
  return messages
}

function renderMacOSVersion(data: Data, messages: Messages): Messages {
  const { machineData: mD, machineValidation: mV } = data
  if (mV.isValidOSVersion) {
    messages.info.push({
      msg: `Your Mac is running macOS ${mD.osVersion}.`
    })
  } else {
    if (mV.isInvaidOSReason === 1) {
      messages.warns.push({
        msg: `We do not offer official support for macOS ${mD.osVersion}. Note that we very strongly recommend against running pre-release or beta versions of macOS and recommend running macOS 12 Monterey.`
      })
    } else if (mV.isInvaidOSReason === -1) {
      messages.warns.push({
        msg: `We do not offer official support for macOS ${mD.osVersion}. We strongly recommend updating to macOS 12 Monterey.`
      })
    } else {
      messages.warns.push({
        msg: `We do not offer official support for macOS ${mD.osVersion} and recommend running macOS 12 Monterey.`
      })
    }
  }
  return messages
}

function renderMacCPUType(data: Data, messages: Messages): Messages {
  const { machineData: mD, machineValidation: mV } = data
  if (mV.isValidCPUType) {
    messages.info.push({
      msg: `Your Mac has an ${mD.cpuType} processor. The processor model is: ${mD.cpuModel}.`
    })
  } else {
    messages.errors.push({
      msg: `Your Mac has an ${mD.cpuType} processor. The processor model is: ${mD.cpuModel}. While you may be receiving this warning in error, this is often a sign of a Hackintosh computer, which we strongly recommend against using. You may ignore this error if Apple manufactured this Mac.`
    })
  }
  return messages
}

function renderRAM(data: Data, messages: Messages): Messages {
  const { machineData: mD, machineValidation: mV } = data
  if (mV.isRecRAM) {
    messages.info.push({
      msg: `Your device has ${mD.ramInGB}GB of RAM.`
    })
  } else if (mV.isMinRAM) {
    messages.warns.push({
      msg: `Your device has ${mD.ramInGB}GB of RAM. While this is sufficient to take the course, you will experience occasional performance issues, especially when screen sharing in Zoom.`
    })
  } else {
    messages.errors.push({
      msg: `Your device has ${mD.ramInGB}GB of RAM, which is not sufficent to succeed in this course. You must use a device with at least 8GB of RAM.`
    })
  }
  return messages
}

function renderHomedirUsername(data: Data, messages: Messages): Messages {
  const { machineData: mD} = data
  messages.info.push({
    msg: `Your username is ${mD.username} and your home directory is located at ${mD.homedir}`
  })
  return messages
}

function renderVTStatus(data: Data, messages: Messages): Messages {
  const { machineValidation: mV } = data
  if (mV.isCPUCheckerInstalled) {
    if(mV.isVTEnabled) {
      messages.successes.push({
        msg: `Virtualization is enabled.`
      })
    } else {
      messages.warns.push({
        msg: `Virtualization is not enabled in your BIOS settings. It is not vital to do this now as we will not use this feature until later in the course, but it is something you should keep in mind as we move forward.`
      })
    }
  } else {
    messages.errors.push({
      msg: `cpu-checker is not installed and virtualization status could not be determined.`,
      url: "https://www.notion.so/seirpublic/cpu-checker-Install-dff849b0de704eacab987100168d6ac6"
    })
  }
  return messages
}

export {
  manager
}