import { createApp } from 'vue'
import App from './App.vue'

import PrimeConfig from './config/primevue'
import { fabric } from "fabric";
import router from './router/index'
import './static/icon/iconfont.css'
import { nanoid } from 'nanoid'

const app = createApp(App);


PrimeConfig(app);
app.config.globalProperties.$fabric = fabric;
app.config.globalProperties.$nanoid = nanoid;
app.use(router)

app.mount('#app');