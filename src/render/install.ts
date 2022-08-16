let isMacOS = false
let isWSLLin = false
let isMacOSValidBrew = false
let isASMac = false

function manager(data: Data, messages: Messages): Messages {
  const { machineData: mD, installValidation: iV } = data
  isMacOS = mD.osName === 'macOS'
  isWSLLin = mD.osName === 'WSL2' || mD.osName === 'Linux'
  isASMac = mD.cpuType === 'Apple Silicon'
  const nodeVer = iV.versions.find(version => (version.name = 'nodeVer'))
  const isNodeVerValid = nodeVer?.isValid ? true : false
  if (iV.isValidBrewLoc !== undefined) {
    isMacOSValidBrew = mD.osName === 'macOS' && iV.isValidBrewLoc
  }
  messages = renderZSH(data, messages)
  if (isMacOS) {
    messages = renderVSCodeLoc(data, messages)
    messages = renderBrewLoc(data, messages)
  }
  messages = renderVSCodeAlias(data, messages)
  if (isMacOSValidBrew || isWSLLin) {
    messages = renderGHExists(data, messages)
  }
  messages = renderNVMExists(data, messages)
  messages = renderInstallLocAndVer(data, messages)
  if ((isMacOSValidBrew || (isASMac && isNodeVerValid) ) || isWSLLin) {
    messages = renderHerokuExists(data, messages)
  } 
  return messages
}

function renderZSH(data: Data, messages: Messages): Messages {
  const { machineData: mD, installData: iD, installValidation: iV } = data
  if (iV.isShellZSH) {
    messages.successes.push({
      msg: `The current shell is zsh, located at ${iD.shell}.`,
    })
  } else {
    const message: Message = {
      msg: `The current shell is ${iD.shell}, and must be changed to zsh. Follow the URL below for a potential fix.`,
    }
    if (isMacOS) {
      message.url =
        'https://www.notion.so/seirpublic/ZSH-ea65a37a77cd486b88a007ce7b9f3ed6'
    } else if (mD.osName === 'WSL2') {
      message.url =
        'https://www.notion.so/seirpublic/ZSH-8578b56420944d1790b402357363a1a8'
    } else if (mD.osName === 'Linux') {
      message.url =
        'https://www.notion.so/seirpublic/ZSH-2980b249f8d64b3980f5f67c12e2188e'
    }
    messages.errors.push(message)
  }
  return messages
}

function renderVSCodeLoc(data: Data, messages: Messages): Messages {
  const { installValidation: iV } = data
  if (iV.isVSCodeInstalled) {
    messages.successes.push({
      msg: `Visual Studio Code is installed in the Applications directory.`,
    })
  } else {
    messages.errors.push({
      msg: `Visual Studio Code is not installed. Follow the URL below for a potential fix.`,
      url: 'https://seirpublic.notion.site/VS-Code-Installation-7a6371a6732649f8add2a6286cce91bf',
    })
  }
  return messages
}

function renderBrewLoc(data: Data, messages: Messages): Messages {
  const { machineData: mD, installData: iD, installValidation: iV } = data
  if (iV.isValidBrewLoc) {
    messages.successes.push({
      msg: `Homebrew is installed to ${iD.brewLoc}, which is the correct location for ${mD.cpuType} Macs.`,
    })
  } else {
    messages.errors.push({
      msg: `Homebrew is installed to ${iD.brewLoc}, which is not the correct location for ${mD.cpuType} Macs. Follow the URL below for a potential fix.`,
      url: 'https://www.notion.so/seirpublic/Reach-Out-to-an-Instructor-dfd2a7539ad54b6e9e815d132ff6c99c',
    })
  }
  return messages
}

function renderVSCodeAlias(data: Data, messages: Messages): Messages {
  const { installData: iD, installValidation: iV } = data
  if (iV.isValidCodeAlias) {
    messages.successes.push({
      msg: `The code command is ${iD.codeAlias}, and is configured correctly.`,
    })
  } else {
    messages.errors.push({
      msg: `The code command is currently ${iD.codeAlias}, and not configured properly. Follow the URL below for a potential fix.`,
      url: 'https://www.notion.so/seirpublic/code-Command-63eb01fd35744b3189c742bc77e36da3',
    })
  }
  return messages
}

function renderGHExists(data: Data, messages: Messages): Messages {
  const { installData: iD, installValidation: iV } = data
  if (iV.isValidGHLoc) {
    messages.successes.push({
      msg: `The GitHub CLI is installed and located at ${iD.ghLoc}.`,
    })
  } else {
    const message: Message = {
      msg: `The GitHub CLI is not installed. Follow the URL below for a potential fix.`,
    }
    if (isMacOS) {
      message.url =
        'https://www.notion.so/seirpublic/GitHub-CLI-3bc798877af946228ca9f9f7ba17b4d7'
    } else if (isWSLLin) {
      message.url =
        'https://www.notion.so/seirpublic/GitHub-CLI-6c236fb2532f4f169b50cdaf42e3bf35'
    }
    messages.errors.push(message)
  }
  return messages
}

