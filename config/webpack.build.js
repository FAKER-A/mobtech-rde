'use strict';

const webpackMerge  = require('webpack-merge');
const CleanWebpackPlugin    = require('clean-webpack-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

const webpackCommonConfig = require('./webpack.common');

module.exports = webpackMerge(
  webpackCommonConfig,
  {
    mode: 'production',
    performance: {
      hints: false
    },
    output: {
      filename: 'static/js/[name].[contenthash:8].js'
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          loader: ['style-loader', 'css-loader', 'postcss-loader']
        },
        {
          test: /\.less$/,
          loader: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
    ],
    optimization: {
      runtimeChunk: {
        name: 'runtime'
      },
      minimizer: [
        new UglifyjsWebpackPlugin(),
        new OptimizeCssAssetsWebpackPlugin({
          cssProcessorOptions: {
            safe: true,
            discardComments: { removeAll: true }
          }
        })
      ]
    }
  }
);
