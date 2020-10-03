import Vue from 'vue'
import Router from 'vue-router'
import Login from '../web/sys/Login.vue'
import Workbench from '../web/sys/Workbench.vue'
import Workbench1 from '../web/sys/Workbench1.vue'
import IframeContent from '../web/sys/IframeContent.vue'
import DefaultContent from '../web/sys/DefaultContent.vue'
import AccessDeny from '../web/errorPage/AccessDeny.vue'
import MerchantManage from '../web/sys/MerchantManage.vue'
import UserManage from '../web/sys/UserManage.vue'
import RoleManage from '../web/sys/RoleManage.vue'
import AccessManage from '../web/sys/AccessManage.vue'
import Test from '../web/Test.vue'
import Test1 from '../web/Test1.vue'

/**
 * 解决点击菜单时报重复路由的错，虽然不影响功能，但是console里会打印红色错误
 */
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: '登陆',
      component: Login
    },
    {
      path: '/workbench1',
      name: '工作台1',
      component: Workbench1
    },
    {
      path: '/workbench',
      name: '工作台',
      component: Workbench,
      children: [
        {
          path: '/iframeContent',
          name: 'iframe',
          component: IframeContent
        },
        {
          path: '/defaultContent',
          name: '默认主页',
          component: DefaultContent
        },
        {
          path: '/merchantManage',
          name: '商户管理',
          component: MerchantManage
        },
        {
          path: '/userManage',
          name: 'userManage',
          component: UserManage
        },
        {
          path: '/roleManage',
          name: '角色管理',
          component: RoleManage
        },
        {
          path: '/accessManage',
          name: '权限管理',
          component: AccessManage
        },
      ]
    },
    {
      path: '/accessDeny',
      name: '无权访问',
      component: AccessDeny
    },
    {
      path: '/test',
      name: '测试',
      component: Test
    }
    ,
    {
      path: '/test1',
      name: '测试1',
      component: Test1
    }
  ]
})
