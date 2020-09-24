import axios from 'axios'
import * as Alert from './alert'
import router from '../router/index'
import {ResponseEnum, TOKEN} from './consts.js'

/**
 * axios相关设置
 */
axios.defaults.headers.post['Content-Type'] = 'application/json';

// 创建axios实例
const Ajax = axios.create({
  baseURL: '/api',
  timeout: 10000
});

// 请求拦截（配置发送请求的信息）
Ajax.interceptors.request.use(config => requestBefore(config), error => requestError(error));

// 响应拦截（配置请求回来的信息）
Ajax.interceptors.response.use(response => responseSuccess(response), error => responseError(error));

/**
 * 请求前
 */
function requestBefore(config) {
  let token = sessionStorage.getItem(TOKEN);
  config.headers.common.Authorization = token && token;
  return config;
}

/**
 * 请求错误
 */
function requestError(error) {
  Alert.error("requestError");
  return Promise.reject(error);
}

/**
 * 响应成功
 */
function responseSuccess(response) {
  if (response.data.code == ResponseEnum.ACCESS_DENY.code) {
    Alert.error(ResponseEnum.ACCESS_DENY.msg);
    router.replace({
      path: '/accessDeny',
      query: {redirect: router.currentRoute.fullPath}
    });
    return;
  }
  if (response.data.code == ResponseEnum.TOKEN_IS_EMPTY.code || response.data.code == ResponseEnum.TOKEN_IS_EXPIRED.code) {
    Alert.error(response.data.msg);
    router.replace({
      path: '/',
      query: {redirect: router.currentRoute.fullPath}
    });
    return;
  }
  if (response.data.code !== ResponseEnum.SUCCESS.code) {
    Alert.error(response.data.msg);
    return;
  }
  return response;
}

/**
 * 响应失败
 */
function responseError(error) {
  if (error.response && error.response.status === 404) {
    Alert.error('请求路径错了');
    return;
  }
  if (error.response && error.response.status === 500) {
    Alert.error('服务器开小猜了');
    return;
  }
  Alert.error(ResponseEnum.ERROR.msg);
  // 处理响应失败
  return Promise.reject(error);
}

export default Ajax
