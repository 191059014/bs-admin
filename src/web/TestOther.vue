<template>
  <div>
    <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
      <Test></Test>
      <!--<div>-->
      <!--<template >-->
        <!--<el-submenu index="1">-->
          <!--<template slot="title">-->
            <!--<i class="el-icon-location"></i>-->
            <!--<span slot="title">导航一</span>-->
          <!--</template>-->
          <!--<el-submenu index="1-4">-->
            <!--<span slot="title">选项4</span>-->
            <!--<el-menu-item index="1-4-1">选项1</el-menu-item>-->
          <!--</el-submenu>-->
        <!--</el-submenu>-->
        <!--<el-menu-item index="2">-->
          <!--<i class="el-icon-menu"></i>-->
          <!--<span slot="title">导航二</span>-->
        <!--</el-menu-item>-->
      <!--</template>-->

      <!--</div>-->
    </el-menu>
  </div>
</template>

<script>
  import Test from './Test.vue'
    export default {
        name: "TestOther",
        components: {
          Test:Test
        },
      data() {
        return {
          isCollapse: true
        };
      },
      methods: {
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        }
      }
    }
</script>

<style scoped>

</style>
