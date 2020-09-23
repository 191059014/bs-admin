<template>
  <el-container>
    <el-menu mode="horizontal" :collapse="isCollapse" :default-active="menuActive" ref="menuTree" :unique-opened="true">
      <!--background-color="#545c64"-->
      <!--text-color="#fff"-->
      <!--active-text-color="#ffd04b"-->
<!--      <el-menu-item id="logoMenuItem">-->
<!--        <el-row>-->
<!--          <el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="7">-->
<!--            <el-image class="aside_header_image" src="../../static/image/favicon.ico" fit="scale-contain"></el-image>-->
<!--          </el-col>-->
<!--          <el-col :xs="17" :sm="17" :md="17" :lg="17" :xl="17">-->
<!--            <span class="aside_header_span">天道酬勤</span>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--      </el-menu-item>-->
      <el-menu-item :index="shouyeMenu.index" @click="clickMenu(shouyeMenu)">
        <i :class="shouyeMenu.icon"></i>
        <span slot="title">{{shouyeMenu.name}}</span>
      </el-menu-item>
      <!-- 一级菜单 start-->
      <el-submenu v-for="firstMenu in menuDatas" :index="firstMenu.index" v-if="firstMenu.children">
        <template slot="title">
          <i :class="firstMenu.icon"></i>
          <span slot="title">{{firstMenu.name}}</span>
        </template>
        <!-- 二级菜单 start -->
        <el-submenu v-for="secondMenu in firstMenu.children" :index="secondMenu.index" v-if="secondMenu.children">
          <template slot="title">
            <i :class="secondMenu.icon"></i>
            <span slot="title">{{secondMenu.name}}</span>
          </template>
          <!-- 三级菜单 start-->
          <el-submenu v-for="thirdMenu in secondMenu.children" :index="thirdMenu.index" v-if="thirdMenu.children">
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
          <!-- 三级菜单 end-->
        </el-submenu>
        <el-menu-item v-else :id="secondMenu.index" :index="secondMenu.index"
                      @click="clickMenu(secondMenu)">
          <i :class="secondMenu.icon"></i>
          <span slot="title">{{secondMenu.name}}</span>
        </el-menu-item>
        <!-- 二级菜单 end -->
      </el-submenu>
      <el-menu-item v-else :id="firstMenu.index" :index="firstMenu.index"
                    @click="clickMenu(firstMenu)">
        <i :class="firstMenu.icon"></i>
        <span slot="title">{{firstMenu.name}}</span>
      </el-menu-item>
      <!-- 一级菜单 end-->
    </el-menu>
  </el-container>
</template>

<script>
  import DefaultContent from './sys/DefaultContent.vue'
  import {getServerIpAndHost} from '../common/utils.js'

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
        currentLoginUsername: sessionStorage.getItem(this.hbconsts.LOGIN_USERNAME)
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
          this.hbalert.warn("当前打开的页面过多，请关闭一些后再打开");
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
        this.hbalert.info('click on item ' + command);
        if (command === 'logout') {
          sessionStorage.setItem(this.hbconsts.JWT_TOKEN, null);
          this.$router.push({path: "/"});
        }
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
        this.hbapis.getPrivateMenuDatas().then(res => {
          if (this.hbconsts.ResponseEnum.SUCCESS.code === res.code) {
            this.menuDatas = res.data.menuDatas;
          } else {
            this.hbalert.error(res.msg);
          }
        })
      }
    },
    mounted() {
      // // 动态设置iframe高度
      // let frameContent = document.getElementById("frameContent");
      // let top = frameContent.offsetTop;
      // this.iframeHeight = (document.documentElement.clientHeight - top - 120) + 'px';
      // // 设置左侧菜单隐藏
      // if (this.isMini()) {
      //   this.isCollapse = false;
      // }
      this.findPrivateMenuDatas();

      // document.addEventListener("mousedown", function (e) {
      //   if (e.target.id !== "searchInputId") {
      //     let searchInput = document.getElementById("searchInputId");
      //     searchInput.blur();
      //   }
      // }, false);
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
    width: 150px;
    float: right;
    transition: width 0.5s;
  }

  .input_search:hover {
    width: 180px;
  }

  .input_search >>> .el-input__inner {
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px antiquewhite solid;
    background-color: #545c64;
    color: white;
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
