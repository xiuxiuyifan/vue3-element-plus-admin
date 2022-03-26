import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/components/Layout/Layout.vue'
import Login from '../views/login/index.vue'
import 'nprogress/nprogress.css'
import localCatch from '@/utils/local-catch'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'layout',
    redirect: '/home',
    component: Layout
  },
  {
    path: '/login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to) => {
  NProgress.start()
  // 去的不是 login 页面
  if (to.path !== '/login') {
    const token = localCatch.getCache('token')
    // 没有token（没有登录， 就让用户导航到login页面）
    if (!token) {
      return '/login'
    }
  }
  // 是否考虑以下问题？
  // 如果正常的话，要考虑着这里获取用户信息和菜单信息。因为如果超级管理员在用户登录期间修改了菜单信息，或者已登录用户的用户信息，这个是
})

router.afterEach(() => {
  NProgress.done()
})

export default router
