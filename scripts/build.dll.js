'use strict';

const ora   = require('ora');
const path  = require('path');
const chalk = require('chalk');
const rm    = require('rimraf');
const webpack = require('webpack');
const webpackConfig = require('../config/webpack.dll');

const spinner = ora('building for dll...')
spinner.start()

rm(path.resolve(__dirname, '../config/dll'), err => {
  if (err) { throw err; }
  webpack(
    webpackConfig,
    (err, stats) => {
      spinner.stop()
      if (err) { throw err; }
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n');
  
      if (stats.hasErrors()) {
        console.log(chalk.red('  Build failed with errors.\n'));
        process.exit(1);
      }
  
      console.log(chalk.cyan('  Build complete.\n'));
    }
  )
});
