<template>
  <div class="workbench_container">
    <el-row>
      <el-col :span="3">
        <Sidebar></Sidebar>
      </el-col>
      <el-col :span="21">
        <Navbar></Navbar>
      </el-col>
    </el-row>


  </div>
</template>

<script>
  import Sidebar from '../../components/Sidebar.vue'
  import Navbar from '../../components/Navbar.vue'
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'

  export default {
    data() {
      return {}
    },
    methods: {},
    mounted() {

    },
    components: {
      Sidebar,
      Navbar
    },
    computed: {},
    watch: {},
    created() {
    }
  }

</script>

<style scoped>


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
