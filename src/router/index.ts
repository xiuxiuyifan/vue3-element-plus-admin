import { createRouter, createWebHashHistory } from 'vue-router'

import Layout from '../layout/index.vue'

import Dashboard from '../views/dashboard/index.vue'

import TableMerge from '../views/table/index.vue'


//1. 把路由写好
//2. 菜单从路由信息里面读取，并渲染出来
//3. 添加切换路由的动画效果
//4. 修改成动态路由的模式
//5. 尝试在写出对应新增菜单，管理权限的api文档和相应功能。
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: Layout,
      redirect:'/dashboard',
      children: [
        {
          path: 'dashboard',
          component: Dashboard
        }
      ]
    },
    {
      path: '/table',
      component: Layout,
      children: [
        {
          path: 'table-merge',
          component: TableMerge
        }
      ]
    }
  ],
})

export default router