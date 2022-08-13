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
  // https://askubuntu.com/q/103965
  vtStatus?: string; // ! BLOCKED: Installfest Work/Testing
  ramInGB: number;
}

// ! Done, minus blocker
declare interface MachineValidation {
  isValidOSVariant?: boolean; // WSL/Linux only
  isValidOSVersion: boolean; 
  isValidCPUType?: boolean; // macOS only
  isVTEnabled?: boolean; // ! BLOCKED: Installfest Work/Testing
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
  [key: string]: string;
}

declare interface InstallValidation {
  isShellZSH: boolean; // * done
  isVSCodeInstalled?: boolean; // macOS only // * done
  isValidCodeAlias: boolean; 
  isValidBrewLoc?: boolean; // macOS only // * done
  isValidNPMVer: boolean; // * done
  isValidNodeVer: boolean; // TODO: IN PROGRESS
  isValidNodemonVer: boolean; // TODO: IN PROGRESS
  isValidGitVer: boolean; // TODO: IN PROGRESS
}

declare interface ConfigData {
  gitEmail: string; 
  gitDefBranch: string; 
  gitMergeBehavior: string; 
  gitIgnConLoc: string; 
  gitIgnLoc: string; 
  gitIgn: string; 
  zshrc: string; 
}

declare interface ConfigValidation {
  gitEmailMatchesPrompt: boolean; // ! BLOCKED: ADD CLI PROMPT
  isValidGitBranch: boolean; // TODO: IN PROGRESS
  isValidGitMergeBehavior: boolean; // TODO: IN PROGRESS
  isValidGitIgnConLoc: boolean; // TODO: IN PROGRESS
  gitIgnExists: boolean; // TODO: IN PROGRESS
  gitIgnHasContent: boolean; // TODO: IN PROGRESS
  zshrcHasContent: boolean; // TODO: IN PROGRESS
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

declare module 'plist' {
  export function parse(xml: string)
}

declare module 'compare-versions/index.mjs'