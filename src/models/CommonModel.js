/**
 * react公用HTTP请求
 */
"use strict";
import 'whatwg-fetch';
import _ from 'lodash';
import CommonFun from '../components/util/utils';//公共方法

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else if (response.status >= 500) {
    CommonFun.showNotificationBox('warning', '请求出错，请稍后再试！');
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  } else {
    CommonFun.showNotificationBox('warning', '服务器忙，请稍后再试！');
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

function parseJSON(response) {
  return response.json()
}

export default class Http {

  static get(url, params = {}) {
    let param = [], iframeHref = window.location.href;
    if (iframeHref.indexOf("token=") != -1) {
      let _token = iframeHref.substring(iframeHref.indexOf("token=") + 6, iframeHref.indexOf("#"))
      sessionStorage.getItem("_token") != _token && sessionStorage.setItem("_token", _token)
    }

    _.keys(params).forEach((key) => {
      param.push(`${key}=${params[key]}`)
    });
    let options = {
      method: 'get',
      credentials: 'same-origin',
      headers: {
        //"x-auth-token": sessionStorage.getItem("_token")
        //"x-auth-token": "85f2d5b7-33dd-45b5-aeca-e73e2d2e7dd8"
      }
    }

    return new Promise((resolve, reject)=> {
      fetch(`${url}?${param.join('&')}`, options)
        .then(checkStatus)
        .then(parseJSON)
        .then((data) => {
          resolve(data);
          if (!!data) {
            if (!!data.code) {
              if (data.code == "-401") {
                CommonFun.showNotificationBox('warning', '登录超时');
              } else if (data.code != 200) {
                CommonFun.showNotificationBox('warning', (!!data.message ? ('请求失败：' + data.message) : '服务正忙，请稍后再试！'));
              }
            }
          }
        })
        .catch((error) => {
          reject(error);
        });
    })
  }

  static post(url, options = {}) {
    let iframeHref = window.location.href;
    if (iframeHref.indexOf("token=") != -1) {
      let _token = iframeHref.substring(iframeHref.indexOf("token=") + 6, iframeHref.indexOf("#"));
      sessionStorage.getItem("_token") != _token && sessionStorage.setItem("_token", _token)
    }
    let _options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //"x-auth-token": sessionStorage.getItem("_token")
        //"x-auth-token": "85f2d5b7-33dd-45b5-aeca-e73e2d2e7dd8"
      },
      credentials: "same-origin",
    };

    if (options) {
      _options.body = JSON.stringify(options);
    }
    console.log(_options);
    return new Promise((resovle, reject)=> {
      fetch(url, _options)
        .then(checkStatus)
        .then(parseJSON)
        .then((data) => {
          resovle(data);
          if (!!data) {
            if (!!data.code) {
              if (data.code == "-401") {
                CommonFun.showNotificationBox('warning', '登录超时');
              } else if (data.code != 200) {
                CommonFun.showNotificationBox('warning', (!!data.message ? ('请求失败：' + data.message) : '服务正忙，请稍后再试！'));
              }
            }
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
