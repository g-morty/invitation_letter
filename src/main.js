import { createApp } from 'vue'
import App from './App.vue'

import PrimeConfig from './config/primevue'
import { fabric } from "fabric";


const app = createApp(App);


PrimeConfig(app);
app.config.globalProperties.$fabric = fabric;


app.mount('#app');