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
