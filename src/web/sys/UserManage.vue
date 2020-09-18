<template>
  <div class="div_container">
    <el-form :inline="true" :model="queryCondition">
      <el-form-item label="用户ID">
        <el-input v-model="queryCondition.userId" placeholder="用户ID"></el-input>
      </el-form-item>
      <el-form-item label="用户名称">
        <el-input v-model="queryCondition.userName" placeholder="用户名称"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="queryCondition.mobile" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item label="商户">
        <el-select v-model="queryCondition.tenantId" placeholder="请选择商户">
          <el-option
            v-for="item in subMerchantList"
            :key="item.merchantId"
            :label="item.merchantName"
            :value="item.merchantId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="queryPages">查询</el-button>
        <el-button type="primary" @click="reset">重置</el-button>
        <el-button type="primary" @click="showDialogOfAdd(true)">新增</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="userList"
      stripe
      highlight-current-row
      v-loading="tableLoading"
      style="width: 100%">
      <el-table-column type="index" label="序号" min-width="100"></el-table-column>
      <el-table-column prop="userId" label="用户标识" min-width="100" sortable></el-table-column>
      <el-table-column prop="userName" label="用户名" min-width="100" sortable></el-table-column>
      <el-table-column prop="mobile" label="手机号" min-width="100" sortable></el-table-column>
      <el-table-column prop="createTime" label="创建时间" min-width="100" sortable></el-table-column>
      <el-table-column prop="createBy" label="创建人" min-width="100" sortable></el-table-column>
      <el-table-column prop="updateTime" label="更新时间" min-width="100" sortable></el-table-column>
      <el-table-column prop="updateBy" label="更新人" min-width="100" sortable></el-table-column>
      <el-table-column label="操作" min-width="120">
        <template slot-scope="scope">
          <el-button size="mini" @click="showDialogOfUpdate(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          <el-button size="mini" type="danger" @click="handleChangeRole(scope.$index, scope.row)">角色</el-button>
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

    <el-dialog title="新增用户" :visible.sync="showAddDialog">
      <el-form :model="userModelAdd">
        <el-form-item label="用户名称" :label-width="addDialogLabelWidth" required class="dialog_form_item">
          <el-input v-model="userModelAdd.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="addDialogLabelWidth" required class="dialog_form_item">
          <el-input v-model="userModelAdd.mobile" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="addDialogLabelWidth" required class="dialog_form_item">
          <el-input v-model="userModelAdd.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="addDialogLabelWidth" required>
          <el-input v-model="userModelAdd.confirmPassword" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDialogOfAdd(false)">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改商户" :visible.sync="showUpdateDialog" class="dialog_form_item">
      <el-form :model="userModelUpdate">
        <el-form-item label="用户名称" :label-width="addDialogLabelWidth" required class="dialog_form_item">
          <el-input v-model="userModelUpdate.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="addDialogLabelWidth" required class="dialog_form_item">
          <el-input v-model="userModelUpdate.mobile" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="addDialogLabelWidth" required class="dialog_form_item">
          <el-input v-model="userModelUpdate.password" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="addDialogLabelWidth" required>
          <el-input v-model="userModelUpdate.confirmPassword" autocomplete="off" show-password></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hideDialogOfUpdate()">取 消</el-button>
        <el-button type="primary" @click="handleEdit">确 定</el-button>
      </div>
    </el-dialog>

    <el-drawer
      title="修改用户的角色"
      :visible.sync="openDrawer"
      direction="rtl"
      :before-close="handleClose">

      <el-checkbox-group v-model="checkedRoles">
        <div v-for="role in rolesUnderMerchant" style="padding-bottom: 10px">
          <el-checkbox :label="role.roleId" :key="role.roleId">{{role.roleName}}
          </el-checkbox>
        </div>
      </el-checkbox-group>

      <el-row style="text-align: center;padding-top: 20px">
        <el-button type="primary" @click="updateUserRole" style="width: 100%">保存</el-button>
      </el-row>

    </el-drawer>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        tableLoading: false,
        queryCondition: {
          userId: '',
          userName: '',
          mobile: '',
          tenantId: ''
        },
        userList: [],
        showAddDialog: false,
        addDialogLabelWidth: '200',
        userModelAdd: {
          userName: '',
          mobile: '',
          password: '',
          confirmPassword: ''
        },
        showUpdateDialog: false,
        updateDialogLabelWidth: '200',
        userModelUpdate: {
          userId: '',
          userName: '',
          mobile: '',
          password: '',
          confirmPassword: ''
        },
        userModelUpdatePrimary: {
          userName: '',
          mobile: '',
          password: '',
          confirmPassword: ''
        },
        subMerchantList: [],
        openDrawer: false,
        rolesUnderMerchant: [],
        checkedRoles: [],
        userIdOfCurrentRow: ''
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
        this.Api.getUserPages(this.queryCondition, this.pageNum, this.pageSize).then(res => {
          if (this.Consts.ResponseEnum.SUCCESS.code === res.code) {
            this.userList = res.data.data;
            this.total = res.data.count;
          } else {
            this.Alert.error(res.msg);
          }
          this.tableLoading = false;
        })
      },
      showDialogOfAdd(show) {
        if (show) {
          this.userModelAdd = {};
          this.showAddDialog = true;
        } else {
          this.userModelAdd = {};
          this.showAddDialog = false;
        }
      },
      showDialogOfUpdate(index, row) {
        this.userModelUpdate.userId = row.userId;
        this.userModelUpdate.userName = row.userName;
        this.userModelUpdate.mobile = row.mobile;
        this.userModelUpdate.password = row.password;
        this.userModelUpdate.confirmPassword = row.password;

        this.userModelUpdatePrimary.userName = row.userName;
        this.userModelUpdatePrimary.mobile = row.mobile;
        this.userModelUpdatePrimary.password = row.password;
        this.userModelUpdatePrimary.confirmPassword = row.password;
        this.showUpdateDialog = true;
      },
      hideDialogOfUpdate() {
        this.showUpdateDialog = false;
        this.userModelUpdate = {};
      },
      handleAdd() {
        if (!this.userModelAdd.userName) {
          this.Alert.warn("用户名称不能为空");
          return false;
        }
        if (!this.userModelAdd.mobile) {
          this.Alert.warn("手机号不能为空");
          return false;
        }
        if (!this.userModelAdd.password) {
          this.Alert.warn("密码不能为空");
          return false;
        }
        if (!this.userModelAdd.confirmPassword) {
          this.Alert.warn("确认密码不能为空");
          return false;
        }
        if (this.userModelAdd.password !== this.userModelAdd.confirmPassword) {
          this.Alert.warn("两次输入的密码不一致");
          return false;
        }
        this.Api.addUser(this.userModelAdd).then(res => {
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
        if (!this.userModelUpdate.userName) {
          this.Alert.warn("用户名称不能为空");
          return false;
        }
        if (!this.userModelUpdate.mobile) {
          this.Alert.warn("手机号不能为空");
          return false;
        }
        if (!this.userModelUpdate.password) {
          this.Alert.warn("密码不能为空");
          return false;
        }
        if (!this.userModelUpdate.confirmPassword) {
          this.Alert.warn("确认密码不能为空");
          return false;
        }
        if (this.userModelUpdate.password !== this.userModelUpdate.confirmPassword) {
          this.Alert.warn("两次输入的密码不一致");
          return false;
        }
        if (this.merchantModelUpdatePrimary.userName === this.userModelUpdate.userName
          && this.merchantModelUpdatePrimary.mobile === this.userModelUpdate.mobile
          && this.merchantModelUpdatePrimary.password === this.userModelUpdate.password
          && this.merchantModelUpdatePrimary.confirmPassword === this.userModelUpdate.confirmPassword) {
          this.Alert.warn("没有任何修改");
          return false;
        }
        let updateParams = {
          userName: this.userModelUpdate.userName,
          mobile: this.userModelUpdate.mobile,
          password: this.userModelUpdate.password
        };
        this.Api.updateUser(updateParams, this.userModelUpdate.userId).then(res => {
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
        this.Alert.confirmWarning('提示', '确定删除吗？', () => {
          this.Api.deleteUser(row.userId).then(res => {
            if (this.Consts.ResponseEnum.SUCCESS.code === res.code) {
              this.Alert.success('删除成功');
              this.queryPages();
            } else {
              this.Alert.error(res.msg);
            }
          })
        }, () => {
          // do nothing
        });
      },
      getAllSubMerchants() {
        this.Api.getAllSubMerchants().then(res => {
          if (this.Consts.ResponseEnum.SUCCESS.code === res.code) {
            this.subMerchantList = res.data;
          } else {
            this.Alert.error("初始化所有下级商户下拉框失败");
          }
        })
      },
      handleChangeRole(index, row) {
        this.openDrawer = true;
        this.userIdOfCurrentRow = row.userId;
        this.Api.getRolesUnderMerchant(row.userId).then(res => {
          if (this.Consts.ResponseEnum.SUCCESS.code === res.code) {
            this.rolesUnderMerchant = res.data;
          } else {
            this.Alert.error("获取用户对应商户下所有角色集合失败");
          }
        });
        this.Api.getRolesUnderUser(row.userId).then(res => {
          if (this.Consts.ResponseEnum.SUCCESS.code === res.code) {
            this.checkedRoles = res.data;
          } else {
            this.Alert.error("获取用户的角色集合失败");
          }
        })
      },
      handleClose(done) {
        this.Alert.confirmWarning('提示', '确定关闭吗？', () => {
          done();
          this.checkedRoles = [];
          this.rolesUnderMerchant = [];
        });
      },
      updateUserRole() {
        this.Api.updateUserRole(this.userIdOfCurrentRow, this.checkedRoles).then(res => {
          if (this.Consts.ResponseEnum.SUCCESS.code === res.code) {
            this.Alert.success(res.msg);
            this.openDrawer = false;
            this.checkedRoles = [];
            this.rolesUnderMerchant = [];
            this.queryPages();
          } else {
            this.Alert.error(res.msg);
          }
        })
      }
    },
    mounted() {
      this.queryPages();
      this.getAllSubMerchants();
    }
  }
</script>

<style scoped>
  .div_container {
    padding: 10px;
  }

  .dialog_form_item {
    margin-bottom: 0;
  }
</style>
