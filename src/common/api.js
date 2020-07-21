import Ajax from './axios.js'

/**
 * 系统管理
 */
// 登陆
export const login = params => { return Ajax.post(`controller/login/login`, params).then(res => res.data); };
