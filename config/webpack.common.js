'use strict';

const dotenv = require("dotenv")
const fs = require("fs")
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const manifest = require('./dll/manifest.json');
const buildConfig = require('./dll/build.config.json');

const merge = require("webpack-merge");

const {
  getScriptPage
} = require("./utils");

const appJson = require("../app.json")

const prefix = getScriptPage() ? getScriptPage() : appJson.pages[0].entry

const prefixIndex = appJson.pages.findIndex(item => item.entry === prefix)

const basePath = appJson.basePath

const outputPath = (function (env) {
  switch (env) {
    case 'uat':
      return '../dist-uat';
    case 'test':
      return '../dist-test';
    case 'prod':
      return '../dist';
    default:
      return '../dist';
  }
})(process.env.NODE_ENV);

function getDefineObj() {
  let path
  let obj = {}
  switch (process.env.NODE_ENV) {
    case 'development':
      path = '.env.development';
      break
    case 'test':
      path = '.env.test';
      break
    case 'prod':
      path = '.env.production';
      break
    default:
      path = '.env.development';
  }
  let root = process.cwd()
  let target = `${root}/${path}`

  let envConfig = dotenv.config({ path: target }).parsed
  return Object.keys(envConfig).reduce((prev, next) => {
    prev[next] = JSON.stringify(envConfig[next])
    return prev
  }, {})
}
module.exports = {
  entry: {
    main: path.resolve(__dirname, `${basePath}/${prefix}/main.js`)
  },
  output: {
    path: path.resolve(__dirname, `${outputPath}/${prefix}`)
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src')
    },
    modules: [path.resolve(__dirname, '../node_modules')],
    extensions: ['.json', '.js', '.less', '.css']
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader?cacheDirectory=true',
      include: path.resolve(__dirname, '../src'),
      exclude: /node_modules/
    },
    {
      test: /\.(png|jpe?g|gif|svg)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[hash:8].[ext]',
        outputPath: 'static/images'
      }
    },
    {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[hash:8].[ext]',
        outputPath: 'static/media'
      }
    },
    {
      test: /\.(woff2?|eot|ttf|otf)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[hash:8].[ext]',
        outputPath: 'static/font'
      }
    }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../public/vendor'),
      to: 'vendor'
    }]),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      title: appJson.pages[prefixIndex].title,
      cdn: merge(appJson.cdn, appJson.pages[prefixIndex].cdn),
      inject: true,
      buildjs: buildConfig
    }),
    new webpack.DllReferencePlugin({
      manifest: manifest
    }),
    new webpack.DefinePlugin({
      "process.env": getDefineObj()
    })
  ]
}