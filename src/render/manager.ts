import chalk from 'chalk'

import * as machineRender from './machine.js'
import * as installRender from './install.js'
import * as configRender from './config.js'

const log = console.log
const cInfo = chalk.cyan
const cSuccess = chalk.green
const cWarn = chalk.yellow
const cErr = chalk.bold.red
const cLink = chalk.underline.blue

const messages: Messages = {
  info: [],
  successes: [],
  warns: [],
  errors: [],
}

async function renderData(data: Data): Promise<void> {
  if (data.userValidation.isUser) {
    log(cInfo(`Welcome ${data.userData.preferredName}, here's your report!`))
    // TKTK ADD cohort name here?
  }
  const machineMessages = machineRender.manager(data, messages)
  const installMessages = installRender.manager(data, machineMessages)
  const configMessages = configRender.manager(data, installMessages)
  await displayMessages(configMessages)
  if (!messages.errors.length) {
    log(cSuccess.bold('🚀 Massive success! Your Installfest is error free!'))
  } else {
    log(cErr('💥 Your installfest has errors above, which you should resolve.'))
    log(cErr('   Reach out to your installfest point of contact if you need assistance.'))

  }
}

async function displayMessages(messages: Messages) {
  for (const msg of messages.info) {
    await timer()
    infoMessage(msg)
  }
  for (const msg of messages.successes) {
    await timer()
    successMessage(msg)
  }
  for (const msg of messages.warns) {
    await timer()
    warnMessage(msg)
  }
  for (const msg of messages.errors) {
    await timer()
    errorMessage(msg)
  }
}

async function infoMessage(message: Message) {
  log(cInfo('ℹ'), message.msg)
  if (message.url) log(cLink(message.url))
}

async function successMessage(message: Message) {
  log(cSuccess(`✔ ${message.msg}`))
  if (message.url) log(cLink(message.url))
}

async function warnMessage(message: Message) {
  log(cWarn(`⚠ ${message.msg}`))
  if (message.url) log(cLink(message.url))
}

async function errorMessage(message: Message) {
  log(cErr(`x ${message.msg}`))
  if (message.url) log(cLink(message.url))
}

function timer(): Promise<void> {
  return new Promise(res => setTimeout(res, 120))
}

function error(msg: string): void {
  log(cErr(msg))
}

export { renderData, error }
