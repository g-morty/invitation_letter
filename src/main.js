import { createApp } from 'vue'
import App from './App.vue'

import PrimeVue from 'primevue/config';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import 'primeflex/primeflex.css';


const app = createApp(App);
app.use(PrimeVue);
app.component('Dialog', Dialog);
app.component('Button', Button);

app.mount('#app');
// createApp(App).mount('#app')
