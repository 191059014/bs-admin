<template>
  <div class="side_bar">
    <el-menu :default-active="menuActive" ref="menuTree" :unique-opened="true" router :collapse="isMenuCollapse">
      <el-menu-item>
        123
      </el-menu-item>
      <!-- 一级菜单 start-->
      <el-submenu v-for="firstMenu in menuDatas" v-if="firstMenu.children" :key="firstMenu.index"
                  :index="firstMenu.index">
        <template slot="title">
          <i :class="firstMenu.icon"></i>
          <span slot="title">{{firstMenu.name}}</span>
        </template>
        <!-- 二级菜单 start -->
        <el-submenu v-for="secondMenu in firstMenu.children" v-if="secondMenu.children" :key="secondMenu.index"
                    :index="secondMenu.index">
          <template slot="title">
            <i :class="secondMenu.icon"></i>
            <span slot="title">{{secondMenu.name}}</span>
          </template>
          <!-- 三级菜单 start-->
          <el-submenu v-for="thirdMenu in secondMenu.children" v-if="thirdMenu.children" :key="thirdMenu.index"
                      :index="thirdMenu.index">
            <template slot="title">
              <i :class="thirdMenu.icon"></i>
              <span slot="title">{{thirdMenu.name}}</span>
            </template>
            <!-- 此处可继续添加四级菜单 -->
          </el-submenu>
          <el-menu-item v-else :id="thirdMenu.index" :index="thirdMenu.url">
            <i :class="thirdMenu.icon"></i>
            <span slot="title">{{thirdMenu.name}}</span>
          </el-menu-item>
          <!-- 三级菜单 end-->
        </el-submenu>
        <el-menu-item v-else :id="secondMenu.index" :index="secondMenu.url">
          <i :class="secondMenu.icon"></i>
          <span slot="title">{{secondMenu.name}}</span>
        </el-menu-item>
        <!-- 二级菜单 end -->
      </el-submenu>
      <el-menu-item v-else :id="firstMenu.index" :index="firstMenu.url">
        <i :class="firstMenu.icon"></i>
        <span slot="title">{{firstMenu.name}}</span>
      </el-menu-item>
      <!-- 一级菜单 end-->
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: "Sidebar",
    data() {
      return {
        menuDatas: [],
        menuActive: '',
        // isMenuCollapse: this.$store.state.isMenuCollapse
      }
    },
    computed: {
      isMenuCollapse() {
        return this.$store.state.isMenuCollapse;
      }
    },
    watch: {
      // "$store.state.isMenuCollapse": function () {
      //   isMenuCollapse = this.$store.state.isMenuCollapse
      // }
    },
    methods: {
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
    created() {
      this.findPrivateMenuDatas();
    }
  }
</script>

<style scoped>
  .side_bar {
    height: 100%;
  }

  .el-menu:not(.el-menu--collapse) {
    width: 100%;
  }
</style>
