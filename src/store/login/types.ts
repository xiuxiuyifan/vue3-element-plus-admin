export interface IMenuItem {
  id: number
  name: string
  type: number
  url: string
  icon: string
  sort: number
  keepAlive: boolean
  children?: IMenuItem[]
}

export type IMenus = IMenuItem

export interface ILogin {
  token: string
  userInfo: any
  menus: IMenus[]
}
