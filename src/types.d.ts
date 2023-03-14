declare interface UserData {
  preferredName: string
  gitHubUsername: string
  gitHubEmail: string
  cohortId: string
  [key: string]
}

// ! BLOCKED: NEED TO BUILD A BACK END
declare interface UserValidation {
  isUser: boolean
  isValidCohortId: boolean // ! BLOCKED: NEED A BACK END
  hasPreviousSubmission: boolean // ! BLOCKED: NEED A BACK END
  cohortName: string // ! BLOCKED: NEED A BACK END
}

declare interface MachineData {
  osName: string
  osVariant?: string // WSL/Linux only
  osVersion: string
  homedir: string
  username: string
  cpuType?: string // macOS only
  cpuModel: string
  vtStatus?: string // Linux only //
  ramInGB: number
}

declare interface MachineValidation {
  isValidOSVariant?: boolean // WSL/Linux only
  isValidOSVersion: boolean
  isInvaidOSReason?: number // only invalid OS Version
  isValidCPUType?: boolean // macOS only
  isCPUCheckerInstalled?: boolean // Linux only
  isVTEnabled?: boolean // Linux only
  isMinRAM: boolean
  isRecRAM: boolean
}

declare interface InstallData {
  zshLoc: string
  shell: string
  vsCodeLoc?: string // macOS only
  codeAlias: string
  brewLoc?: string // macOS only
  ghLoc: string
  nvmInstallStatus: string
  nodeLoc: string
  nodeVer: string
  nodemonLoc: string
  nodemonVer: string
  gitLoc: string
  gitVer: string
}

declare interface InstallValidation {
  isShellZSH: boolean
  isVSCodeInstalled?: boolean // macOS only
  isValidCodeAlias: boolean
  isValidBrewLoc?: boolean // macOS only
  isValidGHLoc: boolean
  isNVMInstalled: boolean
  versions: InstallVersion[]
}

declare interface ConfigData {
  gitEmail: string
  gitCredMan?: string // WSL only
  ghLoginStatus: string
  gitDefBranch: string
  gitMergeBehavior: string
  gitEditor: string
  gitIgnConLoc: string
  gitIgnLoc: string
  gitIgn: string
  zshrc: string
}

declare interface ConfigValidation {
  gitEmailMatchesPrompt?: boolean // Submit only
  isValidGitCredMan?: boolean // WSL only
  isLoggedIntoGH: boolean
  isValidGitEmail: boolean
  isValidGitBranch: boolean
  isValidGitMergeBehavior: boolean
  isValidGitEditor: boolean
  isValidGitIgnConLoc: boolean
  gitIgnExists: boolean
  gitIgnHasContent: boolean
  zshrcHasContent: boolean
}

declare interface Data {
  userData: UserData
  userValidation: UserValidation
  machineData: MachineData
  machineValidation: MachineValidation
  installData: InstallData
  installValidation: InstallValidation
  configData: ConfigData
  configValidation: ConfigValidation
}

declare interface InstallVersion {
  name: keyof InstallData
  vName: keyof InstallValidators
  isValid: boolean
  invalidReason?: number
}

declare interface CommandsForInstallData {
  dataKey: keyof InstallData
  command: string
}

declare interface CommandsForConfigData {
  dataKey: keyof ConfigData
  command: string
}

declare interface PlistObject {
  ProductBuildVersion: string
  ProductCopyright: string
  ProductName: string
  ProductUserVisibleVersion: string
  ProductVersion: string
  iOSSupportVersion: string
}

declare interface InstallValidators {
  nodeVer: string
  nodemonVer: string
  gitVer: string
}

declare interface Questions {
  type: string
  name: keyof UserData
  message: string
  filter?(value: string): string
  validate?(value: string): true | string
}

declare interface Messages {
  info: Message[]
  successes: Message[]
  warns: Message[]
  errors: Message[]
}

declare interface Message {
  msg: string
  url?: string
}

declare module 'plist' {
  export function parse(xml: string)
}

declare module 'compare-versions/index.mjs'
