import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'// 引入axios
import './mobile/flexible' // 适配
import './styles/reset.css' // 初始化样式

import 'vant/lib/index.css'

import getVant from './plugins'
// Vue.prototype.$axios = axios// 把axios挂载到vue上

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')

getVant(app)
