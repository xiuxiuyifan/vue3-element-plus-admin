import {menu} from "@/menu";
import {menuToRouter} from "@/utils/utils";

const state = {
  //用户token
  token:"",
  //用户角色
  roles: [],
  //用户可访问的路由信息
  accessRoutes: [],
  //后台获取的菜单信息
  menu: []
}
const mutations = {
  SET_TOKEN: (state: any,token: string) => {
    state.token = token
  },
  SET_ROLES: (state:any,roles:[string]) => {
    state.roles = roles
  },
  SET_ACCESS_ROUTES: (state: any, routes: any) => {
    state.accessRoutes = routes
  },
  SET_MENU: (state: any, menu: any) => {
    state.menu = menu
  }
}

const actions = {
  //登录只设置token 信息
  login({commit}: any) {
    return new Promise((resolve, reject) => {
      //模拟登录请求
      setTimeout(() => {
        localStorage.setItem('token', 'token')
        commit('SET_TOKEN','token')
        resolve(true)
      }, 1000)
    })
  },
  //获取用户信息信息 权限 菜单信息
  getUserInfo({commit}:any) {
    return new Promise((resolve, reject)=>{
      let roles = ['system-admin']
      let routes = menuToRouter(menu)
      commit('SET_ROLES', roles)
      commit('SET_ACCESS_ROUTES', routes)
      commit('SET_MENU', menu)
      resolve({
        roles,
        routes
      })
    })
  },
  //根据菜单信息生成路由配置文件
  generateRouters({commit}: any, routes: any) {
    return new Promise((resolve, reject) => {
      commit('SET_ACCESS_ROUTES', routes)
      resolve(routes)
    })
  }
}
export default {
  namespace: true,
  state,
  mutations,
  actions
}
