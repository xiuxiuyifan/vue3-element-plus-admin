import Layout from "@/layout/index.vue";

const getToken = () => {
  return !!localStorage.getItem('token')
}

const menuToRouter = (menu: any) => {
  let router: any = [
    {
      path: '/',
      component: Layout,
      redirect: '/dashboard',
      children: []
    }
  ]
  //将树形结构展开
  let recursionMenu = (menu:any) => {
    menu.forEach((item:any)=>{
      if(!item.children){
        router[0].children.push({
          path:item.path,
          component: () => import(`../views/${item.component}`)
        })
      }else {
          item.children.forEach((item:any)=>{
            if(item.children){
              recursionMenu(item.children)
            }else {
              router[0].children.push({
                path:item.path,
                component: () => import(`../views/${item.component}`)
              })
            }
          })
      }
    })
  }
  recursionMenu(menu)
  return router
}

export {
  getToken,
  menuToRouter
}
