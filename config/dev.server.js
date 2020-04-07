"use strict";

const proxy = {
  "/api": {
    // 目标Url
    target: "http://oa.mamage.test.mob.com",
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      "^/api": "/api"
    }
  },
  "/bpm": {
    target: "http://engine.oa.test.mob.com",
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      "^/bpm": "/bpm"
    }
  }
};

module.exports = {
  proxy,
  port: 3000,
  host: "0.0.0.0",
  hot: true,
  quiet: true,
  inline: true,
  noInfo: true,
  compress: true,
  clientLogLevel: "none",
  historyApiFallback: true,
  disableHostCheck: true
};
