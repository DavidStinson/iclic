function manager(data: Data, messages: Messages): Messages {
  const { machineData: mD } = data
  messages = renderZSH(data, messages)
  if (mD.osName === "macOS") {
    messages = renderVSCodeLoc(data, messages)
    messages = renderBrewLoc(data, messages)
  }
  messages = renderVSCodeAlias(data, messages)
  messages = renderGHExists(data, messages)
  return messages
}

function renderZSH(data: Data, messages: Messages): Messages {
  const { machineData: mD, installData: iD, installValidation: iV } = data
  if (iV.isShellZSH) {
    messages.successes.push({
      msg: `The current shell is zsh, located at ${iD.shell}.`
    })
  } else {
    const message: Message = { msg: `The current shell is ${iD.shell}, and must be changed to zsh. Follow the URL below for a potential fix.` }
    if (mD.osName === "macOS") {
      message.url = "https://www.notion.so/seirpublic/ZSH-ea65a37a77cd486b88a007ce7b9f3ed6"
    } else if (mD.osName === "WSL2") {
      message.url = "https://www.notion.so/seirpublic/ZSH-8578b56420944d1790b402357363a1a8"
    } else if (mD.osName === "Linux") {
      message.url = "https://www.notion.so/seirpublic/ZSH-2980b249f8d64b3980f5f67c12e2188e"
    }
    messages.errors.push(message)
  }
  return messages
}

function renderVSCodeLoc(data: Data, messages: Messages): Messages {
  const { installValidation: iV } = data
  if (iV.isVSCodeInstalled) {
    messages.successes.push({
      msg: `Visual Studio Code is installed in the Applications directory.`
    })
  } else {
    messages.errors.push({
      msg: `Visual Studio Code is not installed. Follow the URL below for a potential fix.`,
      url: "https://seirpublic.notion.site/VS-Code-Installation-7a6371a6732649f8add2a6286cce91bf"
    })
  }
  return messages
}

function renderBrewLoc(data: Data, messages: Messages): Messages {
  const { machineData: mD, installData: iD, installValidation: iV } = data
  if (iV.isValidBrewLoc) {
    messages.successes.push({
      msg: `Homebrew is installed to ${iD.brewLoc}, which is the correct location for ${mD.cpuType} Macs.`
    })
  } else {
    messages.errors.push({
      msg: `Homebrew is installed to ${iD.brewLoc}, which is not the correct location for ${mD.cpuType} Macs. Follow the URL below for a potential fix.`,
      url: "https://www.notion.so/seirpublic/Reach-Out-to-an-Instructor-dfd2a7539ad54b6e9e815d132ff6c99c"
    })
  }
  return messages
}

function renderVSCodeAlias(data: Data, messages: Messages): Messages {
  const { installData: iD, installValidation: iV } = data
  if (iV.isValidCodeAlias) {
    messages.successes.push({
      msg: `The code command is ${iD.codeAlias}, and is configured correctly.`
    })
  } else {
    messages.errors.push({
      msg: `The code command is currently ${iD.codeAlias}, and not configured properly. Follow the URL below for a potential fix.`,
      url: "https://www.notion.so/seirpublic/code-Command-63eb01fd35744b3189c742bc77e36da3"
    })
  }
  return messages
}

function renderGHExists(data: Data, messages: Messages): Messages {
  const { machineData: mD, installData: iD, installValidation: iV } = data
  if (iV.isValidGHLoc) {
    messages.successes.push({
      msg: `The GitHub CLI is installed and located at ${iD.ghLoc}.`
    })
  } else {
    const message: Message = { msg: `The GitHub CLI is not installed. Follow the URL below for a potential fix.` }
    if (mD.osName === "macOS") {
      message.url = "https://www.notion.so/seirpublic/GitHub-CLI-3bc798877af946228ca9f9f7ba17b4d7"
    } else if (mD.osName === "WSL2" || mD.osName === "Linux") {
      message.url = "https://www.notion.so/seirpublic/GitHub-CLI-6c236fb2532f4f169b50cdaf42e3bf35"
    }
    messages.errors.push(message)
  }
  return messages
}

export {
  manager
}