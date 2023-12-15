import { defineConfig, presetWebFonts, presetUno } from 'unocss'
import TransformerDirectives from '@unocss/transformer-directives'
import presetPappIcon from '@point-hub/preset-papp-icon'

export default defineConfig({
  presets: [
    presetUno({ mode: 'vue-scoped' }),
    presetPappIcon(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        inter: 'Inter',
        roboto: 'Roboto',
        'roboto-mono': 'Roboto Mono'
      }
    })
  ],
  transformers: [TransformerDirectives()]
})
