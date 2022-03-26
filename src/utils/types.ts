import { RouteRecordRaw } from 'vue-router'

interface IRedirect {
  redirect?: string
}

export type IRewriteRouteRecordRaw = IRedirect & Omit<RouteRecordRaw, 'redirect'>
