/**
 * jwt token
 */
export const JWT_TOKEN = "token";
/**
 * 错误码
 */
export const ResponseEnum = {
  SUCCESS: {"code": "10000", "msg": "成功"},
  ERROR: {"code": "10003", "msg": "系统异常，请稍后再试"},
  ACCESS_DENY: {"code": "20100", "msg": "禁止访问"},
  TOKEN_ERROR: {"code": "20101", "msg": "非法的token"},
};
