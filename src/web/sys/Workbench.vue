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
        <el-menu-item :index="shouyeMenu.index" @click="changeIFrame(shouyeMenu)">
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
                                @click="changeIFrame(thirdMenu,firstMenu.name,secondMenu.name,thirdMenu.name)">
                    <i :class="thirdMenu.icon"></i>
                    <span slot="title">{{thirdMenu.name}}</span>
                  </el-menu-item>
                </template>
                <!-- 三级菜单 end-->
              </el-submenu>
              <el-menu-item v-else :id="secondMenu.index" :index="secondMenu.index"
                            @click="changeIFrame(secondMenu,firstMenu.name,secondMenu.name)">
                <i :class="secondMenu.icon"></i>
                <span slot="title">{{secondMenu.name}}</span>
              </el-menu-item>
            </template>
            <!-- 二级菜单 end -->
          </el-submenu>
          <el-menu-item v-else :id="firstMenu.index" :index="firstMenu.index"
                        @click="changeIFrame(firstMenu,firstMenu.name)">
            <i :class="firstMenu.icon"></i>
            <span slot="title">{{firstMenu.name}}</span>
          </el-menu-item>
        </template>
        <!-- 一级菜单 end-->
      </el-menu>
    </div>
    <el-container>
      <el-header class="right_content_header">
        <el-row type="flex" class="row-bg" justify="end">
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
        <div class="main_content_top">
          <el-radio-group v-model="isCollapse" class="collapse_radio_group" @change="collapseChange">
            <el-radio-button v-show="isCollapse" :label="false"><i class="el-icon-s-unfold collapse_i"></i>
            </el-radio-button>
            <el-radio-button v-show="!isCollapse" :label="true"><i class="el-icon-s-fold collapse_i"></i>
            </el-radio-button>
          </el-radio-group>
          <div class="breadcrumb_div">
            <el-link type="primary" @click="changeIFrame(shouyeMenu)">{{shouyeMenu.name}}</el-link>
            <el-link v-show="firstMenuName" disabled><i class="el-icon-arrow-right"></i>&nbsp;{{firstMenuName}}
            </el-link>
            <el-link v-show="secondMenuName" disabled><i class="el-icon-arrow-right"></i>&nbsp;{{secondMenuName}}
            </el-link>
            <el-link v-show="thirdMenuName" disabled><i class="el-icon-arrow-right"></i>&nbsp;{{thirdMenuName}}
            </el-link>
          </div>
        </div>
        <FrameContent id="frameContent" :singleMenuData="singleMenuData" :iframeHeight="iframeHeight"></FrameContent>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
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
        menuDatas: '',
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
    padding-top: 10px;
    padding-bottom: 0;
  }

  .main_content_top {
    margin-bottom: 10px;
  }

  aside.el-aside > .el-menu {
    height: 100%;
  }

  .collapse_i {
    font-size: 1.5rem;
    color: #3a8ee6;
  }

  .collapse_radio_group >>> .el-radio-button__inner {
    padding: 1px;
    border: none;
    border-radius: 4px
  }

  .breadcrumb_div {
    display: inline-block;
    margin-left: 5px;
  }

  @media screen and (max-width: 500px) {
    /*当屏幕尺寸小于500px时，应用下面的CSS样式*/

  }

</style>
