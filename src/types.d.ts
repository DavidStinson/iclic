declare interface Data {
  osName: string; // * done
  osVariant?: string; // * done
  isValidOSVariant?: boolean; // * done
  osVersion: string; // * done
  isValidOSVersion: boolean; // * done
  cpuType?: string; // * done
  isValidCPUType?: boolean; // * done
  cpuModel: string; // * done
  // https://askubuntu.com/q/103965
  vtStatus?: string; // ! BLOCKED: Installfest Work/Testing
  isVTEnabled?: boolean; // ! BLOCKED: Installfest Work/Testing
  ramInGB: number; // * done
  isMinRAM: boolean; // * done
  isRecRAM: boolean; // * done
  homedir: string; // * done
  username: string; // * done
  zshLoc: string; // * done
  shell: string;  // * done
  isShellZSH: boolean; // * done
  isVSCodeInstalled?: boolean;
  codeAlias: string; // * done
  isValidCodeAlias: boolean;
  brewLoc?: string; // * done
  isValidBrewLoc?: boolean; // * done
  ghLoc: string; // * done
  npmLoc: string; // * done
  npmVer: string; // * done
  isValidNPMVer: boolean; // * done
  nodeLoc: string; // * done
  nodeVer: string; // * done
  isValidNodeVer: boolean; // TODO: IN PROGRESS
  nodemonLoc: string; // * done
  nodemonVer: string; // * done
  isValidNodemonVer: boolean; // TODO: IN PROGRESS
  herokuLoc: string; // * done
  gitLoc: string; // * done
  gitVer: string; // * done
  isValidGitVer: boolean; // TODO: IN PROGRESS
  gitEmail: string; // * done
  gitEmailMatchesPrompt: boolean; // ! BLOCKED: ADD CLI PROMPT
  gitDefBranch: string; // * done
  isValidGitBranch: boolean; // TODO: IN PROGRESS
  gitMergeBehavior: string; // * done
  isValidGitMergeBehavior: boolean; // TODO: IN PROGRESS
  gitIgnoreLoc: string; // * done
  isValidGitIgnoreLoc: boolean; // TODO: IN PROGRESS
  gitIgnoreExists: boolean; // * done
  gitIgnore: string; // * done
  gitIgnoreHasContent: boolean; // TODO: IN PROGRESS
  zshrc: string; // * done
  zshrcHasContent: boolean; // TODO: IN PROGRESS
  [key: string]: string | number | boolean | undefined;
}

declare interface CommandsForData {
  dataKey: keyof Data;
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