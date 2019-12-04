'use strict';

const os   = require('os');
const ora  = require('ora');
const path = require('path');
const webpack   = require('webpack');
const portfinder = require('portfinder');
const webpackDevServer = require('webpack-dev-server');
const friendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const webpackDevConfig = require('../config/webpack.dev');
const { port, ...serverConfig } = require('../config/dev.server');

const spinner = ora('启动中...');
spinner.start();

portfinder.basePort = port;
portfinder
  .getPortPromise()
  .then(port => {
    webpackDevConfig.plugins.push(new friendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [
          `You can now view ${path.basename(path.resolve(__dirname, '../'))} in the browser.

          Local:            http://${serverConfig.host}:${port}
          On Yuer NetWork:  http://${getIPAdress()}:${port}`,
        ]
      }
    }));
    const compiler = webpack(webpackDevConfig);
    new webpackDevServer(compiler, serverConfig).listen(port);
    spinner.stop();
  });

function getIPAdress() {
  let interfaces = os.networkInterfaces();
  for (let devName in interfaces) {
    let iface = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
      let alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
  return '127.0.0.1';
}
