import '@unocss/reset/tailwind-compat.css';
import './assets/css/main.css';
import '@point-hub/papp/index.css';
import 'virtual:uno.css';

import { PluginBaseComponents, PluginInputMask, PluginTooltip } from '@point-hub/papp';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

import Main from './main.vue';
import { AblyPlugin } from './plugins/ably';
import router from './router';

const app = createApp(Main);
const pinia = createPinia();

app.use(pinia);
app.use(router);

app.use(AblyPlugin);
app.use(PluginInputMask);
app.use(PluginTooltip);
app.use(PluginBaseComponents);

app.mount('#app');
