import { createApp } from 'vue'
import { createPinia } from 'pinia'

import MainApp from './main-app.vue'
import router from './router'

// unocss
import '@unocss/reset/tailwind.css'
import './assets/css/main.css'
import 'virtual:uno.css'
import 'uno.css'

// highlightjs
import 'highlight.js/styles/atom-one-dark.css'
import 'highlight.js/lib/common'
import hljsVuePlugin from '@highlightjs/vue-plugin'

// notificaton
import Notifications from '@kyvg/vue3-notification'

// cleave
import Cleave from 'cleave.js'

// tippy
import { plugin as VueTippy } from 'vue-tippy'
import 'tippy.js/dist/tippy.css'

const app = createApp(MainApp)
app.directive('cleave', {
  mounted: (el, binding) => {
    el.cleave = new Cleave(el, binding.value || {})
  }
})
app.use(VueTippy)
app.use(router)
app.use(hljsVuePlugin)
app.use(Notifications)
app.use(createPinia())

app.mount('#app')
