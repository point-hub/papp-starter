import { createApp } from 'vue'
import { createPinia } from 'pinia'

import MainApp from './main-app.vue'
import router from './router'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import 'uno.css'
import './assets/main.css'

const app = createApp(MainApp)

app.use(createPinia())
app.use(router)

app.mount('#app')
