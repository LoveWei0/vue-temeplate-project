import 'virtual:svg-icons-register'
import { createApp } from 'vue'
import './assets/css/main.scss'
import App from './App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from './router'
import { createPinia } from 'pinia'
// persist
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
createPinia().use(piniaPluginPersistedstate)
app.use(router).use(createPinia())
app.mount('#app')
