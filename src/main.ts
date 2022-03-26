import { createApp } from 'vue'

import App from './App.vue'
import globalRegister from './global'
import router from './router'
import { http } from './service'
import store from './store'
import { setupStore } from './store'
import 'normalize.css'
import './assets/less/element-plus-#0054FE/index.css'
import './assets/less/index.less'

const app = createApp(App)
app.use(globalRegister)
app.use(store)
// 从本地缓存中拿store信息设置给vuex里面
setupStore()
app.use(router)
app.mount('#app')
