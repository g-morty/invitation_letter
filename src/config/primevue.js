
import PrimeVue from 'primevue/config';

import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import SpeedDial from 'primevue/speeddial';


export default (app) => {
    app.use(PrimeVue);

    app.component('Dialog', Dialog);
    app.component('Button', Button);
    app.component('SpeedDial', SpeedDial);
}