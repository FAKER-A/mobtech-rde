'use strict'

var chalk = require("chalk")
const { execSync } = require('child_process');
var pages = require("../app.json").pages.map(item => item.entry)
var arg = process.argv[2]

if (!arg) {
  console.log(chalk.red(` 打包所有项目！\n`));
  let str = pages.map(item => `node scripts/build.js ${item}`).join(" && ")
  console.log(str)
  let child = execSync(str);
  console.log(child.toString())
  return
}
if (!pages.includes(arg)) {
  console.log(chalk.red(` app.json中不存在 “${arg}” 项目！\n`));
  return
}

let str = `node scripts/build.js ${arg}`
console.log(str)
let child = execSync(str)
console.log(child.toString())