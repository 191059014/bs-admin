const config = require('../../config');
const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);
/**
 * 获取服务器的ip地址
 */
export const getServerIpAndHost = function (path) {
  let host = HOST || config.dev.host;
  let port = PORT || config.dev.port;
  return 'http://' + host + ':' + port + '/#' + path;
};
