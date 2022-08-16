// ** THIS IS COMPLETE! THIS IS RENDERING!
declare interface UserData {
  preferredName: string;
  gitHubUsername: string;
  gitHubEmail: string;
  cohortId: string;
  [key: string];
}

// ! BLOCKED: NEED TO BUILD A BACK END
declare interface UserValidation {
  isUser: boolean;
  isValidCohortId: boolean; // ! BLOCKED: NEED A BACK END
  hasPreviousSubmission: boolean; // ! BLOCKED: NEED A BACK END
  cohortName: string; // ! BLOCKED: NEED A BACK END
}

// ** THIS IS COMPLETE! THIS IS RENDERING!
declare interface MachineData {
  osName: string;
  osVariant?: string; // WSL/Linux only
  osVersion: string;
  homedir: string;
  username: string;
  cpuType?: string; // macOS only
  cpuModel: string; 
  vtStatus?: string; // Linux only //
  ramInGB: number;
}

// ** THIS IS COMPLETE! THIS IS RENDERING!
declare interface MachineValidation {
  isValidOSVariant?: boolean; // WSL/Linux only
  isValidOSVersion: boolean;
  isInvaidOSReason?: number; // only invalid OS Version
  isValidCPUType?: boolean; // macOS only
  isCPUCheckerInstalled?: boolean; // Linux only
  isVTEnabled?: boolean; // Linux only
  isMinRAM: boolean; 
  isRecRAM: boolean; 
}

// ** THIS IS COMPLETE! THIS IS RENDERING!
declare interface InstallData {
  zshLoc: string;
  shell: string;
  vsCodeLoc?: string; // macOS only
  codeAlias: string;
  brewLoc?: string; // macOS only
  ghLoc: string;
  nvmInstallStatus: string;
  nodeLoc: string;
  nodeVer: string;
  nodemonLoc: string;
  nodemonVer: string;
  gitLoc: string;
  gitVer: string;
  herokuLoc: string;
}

// ** THIS IS COMPLETE! THIS IS RENDERING!
declare interface InstallValidation {
  isShellZSH: boolean;
  isVSCodeInstalled?: boolean; // macOS only
  isValidCodeAlias: boolean;
  isValidBrewLoc?: boolean; // macOS only
  isValidGHLoc: boolean;
  isNVMInstalled: boolean;
  versions: InstallVersion[];
  isValidHerokuLoc: boolean;
}

// * THIS IS COMPLETE
declare interface ConfigData {
  gitEmail: string; // * all
  gitCredMan?: string; // WSL only // * all
  ghLoginStatus: string; // * all
  gitDefBranch: string; // * all
  gitMergeBehavior: string; // * all
  gitEditor: string; // * all
  gitIgnConLoc: string; // * all
  gitIgnLoc: string; 
  gitIgn: string; 
  zshrc: string; 
}

// * THIS IS COMPLETE
declare interface ConfigValidation {
  gitEmailMatchesPrompt?: boolean; // Submit only // * all
  isValidGitCredMan?: boolean; // WSL only // * all
  isLoggedIntoGH: boolean; // * all
  isValidGitEmail: boolean; // * all
  isValidGitBranch: boolean; // * all
  isValidGitMergeBehavior: boolean; // * all
  isValidGitEditor: boolean; // * all
  isValidGitIgnConLoc: boolean; // * all
  gitIgnExists: boolean;
  gitIgnHasContent: boolean;
  zshrcHasContent: boolean;
}

declare interface Data {
  userData: UserData;
  userValidation: UserValidation;
  machineData: MachineData;
  machineValidation: MachineValidation;
  installData: InstallData;
  installValidation: InstallValidation;
  configData: ConfigData;
  configValidation: ConfigValidation;
}

declare interface InstallVersion {
  name: keyof InstallData;
  vName: keyof InstallValidators;
  isValid: boolean;
  invalidReason?: number;
}

declare interface CommandsForInstallData {
  dataKey: keyof InstallData;
  command: string;
}

declare interface CommandsForConfigData {
  dataKey: keyof ConfigData;
  command: string;
}

declare interface PlistObject {
  ProductBuildVersion: string;
  ProductCopyright: string;
  ProductName: string;
  ProductUserVisibleVersion: string;
  ProductVersion: string;
  iOSSupportVersion: string;
}

declare interface InstallValidators {
  nodeVer: string;
  nodemonVer: string;
  gitVer: string;
}

declare interface Questions {
  type: string;
  name: keyof UserData;
  message: string;
  filter?(value: string): string;
  validate?(value: string): true | string;
}

declare interface Messages {
  info: Message[];
  successes: Message[];
  warns: Message[];
  errors: Message[];
}

declare interface Message {
  msg: string;
  url?: string;
}

declare module 'plist' {
  export function parse(xml: string)
}

declare module 'compare-versions/index.mjs'