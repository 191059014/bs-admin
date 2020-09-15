<template>
  <div class="containerDiv">

    <div class="block">
      <el-timeline style="padding-right: 40px">
        <el-timeline-item timestamp="2020/05/01" placement="top">
          <el-card>
            <h4>创建项目</h4>
            <p>搭建项目基本框架</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2018/4/3" placement="top">
          <el-card>
            <h4>添加系统管理-商户管理</h4>
            <p>完善了商户管理的增删改查功能</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2018/4/2" placement="top">
          <el-card>
            <h4>添加系统管理-商户管理</h4>
            <p>完善了商户管理的增删改查功能</p>
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
      return {};
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
