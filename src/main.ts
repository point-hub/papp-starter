import '@unocss/reset/tailwind-compat.css'
import './assets/css/main.css'
import '@point-hub/papp/index.css'
import 'virtual:uno.css'

import { PluginBaseComponents, PluginInputMask, PluginTooltip } from '@point-hub/papp'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

import MainApp from './main-app.vue'
import router from './router'

const app = createApp(MainApp)
const pinia = createPinia()

app.use(pinia)
app.use(router)

app.use(PluginInputMask)
app.use(PluginTooltip)
app.use(PluginBaseComponents)

app.mount('#app')
