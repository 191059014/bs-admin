/**
 * gatters对state的属性进行包装渲染，并提供访问
 */
const gatters = {
  /**
   * 获取tab的路由地址
   */
  getTabRoute(state, name) {
    let tab = this.state.openTabs.find(function (value, index, arr) {
      return value.name === data.name;
    });
    return tab.route;
  },
};

export default gatters
