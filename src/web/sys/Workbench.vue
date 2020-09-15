<template>
  <el-container>
    <div id="aside_div_id">
      <el-menu class="el_menu" :collapse="isCollapse" :default-active="menuActive" ref="menuTree" :unique-opened="true">
        <!--background-color="#545c64"-->
        <!--text-color="#fff"-->
        <!--active-text-color="#ffd04b"-->
        <el-menu-item id="logoMenuItem">
          <el-row>
            <el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="7">
              <el-image class="aside_header_image" src="../../static/image/favicon.ico" fit="scale-contain"></el-image>
            </el-col>
            <el-col :xs="17" :sm="17" :md="17" :lg="17" :xl="17">
              <span class="aside_header_span">一览众山小</span>
            </el-col>
          </el-row>
        </el-menu-item>
        <el-menu-item :index="shouyeMenu.index" @click="clickMenu(shouyeMenu)">
          <i :class="shouyeMenu.icon"></i>
          <span slot="title">{{shouyeMenu.name}}</span>
        </el-menu-item>
        <!-- 一级菜单 start-->
        <template v-for="firstMenu in menuDatas">
          <el-submenu :index="firstMenu.index" v-if="firstMenu.children">
            <template slot="title">
              <i :class="firstMenu.icon"></i>
              <span slot="title">{{firstMenu.name}}</span>
            </template>
            <!-- 二级菜单 start -->
            <template v-for="secondMenu in firstMenu.children">
              <el-submenu :index="secondMenu.index" v-if="secondMenu.children">
                <template slot="title">
                  <i :class="secondMenu.icon"></i>
                  <span slot="title">{{secondMenu.name}}</span>
                </template>
                <!-- 三级菜单 start-->
                <template v-for="thirdMenu in secondMenu.children">
                  <el-submenu :index="thirdMenu.index" v-if="thirdMenu.children">
                    <template slot="title">
                      <i :class="thirdMenu.icon"></i>
                      <span slot="title">{{thirdMenu.name}}</span>
                    </template>
                    <!-- 此处可继续添加四级菜单 -->
                  </el-submenu>
                  <el-menu-item v-else :id="thirdMenu.index" :index="thirdMenu.index"
                                @click="clickMenu(thirdMenu)">
                    <i :class="thirdMenu.icon"></i>
                    <span slot="title">{{thirdMenu.name}}</span>
                  </el-menu-item>
                </template>
                <!-- 三级菜单 end-->
              </el-submenu>
              <el-menu-item v-else :id="secondMenu.index" :index="secondMenu.index"
                            @click="clickMenu(secondMenu)">
                <i :class="secondMenu.icon"></i>
                <span slot="title">{{secondMenu.name}}</span>
              </el-menu-item>
            </template>
            <!-- 二级菜单 end -->
          </el-submenu>
          <el-menu-item v-else :id="firstMenu.index" :index="firstMenu.index"
                        @click="clickMenu(firstMenu)">
            <i :class="firstMenu.icon"></i>
            <span slot="title">{{firstMenu.name}}</span>
          </el-menu-item>
        </template>
        <!-- 一级菜单 end-->
      </el-menu>
    </div>
    <el-container>
      <el-header class="right_content_header">
        <el-row type="flex" justify="end">
          <el-col :xs="8" :sm="4" :md="4" :lg="4" :xl="1" :pull="17" class="collapse_radio_group_col">
            <el-radio-group v-model="isCollapse" class="collapse_radio_group" @change="collapseChange">
              <el-radio-button v-show="isCollapse" :label="false"><i class="el-icon-s-unfold collapse_i"></i>
              </el-radio-button>
              <el-radio-button v-show="!isCollapse" :label="true"><i class="el-icon-s-fold collapse_i"></i>
              </el-radio-button>
            </el-radio-group>
          </el-col>
          <el-col :xs="8" :sm="4" :md="4" :lg="4" :xl="4" class="top_search_col">
            <el-autocomplete
              class="inline-input input_search"
              v-model="searchWord"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
              @select="handleSelectSuggestion"
              suffix-icon="el-icon-search"
            ></el-autocomplete>
          </el-col>
          <el-col :xs="8" :sm="2" :md="2" :lg="2" :xl="2" class="top_dropdown_col">
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                个人中心<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">黄金糕</el-dropdown-item>
                <el-dropdown-item command="b">狮子头</el-dropdown-item>
                <el-dropdown-item command="c">螺蛳粉</el-dropdown-item>
                <el-dropdown-item command="d" disabled>双皮奶</el-dropdown-item>
                <el-dropdown-item command="e" divided>蚵仔煎</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-header>
      <el-main class="main_content">
        <el-tabs v-model="activeTab" type="border-card" @tab-remove="removeTab" @tab-click="tabClick">
          <el-tab-pane v-for="(item, index) in tabsItem"
                       :key="item.name"
                       :label="item.title"
                       :name="item.name"
                       :closable="item.closable"
                       :ref="item.ref">
            <iframe id="frameContent" :src="item.url" width="100%" :height="iframeHeight" frameborder="no"
                    scrolling="auto"></iframe>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import DefaultContent from './DefaultContent.vue'
  import {getServerIpAndHost} from '../../common/utils.js'

  export default {

    data() {
      return {
        activeTab: '0', //默认显示的tab
        tabsItem: [
          {
            title: '首页',
            name: '0',
            closable: false,
            ref: 'tabs',
            url: 'http://localhost/#/defaultContent'
          }
        ],
        shouyeMenu: {
          "index": "0",
          "name": "首页",
          "url": "/defaultContent",
          "icon": "el-icon-s-home"
        },
        menuActive: "0",
        searchWord: '',
        menuDatas: '',
        iframeHeight: '100%',
        isCollapse: false,
        isMiniCollapse: true,
      }
    },
    methods: {
      removeTab(targetName) {
        let removeIndex = 0;
        for (let i = 0; i < this.tabsItem.length; i++) {
          if (targetName === this.tabsItem[i].name) {
            removeIndex = i;
            break;
          }
        }
        this.tabsItem.splice(removeIndex, 1);
      },
      tabClick(thisTab) {

      },
      clickMenu(menu) {
        if (this.tabsItem.length > 10) {
          this.Alert.warn("当前打开的页面过多，请关闭一些后再打开");
          return false;
        }
        let newMenu = {...menu};
        if (menu && menu.url && menu.url.indexOf('http') < 0) {
          newMenu.url = getServerIpAndHost(menu.url);
        }
        let tabExist = false;
        for (let i = 0; i < this.tabsItem.length; i++) {
          if (menu.index === this.tabsItem[i].name) {
            tabExist = true;
            break;
          }
        }
        if (!tabExist) {
          this.tabsItem.push({
            title: newMenu.name,
            name: newMenu.index,
            closable: true,
            ref: 'tabs',
            url: newMenu.url
          });
        }
        this.activeTab = menu.index;
      },
      collapseChange(collapse) {

      },
      miniCollapseChange(miniCollapse) {
        // if (miniCollapse) {
        //   document.getElementById("aside_div_id").style.display = "none";
        // } else {
        //   document.getElementById("aside_div_id").style.display = "block";
        // }
        this.hiddenMenuOfMini = miniCollapse;
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
        this.clickMenu(item.menu, parentParentMeun && parentParentMeun.name, parentMenu && parentMenu.name, item.menu.name);
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
      },
      findPrivateMenuDatas() {
        this.Api.getPrivateMenuDatas().then(res => {
          if (this.Consts.ResponseEnum.SUCCESS.code === res.code) {
            this.menuDatas = res.data.menuDatas;
          } else {
            this.Alert.error(res.msg);
          }
        })
      }
    },
    mounted() {
      // 动态设置iframe高度
      let frameContent = document.getElementById("frameContent");
      let top = frameContent.offsetTop;
      debugger;
      this.iframeHeight = (document.documentElement.clientHeight - top - 120) + 'px';
      // 设置左侧菜单隐藏
      if (this.isMini()) {
        this.isCollapse = false;
      }
      this.findPrivateMenuDatas();
    },
    components: {
      DefaultContent: DefaultContent
    },
    computed: {},
    watch: {}
  }