function renderNVMExists(data: Data, messages: Messages): Messages {
  const { installData: iD, installValidation: iV, machineData: mD } = data
  if (iV.isNVMInstalled) {
    messages.successes.push({
      msg: `NVM is ${iD.nvmInstallStatus} and located at ${mD.homedir}/.nvm.`,
    })
  } else {
    messages.errors.push({
      msg: `NVM is ${iD.nvmInstallStatus}. Follow the URL below for a potential fix.`,
      url: 'https://seirpublic.notion.site/NVM-9e5bd97af5854298bfc0451ef0310299',
    })
  }
  return messages
}

function renderInstallLocAndVer(data: Data, messages: Messages): Messages {
  const { installValidation: iV } = data
  const nodeVer = iV.versions.find(version => (version.name = 'nodeVer'))
  const isNodeVerValid = nodeVer?.isValid ? true : false
  const isNVMValid = iV.isNVMInstalled
  iV.versions.forEach(version => {
    switch (version.name) {
      case 'nodeVer': {
        if ((isMacOS && isNVMValid) || (isWSLLin && isNVMValid))
          messages = renderNodeStatus(data, messages, version)
        break
      }
      case 'nodemonVer': {
        if (
          ((isMacOS && isNVMValid) || (isWSLLin && isNVMValid)) &&
          isNodeVerValid
        ) {
          messages = renderNodemonStatus(data, messages, version)
        }
        break
      }
      case 'gitVer': {
        if ((isMacOSValidBrew) || isWSLLin) {
          messages = renderGitStatus(data, messages, version)
        }
        break
      }
    }
  })
  return messages
}

function renderNodeStatus(
  data: Data,
  messages: Messages,
  ver: InstallVersion
): Messages {
  const { installData: iD } = data
  if (ver.isValid) {
    messages.successes.push({
      msg: `Node version ${iD.nodeVer} is installed and located at ${iD.nodeLoc}.`,
    })
  } else {
    messages.errors.push({
      msg: `Node is not installed or is the incorrect version. Follow the URL below for a potential fix.`,
      url: "https://seirpublic.notion.site/Node-1-60f490ce07c248f79c6027ef6d3d5d2e"
    })
  }
  return messages
}


function renderNodemonStatus(
  data: Data,
  messages: Messages,
  ver: InstallVersion
): Messages {
  const { installData: iD } = data
  if (ver.isValid) {
    messages.successes.push({
      msg: `Nodemon version ${iD.nodemonVer} is installed and located at ${iD.nodemonLoc}.`,
    })
  } else {
    messages.errors.push({
      msg: `Nodemon is not installed, or is the incorrect version. Follow the URL below for a potential fix.`,
      url: "https://seirpublic.notion.site/Nodemon-c8dd9ec1999949d6ab9ed9fd571f81f5"
    })
  }
  return messages
}

function renderGitStatus(
  data: Data,
  messages: Messages,
  ver: InstallVersion
): Messages {
  const { installData: iD } = data
  if (ver.isValid) {
    messages.successes.push({
      msg: `Git version ${iD.gitVer} is installed and located at ${iD.gitLoc}.`,
    })
  } else {
    const message: Message = {
      msg: `Git is not installed or is the incorrect version. Follow the URL below for a potential fix.`,
    }
    if (isMacOS) {
      message.url =
        'https://seirpublic.notion.site/Git-5ba7de6602ac4391b3573bbdb1431528'
    } else if (isWSLLin) {
      message.url =
        'https://seirpublic.notion.site/Git-e9ece7514d6146989b5676f93974ba3d'
    }
    messages.errors.push(message)
  }
  return messages
}

function renderHerokuExists(data: Data, messages: Messages): Messages {
  const { installData: iD, installValidation: iV } = data
  if (iV.isValidHerokuLoc) {
    messages.successes.push({
      msg: `The Heroku CLI is installed and located at ${iD.herokuLoc}.`,
    })
  } else {
    const message: Message = {
      msg: `The Heroku CLI is not installed. Follow the URL below for a potential fix.`,
    }
    if (isMacOS) {
      if (isASMac) {
        message.url =
        'https://seirpublic.notion.site/Heroku-Apple-Silicon-a61b6a46ca844bcba1d4e7a99b925f0c'
      } else {
        message.url =
        'https://seirpublic.notion.site/Heroku-Intel-c6b72d0452d04892b4d524c8295f3308'
      }
    } else if (isWSLLin) {
      message.url =
        'https://seirpublic.notion.site/Heroku-631388d36cb8412bb39dff907c7daaa6'
    }
    messages.errors.push(message)
  }
  return messages
}

export {
  manager
}
