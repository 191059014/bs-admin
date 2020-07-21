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

<script src="./workbench.js"></script>

<style scoped>
  @import './workbench.css';
</style>
