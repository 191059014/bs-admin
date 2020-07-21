<!-- 暂时没用到，菜单延申的层级写死 -->
<template>
  <div>
    <label v-for="menu in treeDatas" :key="menu.index">
      <el-submenu :index="menu.index" v-if="menu.children">
        <template slot="title">
          <i :class="menu.icon"></i>
          <span slot="title">{{menu.name}}</span>
        </template>
        <MenuTree :treeDatas="menu.children"></MenuTree>
      </el-submenu>
      <el-menu-item v-else :index="menu.index" @click="handleRoute(menu)">
        <i :class="menu.icon"></i>
        <span slot="title">{{menu.name}}</span>
      </el-menu-item>
    </label>
  </div>
</template>

<script>
  import MenuTree from './MenuTree.vue'

  export default {
    name: "MenuTree",
    methods: {
      handleRoute(menu) {
        this.$emit('change-iframe', menu);// 向父组件传递参数
      }
    },
    components: {
      MenuTree: MenuTree
    },
    props: ['treeDatas'] //接收父组件传递过来的treeDatas值
  };
</script>

<style scoped>

</style>
