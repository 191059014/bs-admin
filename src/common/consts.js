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


