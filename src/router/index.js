import Vue from 'vue'
import Router from 'vue-router'
import Login from '../web/sys/Login.vue'
import Workbench from '../web/sys/Workbench.vue'
import DefaultContent from '../web/sys/DefaultContent.vue'
import Test from '../web/Test.vue'
import TestOther from '../web/TestOther.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: '登陆',
      component: Login
    },
    {
      path: '/workbench',
      name: '工作台',
      component: Workbench
    },
    {
      path: '/defaultContent',
      name: '默认主页',
      component: DefaultContent
    },
    {
      path: '/test',
      name: '测试的页面',
      component: Test
    },
    {
      path: '/testOther',
      name: '测试的页面',
      component: TestOther
    }
  ]
})
