import {login} from '../../common/api.js';

export default {
  data() {
    return {
      logining: false,
      AgentDO: {
        mobile: "",
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
    login() {
      this.Alert.success("success");
      this.Alert.info(123);
      this.Alert.warn(789);
      this.Alert.error(456);
      this.$router.push({ path: "/workbench" });
    }
  }
}
