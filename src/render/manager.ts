import chalk from "chalk"

const log = console.log
const cErr = chalk.bold.red

function main(data: Data): void {
  return
}

function error(msg: string): void {
  log(cErr(msg))
}

export {
  main,
  error
}