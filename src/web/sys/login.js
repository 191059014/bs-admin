export default {
  data() {
    return {
      logining: false,
      AgentDO: {
        usernameOrMobile: "",
        password: ""
      },
      loginRules: {
        mobile: [{required: true, message: "请输入账号", trigger: "blur"}],
        password: [{required: true, message: "请输入密码", trigger: "blur"}]
      },
      checked: true
    }
  },
  methods: {
    doLogin() {
      this.Api.login(this.AgentDO, false).then(res => {
        if (this.Consts.ResponseEnum.SUCCESS.code === res.code) {
          this.Alert.info("登陆成功");
          sessionStorage.setItem(this.Consts.JWT_TOKEN, res.data);
          this.$router.push({path: "/workbench"});
        } else {
          this.Alert.error(res.msg);
        }
      });
    }
  }
}
