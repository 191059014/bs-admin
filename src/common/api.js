import Ajax from './axios.js'

/**
 * 公共
 */
// 获取枚举下拉框
export const getEnumCombobox = (type) => {
  return Ajax.get(`bs/noauth/common/combobox/` + type).then(res => res.data);
};

/**
 * 系统管理
 */
// 登陆
export const login = (params, rememberMe) => {
  return Ajax.post(`bs/noauth/login/login?rememberMe=` + rememberMe, params).then(res => res.data);
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
// 获取所有下级商户
export const getAllSubMerchants = () => {
  return Ajax.get(`bs/auth/merchant/getAllSubMerchants`).then(res => res.data);
};
/**
 * 用户管理
 */
// 分页查询用户列表
export const getUserPages = (params, pageNum, pageSize) => {
  return Ajax.post(`bs/auth/user/queryPages?pageNum=` + pageNum + '&pageSize=' + pageSize, params).then(res => res.data);
};
// 获取当前用户信息
export const getCurrentUser = () => {
  return Ajax.get(`bs/auth/user/getCurrentUser`).then(res => res.data);
};
// 添加用户
export const addUser = (params) => {
  return Ajax.post(`bs/auth/user/add`, params).then(res => res.data);
};
// 修改用户
export const updateUser = (params, userId) => {
  return Ajax.post(`bs/auth/user/update?userId=` + userId, params).then(res => res.data);
};
// 删除用户
export const deleteUser = (userId) => {
  return Ajax.get(`bs/auth/user/delete?userId=` + userId).then(res => res.data);
};
// 获取用户的角色集合
export const getRolesUnderUser = (userId) => {
  return Ajax.get(`bs/auth/user/getRolesUnderUser?userId=` + userId).then(res => res.data);
};
// 获取用户对应商户下所有角色集合
export const getRolesUnderMerchant = () => {
  return Ajax.get(`bs/auth/user/getRolesUnderMerchant`).then(res => res.data);
};
// 更新用户的角色
export const updateUserRole = (userId, params) => {
  return Ajax.post(`bs/auth/user/updateUserRole?userId=` + userId, params).then(res => res.data);
};
/**
 * 角色管理
 */
// 分页查询角色列表
export const getRolePages = (params, pageNum, pageSize) => {
  return Ajax.post(`bs/auth/role/queryPages?pageNum=` + pageNum + '&pageSize=' + pageSize, params).then(res => res.data);
};
// 添加角色
export const addRole = (params) => {
  return Ajax.post(`bs/auth/role/add`, params).then(res => res.data);
};
// 修改角色
export const updateRole = (params, roleId) => {
  return Ajax.post(`bs/auth/role/update?roleId=` + roleId, params).then(res => res.data);
};
// 删除角色
export const deleteRole = (roleId) => {
  return Ajax.get(`bs/auth/role/delete?roleId=` + roleId).then(res => res.data);
};
// 获取角色的权限集合
export const getPermissionsUnderRole = (roleId) => {
  return Ajax.get(`bs/auth/role/getPermissionsUnderRole?roleId=` + roleId).then(res => res.data);
};
// 更新角色的权限
export const updateRolePermission = (roleId, params) => {
  return Ajax.post(`bs/auth/role/updateRolePermission?roleId=` + roleId, params).then(res => res.data);
};
// 获取角色对应商户下所有权限集合
export const getPermissionTreeUnderMerchant = () => {
  return Ajax.get(`bs/auth/role/getPermissionTreeUnderMerchant`).then(res => res.data);
};
/**
 * 权限管理
 */
// 获取私人的所有菜单信息
export const getPrivateMenuDatas = () => {
  return Ajax.get(`bs/auth/access/getPrivateMenuDatas`).then(res => res.data);
};
// 分页查询权限列表
export const getPermissionPages = (params, pageNum, pageSize) => {
  return Ajax.post(`bs/auth/access/queryPages?pageNum=` + pageNum + '&pageSize=' + pageSize, params).then(res => res.data);
};
// 添加权限
export const addPermission = (params) => {
  return Ajax.post(`bs/auth/access/add`, params).then(res => res.data);
};
// 修改权限
export const updatePermission = (params, permissionId) => {
  return Ajax.post(`bs/auth/access/update?permissionId=` + permissionId, params).then(res => res.data);
};
// 删除权限
export const deletePermission = (permissionId) => {
  return Ajax.get(`bs/auth/access/delete?permissionId=` + permissionId).then(res => res.data);
};
// 通过资源类型获取当前商户下的资源
export const getResourcesUnderMerchantByResourceType = (resourceType, tenantId) => {
  return Ajax.get(`bs/auth/access/getResourcesUnderMerchantByResourceType?resourceType=` + resourceType + "&tenantId=" + tenantId).then(res => res.data);
};



