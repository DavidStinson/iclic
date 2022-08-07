#!/usr/bin/env node
import os from "os";
import chalk from "chalk";
import * as macOS from "./mac-os.js";
import * as wslLinux from "./wsl-linux.js";
const log = console.log;
const cErr = chalk.bold.red;
const data = {
    os: "",
    cpuType: ""
};
const osType = os.type();
switch (osType) {
    case 'Darwin':
        data.os = "macOS";
        data.cpuType = macOS.cpuType();
        break;
    case 'Linux':
        data.os = wslLinux.checkForWSL();
        break;
    default:
        log(cErr("This OS is not supported"));
        process.exit();
}
log(`Operating System: ${data.os}`);
