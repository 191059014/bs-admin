<template>
  <div class="account_setting_wapper">
    <el-tabs tab-position="left">
      <el-tab-pane label="基本设置">
        <div class="tab_pane_title">基本设置</div>
        <el-form label-position="right" label-width="100px" :model="userModel">
          <el-form-item label="用户名">
            <el-input v-model="userModel.userName" required></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="userModel.mobile" required></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio v-model="userModel.sex" label="M" required>男</el-radio>
            <el-radio v-model="userModel.sex" label="F">女</el-radio>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="userModel.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="onSubmit">提交</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="安全设置">
        <div class="tab_pane_title">安全设置</div>
        <el-form label-position="right" label-width="120px" :model="userModel">
          <el-form-item label="旧密码">
            <el-input type="password" v-model="userModel.userName" required show-password></el-input>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input type="password" v-model="userModel.mobile" required show-password></el-input>
          </el-form-item>
          <el-form-item label="新密码确认密码">
            <el-input type="password" v-model="userModel.mobile" required show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="onSubmit">提交</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="账户绑定">
        <div class="tab_pane_title">账户绑定</div>
        <ul class="account_bind_ul">
          <li>
            <span>
              <img src="../../../static/image/zhifubao.png"/>
              <p>支付宝</p>
              <el-link :underline="false" type="success">去绑定</el-link>
            </span>
          </li>
          <li>
            <span>
              <img src="../../../static/image/weixin.png"/>
              <p>微信</p>
              <el-link :underline="false" type="success">去绑定</el-link>
            </span>
          </li>
        </ul>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    name: "AccountSetting",
    data() {
      return {
        userModel: {
          userName: '',
          mobile: '',
          sex: '',
          email: '',
        },
      }
    },
    methods: {
      onSubmit() {

      }
    }
  }
</script>

<style scoped>

  .account_bind_ul {
    list-style: none;
    text-align: left;
  }

  .account_bind_ul li {
    margin-bottom: 15px;
  }

  .account_bind_ul li span {
    display: flex;
    justify-content: left;
  }

  li span p {
    padding-left: 10px;
  }

  li span a {
    padding-left: 100px;
  }

  .tab_pane_title {
    font-size: 1.5rem;
    margin-bottom: 50px
  }

  .account_setting_wapper {
    padding: 20px 0;
  }

  .account_setting_wapper >>> .el-tabs__item {
    padding: 0 80px;
  }

  .el-tab-pane {
    padding-left: 30px;
  }

  .el-tabs--left >>> .el-tabs__header.is-left {
    margin-right: 0
  }

  .account_setting_wapper >>> .el-tabs__nav-wrap::after {
    background: none;
  }

  .account_setting_wapper >>> .el-tabs__content {
    border-left: 2px solid #E4E7ED;
  }

</style>
