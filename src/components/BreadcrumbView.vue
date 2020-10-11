<template>
  <div v-show="multiTabs==='false'">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="breadcrumb in breadcrumbList" :key="breadcrumb.id">{{breadcrumb.name}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  export default {
    name: "BreadcrumbView",
    data() {
      return {}
    },
    computed: {
      multiTabs() {
        return this.$store.state.multiTabs;
      },
      breadcrumbList() {
        return this.$store.state.breadcrumbList;
      }
    },
    mounted() {
      this.$store.commit('addBreadcrumb', {id: "0", name: "首页"});
    }
  }
</script>

<style scoped>
  .el-breadcrumb {
    padding: 12px 0 12px 5px;
    background-color: #F5F7FA;
  }
</style>
