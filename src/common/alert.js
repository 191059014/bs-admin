import {Alert, Loading, Message, MessageBox, Notification} from 'element-ui';

/**
 * 成功信息提示
 * @param msg 提示信息
 */
export const success = function (msg) {
  message(msg, 'success');
};

/**
 * 普通信息提示
 * @param msg 提示信息
 */
export const info = function (msg) {
  message(msg, 'info');
};

/**
 * 警告提示
 * @param msg 提示信息
 */
export const warn = function (msg) {
  message(msg, 'warning');
};

/**
 * 错误提示
 * @param msg 提示信息
 */
export const error = function (msg) {
  message(msg, 'error');
};

const message = function (msg, type) {
  Message({message: msg, type: type});
};
