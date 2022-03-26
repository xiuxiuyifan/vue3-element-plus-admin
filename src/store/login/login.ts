import { Module } from 'vuex'
import router from '../../router'

import { accountLogin, getMenus, getUserInfo } from '@/service/login/login'
import localCatch from '@/utils/local-catch'
import { IRootState } from '../types'
import type { ILogin } from './types'
import { menuToRouter } from '@/utils/mapping-menu'

const loginState: Module<ILogin, IRootState> = {
  namespaced: true,
  state: () => {
    return {
      token: '',
      userInfo: {},
      menus: []
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    setMenus(state, menus) {
      state.menus = menus
      // 同时动态添加路由
      const routers = menuToRouter(menus)
      routers.forEach((routerItem) => {
        router.addRoute('layout', routerItem as any)
      })
    }
  },
  actions: {
    async accountLoginAction({ commit }, account: { account: string; password: string }) {
      let loginRes
      try {
        const accountPwd = {
          account: account.account,
          password: account.password
        }
        // 调用登录接口与
        loginRes = await accountLogin(accountPwd)
        commit('setToken', loginRes?.data?.token)
        localCatch.setCache('token', loginRes?.data?.token)
      } catch (err) {
        console.log(err)
      }
      try {
        // 获取用户信息
        const userInfoRes = await getUserInfo(loginRes?.data.id)
        commit('setUserInfo', userInfoRes?.data)
        localCatch.setCache('userInfo', userInfoRes?.data)
      } catch (err) {
        console.log(err)
      }
      try {
        // 获取菜单信息
        const menusRes = await getMenus()
        commit('setMenus', menusRes?.data)
        localCatch.setCache('menus', menusRes?.data)
      } catch (err) {
        console.log(err)
      }
      // 都完成就跳首页
      router.push({
        path: '/home'
      })
    },
    loadLocalCache({ commit }) {
      // 判断当前localStorage里面是否有缓存的数据，如果有的话就加载到Vuex中去。
      const token = localCatch.getCache('token')
      const userInfo = localCatch.getCache('userInfo')
      const menus = localCatch.getCache('menus')
      if (token) {
        commit('setToken', token)
      }
      if (userInfo) {
        commit('setUserInfo', userInfo)
      }
      if (menus) {
        commit('setMenus', menus)
      }
    }
  },
  modules: {}
}

export default loginState
