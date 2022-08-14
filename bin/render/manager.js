import chalk from "chalk";
const log = console.log;
const cErr = chalk.bold.red;
function main(data) {
    return;
}
function error(msg) {
    log(cErr(msg));
}
export { main, error };
