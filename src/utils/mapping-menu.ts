import { IMenus } from '@/store/login/types'
import { IRewriteRouteRecordRaw } from './types'

// 把树形结构的菜单，扁平化成一位数组的router配置信息
export function menuToRouter(menus: IMenus[]): IRewriteRouteRecordRaw[] {
  const routers: IRewriteRouteRecordRaw[] = []
  // 菜单中keepAlive 为true 的路由 的name 的集合
  const keepAlives: string[] = []
  // 递归
  const recursionMenu = (menus: IMenus[]): void => {
    menus.forEach((menuItem) => {
      if (!menuItem.children) {
        const { url } = menuItem
        const name = url.replace('/', '').toLocaleLowerCase().split('/').join('-')
        routers.push({
          name,
          path: url,
          component: () => import(`../views${url}`),
          meta: {
            title: menuItem.name
          },
          redirect: undefined
        })
        if (menuItem.keepAlive) {
          keepAlives.push(name)
        }
      } else {
        recursionMenu(menuItem.children)
      }
    })
  }

  recursionMenu(menus)
  return routers
}
