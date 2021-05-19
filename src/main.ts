import { createApp } from 'vue'
import 'element-plus/packages/theme-chalk/src/base.scss'
import './assets/index.css'
import App from './App'
import router, { setupRouter } from '@/router'
import { setupRouterGuard } from '@/router/guard'
;(async () => {
  const app = createApp(App)

  // Configure router
  setupRouter(app)

  // setup router guard
  setupRouterGuard()

  // Mount when the route is ready.
  // https://next.router.vuejs.org/api/#isready
  await router.isReady()
  app.mount('#app', true)

  if (import.meta.env.DEV) {
    window.__APP__ = app
  }
})()
