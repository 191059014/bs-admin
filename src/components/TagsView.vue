<template>
  <div v-show="multiTabs==='true'">
    <el-tabs v-model="activeIndex" type="border-card" v-if="openTabs.length" @tab-click='tabClick'
             @tab-remove='tabRemove'>
      <el-tab-pane :key="item.name" v-for="(item, index) in openTabs"
                   :label="item.title"
                   :name="item.name"
                   :closable="item.closable">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    name: "Tabs",
    data() {
      return {
        activeIndex: this.$store.state.tabsActiveIndex
      }
    },
    computed: {
      openTabs: function () {
        return this.$store.state.openTabs;
      },
      multiTabs() {
        return this.$store.state.multiTabs;
      },
    },
    watch: {
      "$store.state.tabsActiveIndex": function (newValue, oldValue) {
        this.activeIndex = newValue;
        this.routingToActiveTab(newValue);
      }
    },
    methods: {
      tabClick(tab) {
        this.$store.commit('set_tabs_active', tab.name);
        this.routingToActiveTab(tab.name);
        // 改变面包屑导航
        this.$store.commit('replaceLastBreadcrumb', {id: tab.name, name: tab.title});
      },
      tabRemove(name) {
        /*
         * 删除tab的缓存
         */
        // let tab = this.openTabs.find((value, index, arr) => {
        //   return value.name === name
        // });
        // if (tab) {
        //   let componentName = this.findComponentNameCycle(tab.route, this.$router.options.routes);
        //   componentName && this.$store.commit('addClearTabKeepAlive', componentName);
        // }
        /*
         * 删除tab页
         */
        this.$store.commit('delete_tabs', name);
        /**
         * 重置缓存页面
         */
        // this.$store.commit('resetClearTabKeepAlive');
      },
      findComponentNameCycle(path, routeArr) {
        for (let i = 0; i < routeArr.length; i++) {
          if (path === routeArr[i].path) {
            return routeArr[i].component.name;
          }
          if (routeArr[i].children) {
            return this.findComponentNameCycle(path, routeArr[i].children);
          }
        }
      },
      routingToActiveTab(name) {
        let currentTab = this.$store.state.openTabs.find(function (value, index, arr) {
          return value.name === name;
        });
        currentTab && this.$router.push(currentTab.route);
      }
    },
    mounted() {
      this.$store.commit('add_tabs', this.$store.state.defaultTab);
      this.routingToActiveTab("0");
    }
  }
</script>

<style scoped>

  .el-tabs--border-card {
    box-shadow: none;
  }

  .el-tabs--border-card >>> .el-tabs__header {
    border-bottom: none;
  }

  .el-tabs >>> .el-tabs__content {
    display: none;
  }

</style>
