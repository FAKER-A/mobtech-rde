'use strict';

module.exports = function (api) {
  api.cache(true);

  const presets = [
    '@babel/preset-react',
    ['@babel/preset-env', {
      'useBuiltIns': 'usage',
      'corejs': 2
    }]
  ];

  const plugins = [
    ['@babel/plugin-proposal-decorators', {legacy: true}],
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-default-from'
  ];

  return {
    presets,
    plugins
  };
}
