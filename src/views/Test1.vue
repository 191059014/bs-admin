<template>
  <el-container>
    <el-menu mode="horizontal" :collapse="isCollapse" :default-active="menuActive" ref="menuTree" :unique-opened="true">
      <el-menu-item >
        <el-image  src="../../static/image/favicon.ico" fit="scale-contain"></el-image>
        <span >天道酬勤</span>
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
      <el-main class="main_content">
        <el-breadcrumb separator="/" style="padding: 12px 0 12px 5px" v-show="breadcrumbShow">
          <el-breadcrumb-item v-for="breadcrumb in breadcrumbList" :key="breadcrumb.id">{{breadcrumb.name}}
          </el-breadcrumb-item>
        </el-breadcrumb>
        <el-tabs v-model="activeTab" type="border-card" @tab-remove="removeTab" @tab-click="tabClick" ref="tabs">
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

    <el-drawer
      title="系统设置"
      :visible.sync="openDrawer"
      direction="rtl"
      :before-close="handleClose">
      <p>主题色</p>
      <el-row>
        <el-tag v-for="themeColor in themeColorList" :key="themeColor.id" :color="themeColor.backgroundColor"
                class="el_tag_common" :class="{'myicon-tick-checked': currentThemeStyleId === themeColor.id}"
                @click="setCurrentThemeStyle(themeColor.id, themeColor.backgroundColor)">
        </el-tag>
      </el-row>
      <el-divider></el-divider>
      <p>多页签模式</p>
      <el-row>
        <el-switch
          style="display: block"
          v-model="multiTabs"
          active-text="多页签"
          inactive-text="单页签"
          active-value="true"
          inactive-value="false"
          @change="changeMultiTabs">
        </el-switch>
      </el-row>
      <el-divider></el-divider>
      <el-row>
        <el-row style="text-align: center;padding-top: 20px">
          <el-button type="primary" @click="flushPage" style="width: 100%">刷新页面，立即生效</el-button>
        </el-row>
      </el-row>
    </el-drawer>

  </el-container>
</template>

<script>
  import DefaultContent from './other/DefaultContent.vue'
  import {getServerIpAndHost} from '../common/utils.js'
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'

  export default {
    data() {
      return {
        breadcrumbList: [
          {id: "0", name: "首页"}
        ],
        breadcrumbShow: true,
        multiTabs: localStorage.getItem("multiTabs") ? localStorage.getItem("multiTabs") : "false",
        currentThemeStyleId: localStorage.getItem("currentThemeStyleId") ? localStorage.getItem("currentThemeStyleId") : '0',
        currentThemeBgColor: localStorage.getItem("currentThemeBgColor") ? localStorage.getItem("currentThemeBgColor") : '#409EFF',
        themeColorList: [
          {id: '0', backgroundColor: '#409EFF'},
          {id: '1', backgroundColor: 'rgb(245, 34, 45)'},
          {id: '2', backgroundColor: 'rgb(250, 84, 28)'},
          {id: '3', backgroundColor: '#F56C6C'},
          {id: '4', backgroundColor: 'rgb(250, 173, 20)'},
          {id: '5', backgroundColor: 'rgb(82, 196, 26)'},
          {id: '6', backgroundColor: 'rgb(19, 194, 194)'},
          {id: '7', backgroundColor: 'rgb(114, 46, 209)'},
          {id: '8', backgroundColor: '#545c64'},
          {id: '9', backgroundColor: '#000000'}
        ],
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
        currentLoginUsername: sessionStorage.getItem(this.hbconsts.LOGIN_USERNAME),
        openDrawer: false
      }
    },
    methods: {
      changeMultiTabs(newValue) {
        localStorage.setItem("multiTabs", newValue);
      },
      flushPage() {
        this.$router.go(0);
      },
      setCurrentThemeStyle(styleId, bgColor) {
        this.currentThemeStyleId = styleId;
        localStorage.setItem("currentThemeStyleId", styleId);
        localStorage.setItem("currentThemeBgColor", bgColor);
      },
      removeTab(targetName) {
        let removeIndex = 0;
        for (let i = 0; i < this.tabsItem.length; i++) {
          if (targetName === this.tabsItem[i].name) {
            removeIndex = i;
            break;
          }
        }
        this.tabsItem.splice(removeIndex, 1);
        if (this.activeTab === targetName) {
          this.activeTab = this.tabsItem[removeIndex - 1].name;
        }
      },
      tabClick(thisTab) {

      },
      handleClose(done) {
        done();
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

        let firstParentMenu = this.findParentMenu(newMenu.parentIndex);
        let secondParentMenu;
        if (firstParentMenu) {
          secondParentMenu = this.findParentMenu(firstParentMenu.parentIndex);
        }
        this.breadcrumbList = [];
        if (secondParentMenu) {
          this.breadcrumbList.push({id: secondParentMenu.index, name: secondParentMenu.name});
        }
        if (firstParentMenu) {
          this.breadcrumbList.push({id: firstParentMenu.index, name: firstParentMenu.name});
        }
        this.breadcrumbList.push({id: newMenu.index, name: newMenu.name});
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
        if (command === 'logout') {
          sessionStorage.setItem(this.hbconsts.JWT_TOKEN, null);
          this.$router.push({path: "/"});
        } else if (command === 'setting') {
          this.openDrawer = true;
        } else {
          this.hbalert.info('click on item ' + command);
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
      /*
       * 多页签
       */
      if ("true" === this.multiTabs) {
        this.$refs.tabs.$children[0].$el.style.display = 'block';
        this.breadcrumbShow = false;
      } else {
        this.$refs.tabs.$children[0].$el.style.display = 'none';
      }
      /*
       * 动态设置iframe高度
       */
      let frameContent = document.getElementById("frameContent");
      let top = frameContent.offsetParent.offsetTop;
      this.iframeHeight = (document.documentElement.clientHeight - top - 16) + 'px';
    },
    components: {
      DefaultContent: DefaultContent,
    },
    computed: {},
    watch: {},
    created() {
      this.findPrivateMenuDatas();
    }
  }

</script>

<style scoped>



  @media screen and (max-width: 500px) {
    /*当屏幕尺寸小于500px时，应用下面的CSS样式*/

  }

</style>
