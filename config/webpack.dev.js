'use strict';

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const webpackCommonConfig = require('./webpack.common');

module.exports = webpackMerge(
  webpackCommonConfig,
  {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    output: {
      filename: 'static/js/[name].js'
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          loader: ['style-loader', 'css-loader']
        },
        {
          test: /\.less$/,
          loader: ['style-loader', 'css-loader', 'less-loader']
        }
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  }
);
