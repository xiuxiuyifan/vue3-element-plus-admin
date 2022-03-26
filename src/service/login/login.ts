import { http } from '../index'
import { DataType } from '../types'
import { IAccountLogin } from './types'

export const accountLogin = (params: IAccountLogin): Promise<DataType> => {
  return http.get({
    url: '/api/login.json',
    params
  })
}

export const getUserInfo = (uid: string): Promise<DataType> => {
  return http.get({
    url: '/api/userInfo.json',
    params: {
      uid
    }
  })
}

export const getMenus = (): Promise<DataType> => {
  return http.get({
    url: '/api/menu.json'
  })
}
