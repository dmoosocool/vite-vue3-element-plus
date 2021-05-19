import Mitt from '@/utils/mitt'
import type { RouteLocationNormalized } from 'vue-router'
import { getRawRoute } from '@/utils'

const mitt = new Mitt()
const key = Symbol()

let lastChangeTab: RouteLocationNormalized

export function setRouteChange(lastChangeRoute: RouteLocationNormalized) {
  const r = getRawRoute(lastChangeRoute)
  mitt.emit(key, r)
  lastChangeTab = r
}

export function listenerRouteChange(
  callback: (route: RouteLocationNormalized) => void,
  immediate: boolean = true
) {
  mitt.on(key, callback)
  immediate && lastChangeTab && callback(lastChangeTab)
}

export function remoteTabChangeListener() {
  mitt.clear()
}
