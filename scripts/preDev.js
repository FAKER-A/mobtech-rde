'use strict'

var chalk = require("chalk")
const { execSync } = require('child_process');
var pages = require("../app.json").pages.map(item => item.entry)
var arg = process.argv[2]

if (!arg) {
  let str = `node scripts/dev.js ${pages[0]}`
  console.log(str)
  let child = execSync(str, {
    windowsHide: true
  });
  console.log(child.toString())
  return
}
if (!pages.includes(arg)) {
  console.log(chalk.red(` app.json中不存在 “${arg}” 项目！\n`));
  return
}

let str = `node scripts/dev.js ${arg}`
console.log(str)
let child = execSync(str)
console.log(child.toString())