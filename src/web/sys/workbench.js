import FrameContent from './FrameContent.vue'
import DefaultContent from './DefaultContent.vue'
import {getServerIpAndHost} from '../../common/utils.js'

export default {

  data() {
    return {
      shouyeMenu: {
        "index": "0",
        "name": "首页",
        "url": "/defaultContent",
        "icon": "el-icon-s-home"
      },
      menuActive: "0",
      searchWord: '',
      menuDatas: [
        {
          "children": [
            {
              "children": [
                {
                  "index": "1-2-1",
                  "name": "用户管理11",
                  "icon": "el-icon-location",
                  "parentIndex": "1-2",
                  "url": "https://yapi.gyjxwh.com/"
                }
              ],
              "index": "1-2",
              "name": "用户管理1",
              "icon": "el-icon-location"
            }
          ],
          "index": "1",
          "name": "用户管理",
          "icon": "el-icon-location"
        },
        {
          "index": "2",
          "name": "角色管理",
          "url": "https://yapi.gyjxwh.com/",
          "icon": "el-icon-location",
          "children": [
            {
              "index": "2-1",
              "name": "角色",
              "icon": "el-icon-location",
              "parentIndex": "2",
              "url": "http://localhost:8090/pmopmweb/sys_login",
            }
          ],
        },
        {
          "index": "3",
          "name": "权限管理",
          "url": "http://localhost:8090/pmopmweb/sys_login",
          "icon": "el-icon-location"
        },
        {
          "index": "4",
          "name": "菜单管理",
          "url": "/defaultContent",
          "icon": "el-icon-location"
        }
      ],
      singleMenuData: {
        url: getServerIpAndHost('/defaultContent')
      },
      iframeHeight: '100%',
      isCollapse: false,
      firstMenuName: '',
      secondMenuName: '',
      thirdMenuName: '',
      isMiniCollapse: true,
    }
  },
  methods: {
    changeIFrame(menu, firstMenuName, secondMenuName, thirdMenuName) {
      if (firstMenuName) {
        this.firstMenuName = firstMenuName;
      } else {
        this.firstMenuName = '';
      }
      if (secondMenuName) {
        this.secondMenuName = secondMenuName;
      } else {
        this.secondMenuName = '';
      }
      if (thirdMenuName) {
        this.thirdMenuName = thirdMenuName;
      } else {
        this.thirdMenuName = '';
      }
      let newMenu = {...menu};
      if (menu && menu.url && menu.url.indexOf('http') < 0) {
        newMenu.url = getServerIpAndHost(menu.url);
      }
      this.singleMenuData = newMenu;
    },
    collapseChange(collapse) {

    },
    miniCollapseChange(miniCollapse) {
      // if (miniCollapse) {
      //   document.getElementById("aside_div_id").style.display = "none";
      // } else {
      //   document.getElementById("aside_div_id").style.display = "block";
      // }
      this.hiddenMenuOfMini=miniCollapse;
    },
    handleCommand(command) {
      this.Alert.info('click on item ' + command);
    },
    querySearch(queryString, cb) {
      let suggests = this.findSuggestCycle(this.menuDatas);
      let suggestAfterFilter = suggests.filter(this.createFilter(queryString));
      // 调用 callback 返回建议列表的数据
      cb(suggestAfterFilter);
    },
    findSuggestCycle(menuList) {
      let suggests = [];
      menuList.forEach(menu => {
        if (!menu.children) {
          suggests.push({"value": menu.name, "menu": menu});
        } else {
          suggests = suggests.concat(this.findSuggestCycle(menu.children));
        }
      });
      return suggests;
    },
    createFilter(queryString) {
      return (suggest) => {
        return (suggest.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelectSuggestion(item) {
      if (this.isCollapse) {
        this.isCollapse = false;
      }
      // 打开父级目录
      let parentIndex = item.menu.parentIndex;
      if (parentIndex) {
        this.$refs.menuTree.open(item.menu.parentIndex);
      }
      this.menuActive = item.menu.index;
      let parentMenu = this.findParentMenu(parentIndex);
      let parentParentMeun = this.findParentMenu(parentMenu & parentMenu.parentIndex);
      this.changeIFrame(item.menu, parentParentMeun && parentParentMeun.name, parentMenu && parentMenu.name, item.menu.name);
    },
    findParentMenu(parentIndex) {
      if (!parentIndex) {
        return null;
      }
      return this.findParentCycle(parentIndex, this.menuDatas);
    },
    findParentCycle(parentIndex, menuList) {
      for (let i in menuList) {
        let menu = menuList[i];
        if (parentIndex === menu.index) {
          return menu;
        }
        if (menu.children) {
          let parentCycle = this.findParentCycle(parentIndex, menu.children);
          if (parentCycle) {
            return parentCycle;
          }
        }
      }
    },
    isMini() {
      return document.documentElement.clientWidth < 500;
    }
  },
  mounted() {
    // 动态设置iframe高度
    let frameContent = document.getElementById("frameContent");
    let top = frameContent.offsetTop;
    this.iframeHeight = (document.documentElement.clientHeight - top - 20) + 'px';
    // 设置左侧菜单隐藏
    if (this.isMini()) {
      this.isCollapse = false;
    }
  },
  components: {
    FrameContent: FrameContent,
    DefaultContent: DefaultContent
  },
  computed: {},
  watch: {

  }
}
