<template>
  <div class="containerDiv">

    <el-steps :active="2" align-center>
      <el-step title="添加商户" description="添加商户"></el-step>
      <el-step title="添加用户+设置角色" description="添加用户+设置角色"></el-step>
      <el-step title="添加角色+设置权限" description="添加角色+设置权限"></el-step>
      <el-step title="添加权限" description="添加权限"></el-step>
    </el-steps>

    <div class="block">
      <el-timeline style="padding-right: 40px;margin-top: 50px">
        <el-timeline-item v-for="item in timelineList" :key="item.time" :timestamp="item.time" placement="top">
          <el-card>
            <h4>{{item.title}}</h4>
            <p>{{item.desc}}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>

  </div>
</template>

<script>
  export default {
    name: "MainContent",
    data() {
      return {
        timelineList: [
          {time: '2020/05/01', title: '创建项目', desc: '搭建项目基本框架'},
          {time: '2020/06/01', title: '添加菜单：系统管理-商户管理', desc: '完善了商户管理的增删改查功能'},
          {time: '2020/07/01', title: '添加菜单：系统管理-用户管理', desc: '完善了用户管理的增删改查功能'},
          {time: '2020/08/01', title: '添加菜单：系统管理-角色管理', desc: '完善了角色管理的增删改查功能'},
          {time: '2020/09/01', title: '添加菜单：系统管理-权限管理', desc: '完善了权限管理的增删改查功能'},
        ]
      };
    }
  }
</script>

<style scoped>
  .containerDiv {
    padding-top: 50px;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
