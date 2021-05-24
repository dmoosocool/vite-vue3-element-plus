import type { App } from 'vue'

import { RouteParamsRaw } from 'vue-router'
declare global {
  interface Window {
    __APP__: App<Element>
  }
}

declare type JSON = Record<string, unknown>

declare interface SidebarItem {
  index: string
  title: string
  icon: string
  route: RouteParamsRaw
  children?: SidebarItem[]
  group?: SidebarItem[]
}

export { JSON, SidebarItem }
