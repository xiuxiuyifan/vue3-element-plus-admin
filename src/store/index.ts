import { createStore, Store, storeKey, useStore as useVuexStore } from 'vuex'
import { IRootState, IStore } from './types'
import login from './login/login'

const store = createStore<IRootState>({
  state() {
    return {
      deviceWidth: 0,
      deviceHeight: 0
    }
  },
  mutations: {},
  actions: {},
  modules: {
    login
  }
})

export default store

export function setupStore(): void {
  store.dispatch('login/loadLocalCache')
}

/**
 *
 * @returns 定义一个函数说明一下返回的Store 是一个什么类型，方便使用
 */
export function useStore(): Store<IStore> {
  return useVuexStore()
}
