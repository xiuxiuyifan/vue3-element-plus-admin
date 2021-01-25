import {createRouter, createWebHashHistory} from 'vue-router'

const Layout = import('../layout/index.vue')

const Dashboard = () => import('../views/dashboard/index.vue')
const MergeTable = () => import('../views/table/merge-table/index.vue')
const TreeTable = () => import('../views/table/tree-table/index.vue')
const Login = () => import('../views/login/index.vue')

const newRouter = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
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
        path: 'merge-table',
        component: MergeTable
      },
      {
        path: 'tree-table',
        component: TreeTable
      }
    ]
  }
]

//1. 把路由写好
//2. 菜单从路由信息里面读取，并渲染出来
//3. 添加切换路由的动画效果
//4. 修改成动态路由的模式
//5. 尝试在写出对应新增菜单，管理权限的api文档和相应功能。
//6. 当父菜单下面有子菜单的时候，父菜单的path就不生效了。
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/login',
      component: Login
    },
    // ...newRouter
  ],
})

export default router
