import { defineConfig, presetUno, presetWebFonts } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'
import presetMain from './src/assets/presets/preset-main'
import { config } from 'dotenv'

config()

export default defineConfig({
  presets: [
    presetUno({ mode: 'vue-scoped' }),
    presetWebFonts({
      provider: 'google', // default provider
      fonts: {
        monserrat: [
          {
            name: 'Montserrat',
            weights: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
            italic: true
          }
        ],
        roboto: [
          {
            name: 'Roboto',
            weights: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
            italic: true
          }
        ]
      }
    }),
    presetMain()
  ],
  transformers: [transformerDirectives()],
  theme: {
    colors: {
      primary: '#321fda',
      secondary: '#9da5b1',
      info: '#3399ff',
      success: '#2eb85c',
      warning: '#f9b115',
      danger: '#e55353'
    }
  },
  safelist: ['i-fad-house-chimney', 'i-fad-wand-magic-sparkles']
})
