import { ILogin } from './login/types'

export interface IRootState {
  deviceWidth: number
  deviceHeight: number
}

export interface IRootModules {
  login: ILogin
}

export type IStore = IRootState & IRootModules
