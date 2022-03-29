
import PrimeVue from 'primevue/config';

import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import SpeedDial from 'primevue/speeddial';
import BlockUI from 'primevue/blockui';
import InputText from 'primevue/inputtext';
import Sidebar from 'primevue/sidebar';

export default (app) => {
    app.use(PrimeVue);

    app.component('Dialog', Dialog);
    app.component('Button', Button);
    app.component('SpeedDial', SpeedDial);
    app.component('BlockUI', BlockUI);
    app.component('InputText', InputText);
    app.component('Sidebar', Sidebar);

}