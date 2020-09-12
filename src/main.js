// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import * as alert from './common/alert.js';
import * as consts from './common/consts.js';
import * as apis from './common/api.js';

Vue.config.productionTip = false;
Vue.prototype.Alert = alert;
Vue.prototype.Consts = consts;
Vue.prototype.Api = apis;

Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
