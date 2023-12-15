import '@unocss/reset/tailwind.css'
import './assets/css/main.css'
import 'virtual:uno.css'
import '@point-hub/papp/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { PluginInputMask, PluginTooltip, PluginIcon } from '@point-hub/papp'

import MainApp from './main-app.vue'
import router from './router'

const app = createApp(MainApp)

app.use(createPinia())
app.use(router)

app.use(PluginInputMask)
app.use(PluginTooltip)
app.use(PluginIcon)

app.mount('#app')
