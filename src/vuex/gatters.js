import {currentThemeStyleId_key, currentThemeBgColor_key} from "../common/consts.js"

/**
 * gatters对state的属性进行包装渲染，并提供访问
 */
const gatters = {
  /**
   * 获取当前主题key
   */
  getCurrentThemeStyleId(state) {
    let currentThemeStyleId = localStorage.getItem(currentThemeStyleId_key);
    if (!currentThemeStyleId) {
      currentThemeStyleId = state.currentThemeStyleId;
    }
    return currentThemeStyleId;
  },
  /**
   * 获取当前主题背景色
   */
  getCurrentThemeBgColor(state) {
    let currentThemeBgColor = localStorage.getItem(currentThemeBgColor_key);
    if (!currentThemeBgColor) {
      currentThemeBgColor = state.currentThemeBgColor;
    }
    return currentThemeBgColor;
  }
};

export default gatters
