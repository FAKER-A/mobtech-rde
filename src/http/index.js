import axios from "axios";
import Cookies from "js-cookie";

import { message } from "antd"

import { toLogin } from "../utils/index.js"

import JSONbigint from "json-bigint"

const qs = require("qs");

// 请求拦截器
axios.interceptors.request.use(
  config => {
    // loading
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器即异常处理
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.resolve(error.response);
  }
);
// 检测Status
function checkStatus(response) {
  if (!response) {
    message.error(
      500
    );
    throw response;
  }
  if (response.status === 200) {
    // 此处放端口监测方法
    if (
      response.data.code === 801 ||
      response.data.code === 901 ||
      response.data.code === 401
    ) {
      // 登录状态过期，返回登录页
      toLogin();
    } else if (response.data.code === 200) {
      // response.data = repleaceSymbol(response.data);
      return response.data;
    } else {
      message.error(
        response.data.message
      );
      throw response;
    }
  } else if (response.status === 401) {
    toLogin();
  } else {
    message.error(
      response.statusText
    );
    throw response;
    // return ;
  }
}
axios.defaults.baseURL = process.env.API;
// console.log(process.env)
axios.defaults.withCredentials = true;
axios.defaults.headers = {
  "Content-Type": "application/json;charset=utf8"
};
function postJson(url, data = {}) {
  return axios({
    method: "POST",
    url,
    data,
    headers: {
      token: Cookies.get("mobdata_token") || ""
    },
    transformResponse: [function (data) {
      // Do whatever you want to transform the data
      return JSONbigint.parse(data)
    }],
  }).then(response => {
    return checkStatus(response);
  });
}
function getJson(url, data = {}) {
  return axios({
    method: "GET",
    url,
    params: data || {},
    headers: {
      token: Cookies.get("mobdata_token") || ""
    },
    xhrFields: {
      withCredentials: true
    },
    transformResponse: [function (data) {
      // Do whatever you want to transform the data
      return JSONbigint.parse(data)
    }],
    crossDomain: true
  }).then(response => {
    return checkStatus(response);
  });
}
function putJson(url, data = {}) {
  return axios({
    method: "PUT",
    url,
    data: qs.stringify(data),
    headers: {
      token: Cookies.get("mobdata_token") || "",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    transformResponse: [function (data) {
      // Do whatever you want to transform the data
      return JSONbigint.parse(data)
    }],
  }).then(response => {
    return checkStatus(response);
  });
}
function deleteJson(url, data = {}) {
  return axios({
    method: "DELETE",
    url,
    data,
    headers: {
      token: Cookies.get("mobdata_token") || ""
    },
    transformResponse: [function (data) {
      // Do whatever you want to transform the data
      return JSONbigint.parse(data)
    }],
  }).then(response => {
    return checkStatus(response);
  });
}
function formPost(url, data = {}) {
  return axios({
    method: "POST",
    url,
    data: qs.stringify(data),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  }).then(response => {
    return checkStatus(response);
  });
}

// 直接对接工作流专用
function postJosnWorkflow(url, data = {}) {
  return axios({
    method: "POST",
    baseURL: process.env.engine,
    url,
    data,
    headers: {
      token: Cookies.get("mobdata_token") || ""
    },
  })
}

export { postJson, getJson, putJson, deleteJson, formPost, postJosnWorkflow };
