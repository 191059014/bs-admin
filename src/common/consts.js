// token
export const TOKEN = "token";
// 登录的用户名
export const LOGIN_USERNAME = "username";
// 错误码
export const ResponseEnum = {
  SUCCESS: {"code": "10000", "msg": "成功"},
  ERROR: {"code": "10003", "msg": "系统异常，请稍后再试"},
  ACCESS_DENY: {"code": "20100", "msg": "禁止访问"},
  TOKEN_IS_EMPTY: {"code": "20110", "msg": "token为空"},
  TOKEN_IS_EXPIRED: {"code": "20111", "msg": "token过期"},
};
// 当前主题颜色key
export const CURRENT_THEME_COLOR = "currentThemeColor";
// 当前主题默认颜色
export const CURRENT_THEME_COLOR_DEFAULT = '#409EFF';
// 当前主题颜色对应选中的标签id
export const CURRENT_THEME_COLOR_ID = "currentThemeColorId";
// 当前菜单颜色对应选中的样式id
export const CURRENT_MENU_STYLE_ID = "currentMenuStyleId";
// 当前菜单背景色
export const CURRENT_MENU_BG_COLOR = "currentMenuBgColor";
// 当前菜单文本色
export const CURRENT_MENU_T_COLOR = "currentMenuTColor";
// 当前菜单选中色
export const CURRENT_MENU_AT_COLOR = "currentMenuAtColor";
