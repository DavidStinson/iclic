let isMacOS = false
let isWSLLin = false

function manager(data: Data, messages: Messages): Messages {
  const { machineData: mD, installValidation: iV } = data
  isMacOS = mD.osName === 'macOS'
  isWSLLin = mD.osName === 'WSL2' || mD.osName === 'Linux'


  return messages
}

export {
  manager
}