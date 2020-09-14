<template>
  <div class="merchant_container">
    <el-form :inline="true" :model="queryCondition">
      <el-form-item label="商户ID">
        <el-input v-model="queryCondition.merchantId" placeholder="商户ID"></el-input>
      </el-form-item>
      <el-form-item label="商户名称">
        <el-input v-model="queryCondition.merchantName" placeholder="商户名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="queryPages">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="merchantList"
      stripe
      style="width: 100%">
      <el-table-column type="index" label="序号" min-width="50"></el-table-column>
      <el-table-column prop="merchantId" label="商户标识" min-width="180" sortable></el-table-column>
      <el-table-column prop="merchantName" label="商户名" min-width="180" sortable></el-table-column>
      <el-table-column prop="createTime" label="创建时间" min-width="180" sortable></el-table-column>
      <el-table-column prop="createBy" label="创建人" min-width="180" sortable></el-table-column>
      <el-table-column prop="updateTime" label="更新时间" min-width="180" sortable></el-table-column>
      <el-table-column prop="updateBy" label="更新人" min-width="180" sortable></el-table-column>
      <el-table-column label="操作" min-width="120">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页工具 -->
    <el-row type="flex" justify="end" style="padding-top: 10px">
      <el-pagination
        @size-change="changePageSize"
        @current-change="changePageNum"
        :current-page="pageNum"
        :page-sizes="[5, 10, 15,20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-row>

  </div>
</template>

<script>
  export default {
    name: "MerchantManage",
    data() {
      return {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        queryCondition: {
          merchantId: '',
          merchantName: ''
        },
        merchantList: []
      }
    },
    methods: {
      changePageSize(pageSie) {
        this.pageSize = pageSie;
      },
      changePageNum(pageNum) {
        this.pageNum = pageNum;
      },
      queryPages() {
        this.Api.getMerchantPages(this.queryCondition, this.pageNum, this.pageSize).then(res => {
          if (this.Consts.ResponseEnum.SUCCESS.code === res.code) {
            this.merchantList = res.data.data;
          } else {
            this.Alert.error(res.msg);
          }
        })
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    },
    mounted() {
      this.queryPages();
    }
  }
</script>

<style scoped>
  .merchant_container {
    padding: 10px;
  }
</style>
