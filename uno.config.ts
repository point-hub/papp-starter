import dotenv from 'dotenv'
import { defineConfig, presetUno, presetIcons } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'

dotenv.config({
  path: '.env.local'
})

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      cdn: 'https://esm.sh/',
      collections: {
        fab: async (iconName: string) =>
          await fetch(`${process.env.VITE_FONTAWESOME_CDN}/brands/${iconName}.svg`).then((res) =>
            res.text()
          ),
        far: async (iconName: string) =>
          await fetch(`${process.env.VITE_FONTAWESOME_CDN}/regular/${iconName}.svg`).then((res) =>
            res.text()
          ),
        fas: async (iconName: string) =>
          await fetch(`${process.env.VITE_FONTAWESOME_CDN}/solid/${iconName}.svg`).then((res) =>
            res.text()
          ),
        fal: async (iconName: string) =>
          await fetch(`${process.env.VITE_FONTAWESOME_CDN}/light/${iconName}.svg`).then((res) =>
            res.text()
          ),
        fat: async (iconName: string) =>
          await fetch(`${process.env.VITE_FONTAWESOME_CDN}/thin/${iconName}.svg`).then((res) =>
            res.text()
          ),
        fad: async (iconName: string) =>
          await fetch(`${process.env.VITE_FONTAWESOME_CDN}/duotone/${iconName}.svg`).then((res) =>
            res.text()
          ),
        fasr: async (iconName: string) =>
          await fetch(`${process.env.VITE_FONTAWESOME_CDN}/sharp-regular/${iconName}.svg`).then(
            (res) => res.text()
          ),
        fass: async (iconName: string) =>
          await fetch(`${process.env.VITE_FONTAWESOME_CDN}/sharp-solid/${iconName}.svg`).then(
            (res) => res.text()
          ),
        fasl: async (iconName: string) =>
          await fetch(`${process.env.VITE_FONTAWESOME_CDN}/sharp-light/${iconName}.svg`).then(
            (res) => res.text()
          )
      },
      customizations: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        transform(svg, collection, icon) {
          if (['fab', 'far', 'fas', 'fal', 'fat', 'fad'].includes(collection))
            return svg.replace('path', 'path fill="currentColor"')

          return svg
        }
      }
    })
  ],
  transformers: [transformerDirectives()]
})
