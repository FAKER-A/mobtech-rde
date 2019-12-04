'use strict';

import axios from 'axios';
import Qs from 'qs';

export let fetch = axios.create();

fetch.interceptors.request.use(function (config) {
  let token = localStorage.getItem('token') || ''
  return {
    ...config,
    headers: {
      ...config.headers,
      token
    }
  }
}, function (error) {
  return Promise.reject(error);
});

fetch.interceptors.response.use(function (response) {
  let res = response.data || {};
  return res;
}, function (error) {
  return Promise.reject(error);
});

export function get (url, parm) {
  return new Promise(function (resolve, reject) {
    fetch
      .get(url, {params: parm})
      .then(res => {
        resolve(res)
      })
  })
}

export function post (url, parm) {
  return new Promise(function (resolve, reject) {
    fetch({
        url: url,
        data: Qs.stringify(parm),
        method: 'post',
        withCredentials: false,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      })
      .then(res => {
        resolve(res)
      })     
  })
}

export default {
  get,
  post
}
