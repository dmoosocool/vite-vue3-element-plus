import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { ElLoading } from 'element-plus'
import { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'
// const LoadingComponent = {
//   template: `<p style="min-height: 500px; width: 100%;">加载中...</div>`,
// }

// const ErrorComponent = {
//   template: `
//     <div style="text-align: center;padding: 100px 0;">Loading error. Please refresh the page and try again</div>`,
// }
// const getAsyncComponent = (func: any) => {
//   return defineAsyncComponent({
//     loader: func,
//     delay: 0,
//     timeout: 30000,
//     errorComponent: ErrorComponent,
//     loadingComponent: LoadingComponent,
//   })
// }

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '@/views/home'),
  },
  {
    path: '/env',
    name: 'Env',
    component: () => import(/* webpackChunkName: "Env" */ '@/views/env'),
  },
  {
    path: '/download',
    name: 'Download',
    component: () =>
      import(/* webpackChunkName: "Download" */ '@/views/download'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export function setupRouter(app: App<Element>) {
  app.use(router)
}

let Loading: ILoadingInstance

router.beforeEach(() => {
  Loading = ElLoading.service({ fullscreen: true, text: 'Loading...' })
})

router.afterEach(() => {
  Loading.close()
})

export default router