</script>

<style scoped>
  .el-header {
    background-color: #545c64;
  }

  .el_menu:not(.el-menu--collapse) {
    width: 200px;
  }

  .el-menu {
    height: 100%;
  }

  #logoMenuItem {
    height: 60px;
    margin-left: -8px;
    background-color: #545c64 !important;
  }

  #logoMenuItem:hover {
    /*background-color: #545c64 !important;*/
  }

  .top_welcome_col {
    padding-top: 20px;
    color: white;
    font-size: 13px;
    text-align: center;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: white;
    font-size: 13px;
  }

  .top_dropdown_col {
    padding-top: 20px;
    text-align: center;
  }

  .aside_header_image {
    width: 40px;
    height: 40px;
    margin-top: 2px;
  }

  .right_content_header {
    padding: 5px 0;
  }

  .input_search {
    width: 120px;
    float: right;
    transition: width 0.5s;
  }

  .input_search:hover {
    width: 150px;
  }

  .input_search >>> .el-input__inner {
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px antiquewhite solid;
    background-color: #545c64;
    color: white;
    font-size: 13px;
    height: 30px;
  }

  .top_search_col {
    padding-top: 10px;
  }

  .aside_header_span {
    color: white;
    font-size: 1.5rem;
    display: inline-block;
    margin-top: 3px;
    margin-left: 5px;
    font-family: cursive;
  }

  .main_content {
    padding: 5px 5px 0 5px;
  }

  .main_content_top {
    margin-bottom: 10px;
  }

  aside.el-aside > .el-menu {
    height: 100%;
  }

  .collapse_i {
    font-size: 2rem;
    color: white;
  }

  .collapse_radio_group_col {
    padding: 10px 0 10px 10px;
  }

  .collapse_radio_group >>> .el-radio-button__inner {
    padding: 1px;
    border: none;
    border-radius: 4px;
    background-color: #545c64;
  }

  .breadcrumb_div {
    display: inline-block;
    margin-left: 5px;
  }

  .el-tabs--border-card >>> .el-tabs__content {
    padding: 5px;
  }

  @media screen and (max-width: 500px) {
    /*当屏幕尺寸小于500px时，应用下面的CSS样式*/

  }

</style>
