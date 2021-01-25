import router from './router/index'
import {getToken} from "@/utils/utils";

import store from './store/index'

const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  if (getToken()) {
    if (to.path === '/login') {
      next('/dashboard')
    } else {
      // @ts-ignore
      let hasRoles = store.state.permission.roles && store.state.permission.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        // 获取用户信息
        let {roles,routes} = await store.dispatch('getUserInfo')
        //添加路由信息
        let accessRoutes = await store.dispatch('generateRouters', routes)
        accessRoutes.forEach((item: any) => {
          router.addRoute(item)
        })
        next({...to, replace: true})
      }
    }
  } else {
    if (whiteList.indexOf(to.path) != -1) {
      next()
    } else {
      //未登录的时候会重定向到登录页面
      next(`/login?redirect=${to.path}`)
    }
  }
})
