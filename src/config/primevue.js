
import PrimeVue from 'primevue/config';

import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import SpeedDial from 'primevue/speeddial';
import BlockUI from 'primevue/blockui';
import InputText from 'primevue/inputtext';
import Sidebar from 'primevue/sidebar';
import Galleria from 'primevue/galleria';
import Dropdown from 'primevue/dropdown';
import ColorPicker from 'primevue/colorpicker';
import FileUpload from 'primevue/fileupload';
import Carousel from 'primevue/carousel';
import Paginator from 'primevue/paginator';
import Slider from 'primevue/slider';
import ProgressSpinner from 'primevue/progressspinner';

export default (app) => {
    app.use(PrimeVue);

    app.component('Dialog', Dialog);
    app.component('Button', Button);
    app.component('SpeedDial', SpeedDial);
    app.component('BlockUI', BlockUI);
    app.component('InputText', InputText);
    app.component('Sidebar', Sidebar);
    app.component('Galleria', Galleria);
    app.component('Dropdown', Dropdown);
    app.component('ColorPicker', ColorPicker);
    app.component('FileUpload', FileUpload);
    app.component('Carousel', Carousel);
    app.component('Paginator', Paginator);
    app.component('Slider', Slider);
    app.component('ProgressSpinner', ProgressSpinner);

}