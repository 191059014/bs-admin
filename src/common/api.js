import Ajax from './axios.js'

/**
 * 系统管理
 */
// 登陆
export const login = (params, rememberMe) => {
  return Ajax.post(`bs/noauth/login/login?rememberMe=` + rememberMe, params).then(res => res.data);
};
// 获取私人的所有菜单信息
export const getPrivateMenuDatas = () => {
  return Ajax.get(`bs/auth/access/getPrivateMenuDatas`).then(res => res.data);
};
/**
 * 商户管理
 */
// 分页查询商户列表
export const getMerchantPages = (params, pageNum, pageSize) => {
  return Ajax.post(`bs/auth/merchant/queryPages?pageNum=` + pageNum + '&pageSize=' + pageSize, params).then(res => res.data);
};
// 添加商户
export const addMerchant = (params) => {
  return Ajax.post(`bs/auth/merchant/add`, params).then(res => res.data);
};
// 修改商户
export const updateMerchant = (params, merchantId) => {
  return Ajax.post(`bs/auth/merchant/update?merchantId=` + merchantId, params).then(res => res.data);
};
// 删除商户
export const deleteMerchant = (merchantId) => {
  return Ajax.get(`bs/auth/merchant/delete?merchantId=` + merchantId).then(res => res.data);
};
/**
 * 用户管理
 */
// 分页查询用户列表
export const getUserPages = (params, pageNum, pageSize) => {
  return Ajax.post(`bs/auth/user/queryPages?pageNum=` + pageNum + '&pageSize=' + pageSize, params).then(res => res.data);
};
// 添加用户
export const addUser = (params) => {
  return Ajax.post(`bs/auth/user/add`, params).then(res => res.data);
};
// 修改用户
export const updateUser = (params, userId) => {
  return Ajax.post(`bs/auth/user/update?merchantId=` + merchantId, params).then(res => res.data);
};
// 删除用户
export const deleteUser = (userId) => {
  return Ajax.get(`bs/auth/user/delete?merchantId=` + merchantId).then(res => res.data);
};
