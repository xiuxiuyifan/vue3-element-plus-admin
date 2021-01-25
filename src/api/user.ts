import Layout from "@/layout/index.vue";

const getInfo = ()=>{
  const newRouter = [
    {
      path: '/',
      component: Layout,
      redirect: '/dashboard',
      children: [
        {
          path: 'dashboard',
          component: () => import('../views/dashboard/index.vue')
        },
        {
          path: '/table/merge-table',
          component: () => import('../views/table/merge-table/index.vue')
        },
        {
          path: '/table/tree-table',
          component: () => import('../views/table/tree-table/index.vue')
        }
      ]
    }
  ]
  return new Promise((resolve,reject)=>{
    resolve(newRouter)
  })
}

export {
  getInfo
}
