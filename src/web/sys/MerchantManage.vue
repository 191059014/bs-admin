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
        <el-button type="primary" @click="reset">重置</el-button>
        <el-button type="primary" @click="showDialogOfAdd(true)">新增</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="merchantList"
      stripe
      highlight-current-row
      v-loading="tableLoading"
      style="width: 100%">
      <el-table-column type="index" label="序号" min-width="100"></el-table-column>
      <el-table-column prop="merchantId" label="商户标识" min-width="100" sortable></el-table-column>
      <el-table-column prop="merchantName" label="商户名" min-width="100" sortable></el-table-column>
      <el-table-column prop="createTime" label="创建时间" min-width="100" sortable></el-table-column>
      <el-table-column prop="createBy" label="创建人" min-width="100" sortable></el-table-column>
      <el-table-column prop="updateTime" label="更新时间" min-width="100" sortable></el-table-column>
      <el-table-column prop="updateBy" label="更新人" min-width="100" sortable></el-table-column>
      <el-table-column label="操作" min-width="100">
        <template slot-scope="scope">
          <el-button size="mini" @click="showDialogOfUpdate(scope.$index, scope.row)">编辑</el-button>
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

    <el-dialog title="新增商户" :visible.sync="showAddDialog">
      <el-form :model="merchantModelAdd">
        <el-form-item label="商户名称" :label-width="addDialogLabelWidth" required>
          <el-input v-model="merchantModelAdd.merchantName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDialogOfAdd(false)">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改商户" :visible.sync="showUpdateDialog">
      <el-form :model="merchantModelUpdate">
        <el-form-item label="商户名称" :label-width="updateDialogLabelWidth" required>
          <el-input v-model="merchantModelUpdate.merchantName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hideDialogOfUpdate()">取 消</el-button>
        <el-button type="primary" @click="handleEdit">确 定</el-button>
      </div>
    </el-dialog>

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
        tableLoading: false,
        queryCondition: {
          merchantId: '',
          merchantName: ''
        },
        merchantList: [],
        showAddDialog: false,
        addDialogLabelWidth: 200,
        merchantModelAdd: {
          merchantName: ''
        },
        showUpdateDialog: false,
        updateDialogLabelWidth: 200,
        merchantModelUpdate: {
          merchantId: '',
          merchantName: ''
        },
        merchantModelUpdatePrimary: {
          merchantId: '',
          merchantName: ''
        }
      }
    },
    methods: {
      changePageSize(pageSie) {
        this.pageSize = pageSie;
        this.queryPages();
      },
      changePageNum(pageNum) {
        this.pageNum = pageNum;
        this.queryPages();
      },
      reset() {
        this.queryCondition = {};
      },
      queryPages() {
        this.tableLoading = true;
        this.Api.getMerchantPages(this.queryCondition, this.pageNum, this.pageSize).then(res => {
          if (this.Consts.ResponseEnum.SUCCESS.code === res.code) {
            this.merchantList = res.data.data;
            this.total = res.data.count;
          } else {
            this.Alert.error(res.msg);
          }
          this.tableLoading = false;
        })
      },
      showDialogOfAdd(show) {
        if (show) {
          this.merchantModelAdd = {};
          this.showAddDialog = true;
        } else {
          this.merchantModelAdd = {};
          this.showAddDialog = false;
        }
      },
      showDialogOfUpdate(index, row) {
        this.merchantModelUpdate.merchantId = row.merchantId;
        this.merchantModelUpdate.merchantName = row.merchantName;
        this.merchantModelUpdatePrimary.merchantName = row.merchantName;
        this.showUpdateDialog = true;
      },
      hideDialogOfUpdate() {
        this.showUpdateDialog = false;
        this.merchantModelUpdate = {};
      },
      handleAdd() {
        if (!this.merchantModelAdd.merchantName) {
          this.Alert.warn("商户名称不能为空");
          return false;
        }
        this.Api.addMerchant(this.merchantModelAdd).then(res => {
          if (this.Consts.ResponseEnum.SUCCESS.code === res.code) {
            this.Alert.success(res.msg);
            this.showAddDialog = false;
            this.queryPages();
          } else {
            this.Alert.error(res.msg);
          }
        })
      },
      handleEdit() {
        if (this.merchantModelUpdatePrimary.merchantName === this.merchantModelUpdate.merchantName) {
          this.Alert.warn("没有任何修改");
          return false;
        }
        this.Api.updateMerchant(this.merchantModelUpdate).then(res => {
          if (this.Consts.ResponseEnum.SUCCESS.code === res.code) {
            this.Alert.success(res.msg);
            this.showUpdateDialog = false;
            this.queryPages();
          } else {
            this.Alert.error(res.msg);
          }
        })
      },
      handleDelete(index, row) {
        this.Alert.confirmWarning('提示', '确定删除吗？');
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
