/**
 * mutations提供了对state的属性修改的唯一方法，是同步的
 */
const mutations = {
  /**
   * 菜单伸缩
   */
  changeMenuCollapse(state, value) {
    state.isMenuCollapse = value;
  }
};
export default mutations
