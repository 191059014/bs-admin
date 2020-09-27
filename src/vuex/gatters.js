/**
 * gatters对state的属性进行包装渲染，并提供访问
 */
const gatters = {
  /**
   * 获取当前用户名
   */
  getCurrentUsername(state, gatters) {

    return state.username;
  },
};

export default gatters
