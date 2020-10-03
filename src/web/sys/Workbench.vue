<template>
  <div class="workbench_container">
    <el-row>
      <el-col :span="3" class="transition_width" :class="{'workbenck_sidebar_collapse':isMenuCollapse}">
        <Sidebar></Sidebar>
      </el-col>
      <el-col :span="21" class="transition_width" :class="{'workbench_navbar_collapse':isMenuCollapse}">
        <Navbar></Navbar>
        <div id="content_wrapper">
          <TagsView></TagsView>
          <BreadcrumbView></BreadcrumbView>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </div>
      </el-col>
    </el-row>

    <SystemSetting></SystemSetting>

  </div>
</template>

<script>
  import Sidebar from '../../components/Sidebar.vue'
  import Navbar from '../../components/Navbar.vue'
  import TagsView from '../../components/TagsView.vue'
  import SystemSetting from "../../components/SystemSetting";
  import BreadcrumbView from "../../components/BreadcrumbView";

  export default {
    data() {
      return {}
    },
    computed: {
      isMenuCollapse() {
        return this.$store.state.isMenuCollapse;
      },
      clearTabKeepAlive() {
        return this.$store.state.clearTabKeepAlive;
      },
    },
    methods: {},
    mounted() {
      let contentWrapperDiv = document.getElementById("content_wrapper");
      contentWrapperDiv.style.minHeight = (document.documentElement.clientHeight - 56 - 10) + 'px';
    },
    components: {
      BreadcrumbView,
      SystemSetting,
      Sidebar,
      Navbar,
      TagsView
    },
    watch: {},
    created() {
    }
  }

</script>

<style scoped>

  #content_wrapper {
    height: 100%;
    padding: 5px;
    border-left: solid 1px #e6e6e6;
  }

  .transition_width {
    transition: width .3s;
  }

  .workbenck_sidebar_collapse {
    width: 64px;
  }

  .workbench_navbar_collapse {
    width: calc(100% - 64px);
  }

  .logo {
    pointer-events: none;
    transition: none;
  }

  .el-aside {
    width: auto !important;
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
    width: 25px;
    height: 25px;
    margin-top: 2px;
  }

  .right_content_header {
    height: 56px !important;
    padding: 5px 0;
  }

  .input_search >>> .el-input__inner {
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px antiquewhite solid;
    background-color: #545c64;
    color: white;
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
    border-left: solid 1px #e6e6e6;
  }

  .el-menu-item.is-active {
    border-right: 3px solid #409EFF;
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
    background: none;
  }

  .breadcrumb_div {
    display: inline-block;
    margin-left: 5px;
  }

  .el-tabs--border-card >>> .el-tabs__content {
    padding: 5px;
  }

  .el_tag_common {
    height: 25px;
    width: 25px;
    padding: 0;
    margin-right: 10px;
    border-radius: 2px;
  }

  /* 选中样式 */
  .myicon-tick-checked {
    position: relative;
  }

  .myicon-tick-checked:before, .myicon-tick-checked:after {
    content: '';
    pointer-events: none;
    position: absolute;
    color: white;
    border: 1px solid;
    background-color: white;
  }

  .myicon-tick-checked:before {
    width: 2px;
    height: 1px;
    left: 25%;
    top: 50%;
    transform: skew(0deg, 50deg);
  }

  .myicon-tick-checked:after {
    width: 3px;
    height: 1px;
    left: 45%;
    top: 42%;
    transform: skew(0deg, -50deg);
  }

  @media screen and (max-width: 500px) {
    /*当屏幕尺寸小于500px时，应用下面的CSS样式*/

  }

</style>
