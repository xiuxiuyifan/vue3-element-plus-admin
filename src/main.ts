import { createApp } from 'vue'
import ElementPlus from 'element-plus';

import App from './App.vue'
import router from './router/index'
import store from "@/store";
import './permission'

//css
import 'normalize.css'
import './assets/css/global.scss'
import './assets/css/element-variables.scss'


const app = createApp(App)
app.use(router)
app.use(ElementPlus, { size: 'small', zIndex: 3000 })
app.use(store)
app.mount('#app')
