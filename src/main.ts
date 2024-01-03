import '@unocss/reset/tailwind-compat.css'
import './assets/css/main.css'
import 'virtual:uno.css'
import '@point-hub/papp/style.css'

import { PluginIcon, PluginInputMask, PluginTooltip } from '@point-hub/papp'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

import MainApp from './main-app.vue'
import router from './router'

const app = createApp(MainApp)

app.use(router)
app.use(createPinia())

app.use(PluginInputMask)
app.use(PluginTooltip)
app.use(PluginIcon)

app.mount('#app')
