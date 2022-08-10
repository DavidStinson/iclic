declare interface Data {
  osName: string;
  osVariant: string;
  cpuType?: string;
  cpuModel: string;
  ramInGB: number;
  homedir: string;
  username: string;
  zshLoc: string;
  shell: string;
  isShellZSH: boolean;
  isVSCodeInstalled?: boolean;
  codeAlias: string;
  brewLoc?: string;
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
  gitEmail: string;
  gitBranch: string;
  gitMerge: string;
  gitIgnore: string;
  gitIgnoreGlobal: string;
  zshrc: string;
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