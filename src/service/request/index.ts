import axios, { AxiosResponse } from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import type { HttpInstanceConfig, HttpRequestInterceptors } from './types'
import { ElMessage } from 'element-plus'

const errorHandler = (error: any) => {
  const status = error?.response?.status
  switch (status) {
    case 400:
      error.message = '请求错误'
      break
    case 401:
      error.message = '未授权，请登录'
      break
    case 403:
      error.message = '拒绝访问'
      break
    case 404:
      error.message = `请求地址出错: ${error?.response?.config?.baseURL}`
      break
    case 408:
      error.message = '请求超时'
      break
    case 500:
      error.message = '服务器内部错误'
      break
    case 501:
      error.message = '服务未实现'
      break
    case 502:
      error.message = '网关错误'
      break
    case 503:
      error.message = '服务不可用'
      break
    case 504:
      error.message = '网关超时'
      break
    case 505:
      error.message = 'HTTP版本不受支持'
      break
    default:
      error.message = '未知错误'
      break
  }

  ElMessage.error({
    type: 'error',
    message: error?.message + '!',
    showClose: true
  })
  return Promise.reject(error)
}

class Http {
  // 单个实例
  instance: AxiosInstance
  // 存放不同实例的拦截器
  interceptors?: HttpRequestInterceptors
  constructor(config: HttpInstanceConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors

    this.instance.interceptors.request.use(function (config: AxiosRequestConfig) {
      return config
    }, errorHandler)

    this.instance.interceptors.request.use(
      this?.interceptors?.requestInterceptors,
      this?.interceptors?.requestInterceptorsCatch
    )

    this.instance.interceptors.response.use(function (res: AxiosResponse) {
      const resData = res.data
      const code = resData?.code
      let message = ''
      if (code === undefined) {
        return resData
      } else {
        switch (code) {
          case 200:
            return resData
          default:
            message = '未知code，找后台协商!'
        }
      }
      ElMessage.warning({
        message: message,
        type: 'warning',
        showClose: true
      })
      return resData
    }, errorHandler)

    this.instance.interceptors.response.use(
      this?.interceptors?.responseInterceptors,
      this?.interceptors?.responseInterceptorsCatch
    )
  }

  //泛型方法和泛型接口结合使用，为了给Promise的res添加类型， 一级一级往下传递
  request<T>(config: HttpInstanceConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      //单个请求的拦截
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config)
      }
      // 单个请求响应的拦截
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors(res)
          }
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  get<T>(config: HttpInstanceConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T>(config: HttpInstanceConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T>(config: HttpInstanceConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  // 编辑修改
  patch<T>(config: HttpInstanceConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default Http
