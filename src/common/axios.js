import axios from 'axios'
import * as Alert from './alert'
import router from '../router/index'
import {JWT_TOKEN, ResponseEnum} from './consts.js'

/**
 * axios相关设置
 */
axios.defaults.headers.post['Content-Type'] = 'application/json';

// 创建axios实例
const Ajax = axios.create({
  baseURL: '/api',
  timeout: 30000
});

// 请求拦截（配置发送请求的信息）
Ajax.interceptors.request.use(function (config) {
  // 处理请求之前的配置
  let token = sessionStorage.getItem(JWT_TOKEN);
  config.headers.common.token = token && "Bearer " + token;
  return config;
}, function (error) {
  // 请求失败的处理
  Alert.error(ResponseEnum.ERROR.msg);
  return Promise.reject(error);
});
// 响应拦截（配置请求回来的信息）
Ajax.interceptors.response.use(function (response) {
  if (response.data.code == ResponseEnum.ACCESS_DENY.code) {
    Alert.error(ResponseEnum.ACCESS_DENY.msg);
    router.replace({
      path: '/accessDeny',
      query: {redirect: router.currentRoute.fullPath}
    });
    return;
  }
  if (response.data.code == ResponseEnum.TOKEN_ERROR.code) {
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
}, function (error) {
  if (error.response.status === 404) {
    Alert.error('请求路径错了');
    return;
  }
  if (error.response.status === 500) {
    Alert.error('服务器开小猜了');
    return;
  }
  Alert.error(ResponseEnum.ERROR.msg);
  // 处理响应失败
  return Promise.reject(error);

});

export default Ajax
