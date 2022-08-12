declare interface Data {
  osName: string;
  osVariant?: string;
  isValidOSVariant?: boolean;
  osVersion: string;
  isValidOSVersion: boolean;
  cpuType?: string;
  isValidCPUType?: boolean;
  cpuModel: string;
  ramInGB: number;
  isEnoughRam: boolean;
  homedir: string;
  username: string;
  zshLoc: string;
  shell: string;
  isShellZSH: boolean;
  isVSCodeInstalled?: boolean;
  codeAlias: string;
  brewLoc?: string;
  isValidBrewLoc?: boolean;
  ghLoc: string;
  npmLoc: string;
  npmVer: string;
  isValidNPMVer: boolean;
  nodeLoc: string;
  nodeVer: string;
  isValidNodeVer: boolean;
  nodemonLoc: string;
  nodemonVer: string;
  isValidNodemonVer: boolean;
  herokuLoc: string;
  gitLoc: string;
  isValidGitLoc?: boolean;
  gitVer: string;
  isValidGitVer: boolean;
  gitEmail: string;
  gitEmailMatchesPrompt: boolean;
  gitDefBranch: string;
  isValidGitBranch: boolean;
  gitMergeBehavior: string;
  isValidGitMergeBehavior: boolean;
  gitIgnoreLoc: string;
  isValidGitIgnoreLoc: boolean;
  gitIgnoreExists: boolean;
  gitIgnore: string;
  gitIgnoreHasContent: boolean;
  zshrc: string;
  zshrcHasContent: boolean;
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