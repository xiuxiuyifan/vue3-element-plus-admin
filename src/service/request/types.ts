import { AxiosRequestConfig, AxiosResponse } from 'axios'

// 定义有哪些拦截器 ，泛型接口，并且有默认类型
export interface HttpRequestInterceptors<T = AxiosResponse> {
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorsCatch?: (error: any) => any
  responseInterceptors?: (response: T) => T
  responseInterceptorsCatch?: (error: any) => any
}
// 扩展在构造实例的时候可以传入拦截器
export interface HttpInstanceConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: HttpRequestInterceptors<T>
}
