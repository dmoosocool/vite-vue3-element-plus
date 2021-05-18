import { createApp } from 'vue'
import 'element-plus/packages/theme-chalk/src/base.scss'
import App from './App'
import router from '@/route'

const app = createApp(App)

app.use(router)
app.mount('#app')
