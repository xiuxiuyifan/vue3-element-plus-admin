import Http from './request'
// import { VUE_APP_BASE_URL } from '../config'

const http = new Http({
  baseURL: process.env.VUE_APP_BASE_URL
  // 实例的拦截器
  // interceptors: {
  //   requestInterceptors: function (config) {
  //     console.log('请求拦截器')
  //     return config
  //   },
  //   requestInterceptorsCatch: function (error) {
  //     console.log(error)
  //   },
  //   responseInterceptors: function (res) {
  //     console.log('响应拦截器')
  //     return res
  //   },
  //   responseInterceptorsCatch: function (error) {
  //     console.log(error)
  //   }
  // }
})

export { http }
