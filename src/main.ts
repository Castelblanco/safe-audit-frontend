import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { Quasar, Notify } from 'quasar';
import quasarLang from 'quasar/lang/es';
import App from './App.vue';
import { appRouter } from './router';
import { loadTheme } from '@helpers/load_theme';

import 'quasar/src/css/index.sass';
import '@quasar/extras/material-icons/material-icons.css';
import './main.css';
import { setInterceptor, setInterceptorAuth } from '@storages/http/client/interceptor';
import { httpAuth, httpV1 } from '@storages/http/client/instances';
const app = createApp(App);

const theme = loadTheme();
app.use(createPinia());
app.use(appRouter);

app.use(Quasar, {
    lang: quasarLang,
    config: {
        brand: {
            primary: '#2885ef',
            secondary: '#4d667f',
            accent: '#4843aa',
            dark: '#1f2937',
            'dark-page': '#111827',
            positive: '#3db44a',
            negative: '#ee362f',
            info: '#3b82f6',
            warning: '#e4aa00',
        },
        dark: theme === 'dark',
        notify: {
            classes: 'snackbar-animation',
        },
    },
    plugins: {
        Notify,
    },
});

// Set interseptors
setInterceptorAuth([httpAuth]);
setInterceptor([httpV1]);

app.mount('#app');
