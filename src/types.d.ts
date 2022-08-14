declare interface UserData {
  preferredName: string; // ! BLOCKED: ADD CLI PROMPT
  gitHubUsername: string; // ! BLOCKED: ADD CLI PROMPT
  gitHubEmail: string; // ! BLOCKED: ADD CLI PROMPT
  cohortID: string; // ! BLOCKED: ADD CLI PROMPT
}

declare interface UserValidation {
  isValidCohortId: boolean; // ! BLOCKED: ADD CLI PROMPT
  hasPreviousSubmission: boolean; // ! BLOCKED: ADD CLI PROMPT 
}

// ! Done, minus blocker
declare interface MachineData {
  osName: string;
  osVariant?: string; // WSL/Linux only
  osVersion: string;
  homedir: string;
  username: string;
  cpuType?: string; // macOS only
  cpuModel: string;
  vtStatus?: string;
  ramInGB: number;
}

// ! Done, minus blocker
declare interface MachineValidation {
  isValidOSVariant?: boolean; // WSL/Linux only
  isValidOSVersion: boolean; 
  isInvaidOSReason?: number;
  isValidCPUType?: boolean; // macOS only
  isCPUCheckerInstalled?: boolean; // Linux only
  isVTEnabled?: boolean; // ! BLOCKED: Installfest Work/Testing // Linux only
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
  gitDefBranch: string; 
  gitMergeBehavior: string;
  // TKTK ADD CODE CHECK HERE
  gitIgnConLoc: string; 
  gitIgnLoc: string; 
  gitIgn: string; 
  zshrc: string; 
}

// ! Done, minus blocker
declare interface ConfigValidation {
  gitEmailMatchesPrompt: boolean; // ! BLOCKED: ADD CLI PROMPT
  isValidGitBranch: boolean;
  isValidGitMergeBehavior: boolean;
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

declare module 'plist' {
  export function parse(xml: string)
}

declare module 'compare-versions/index.mjs'