// ** THIS IS COMPLETE!
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

// ** THIS IS COMPLETE!
declare interface MachineData {
  osName: string; // * all
  osVariant?: string; // WSL/Linux only // * all
  osVersion: string; // * all
  homedir: string; // * all
  username: string; // * all
  cpuType?: string; // macOS only // * macOS
  cpuModel: string; // * all
  vtStatus?: string; // Linux only //
  ramInGB: number;
}

// ** THIS IS COMPLETE!
declare interface MachineValidation {
  isValidOSVariant?: boolean; // WSL/Linux only // * all
  isValidOSVersion: boolean; // * all
  isInvaidOSReason?: number; // only invalid OS Version // * all
  isValidCPUType?: boolean; // macOS only // * all
  isCPUCheckerInstalled?: boolean; // Linux only
  isVTEnabled?: boolean; // Linux only
  isMinRAM: boolean; 
  isRecRAM: boolean; 
}

// ** THIS IS COMPLETE!
declare interface InstallData {
  zshLoc: string; 
  shell: string;  
  vsCodeLoc?: string; // macOS only
  codeAlias: string; 
  brewLoc?: string; // macOS only
  ghLoc: string; 
  npmLoc: string; 
  npmVer: string; 
  nodeLoc: string; 
  nodeVer: string; 
  nodemonLoc: string; 
  nodemonVer: string; 
  herokuLoc: string; 
  gitLoc: string; 
  gitVer: string;
}

// ** THIS IS COMPLETE!
declare interface InstallValidation {
  isShellZSH: boolean;
  isVSCodeInstalled?: boolean; // macOS only
  isValidCodeAlias: boolean;
  isValidBrewLoc?: boolean; // macOS only
  versions: InstallVersion[];
}

// * THIS IS COMPLETE
declare interface ConfigData {
  gitEmail: string; 
  gitCredMan?: string; // WSL only
  gitDefBranch: string; 
  gitMergeBehavior: string;
  gitEditor: string;
  gitIgnConLoc: string; 
  gitIgnLoc: string; 
  gitIgn: string; 
  zshrc: string; 
}

// * THIS IS COMPLETE
declare interface ConfigValidation {
  gitEmailMatchesPrompt?: boolean; // Submit only
  isValidGitCredMan?: boolean; // WSL only
  isValidGitBranch: boolean;
  isValidGitMergeBehavior: boolean;
  isValidGitEditor: boolean;
  isValidGitIgnConLoc: boolean;
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
  npmVer: string;
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