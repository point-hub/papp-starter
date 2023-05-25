import { type Preset, presetIcons } from 'unocss'

export default function presetIcon(): Preset {
  const fontawesomeUrl = process.env.VITE_FONTAWESOME_ICON_BASEURL
  return {
    name: 'preset-icon',
    presets: [
      presetIcons({
        cdn: 'https://esm.sh/',
        collections: {
          fab: async (iconName: string) =>
            await fetch(`${fontawesomeUrl}/brands/${iconName}.svg`).then((res) => res.text()),
          far: async (iconName: string) =>
            await fetch(`${fontawesomeUrl}/regular/${iconName}.svg`).then((res) => res.text()),
          fas: async (iconName: string) =>
            await fetch(`${fontawesomeUrl}/solid/${iconName}.svg`).then((res) => res.text()),
          fal: async (iconName: string) =>
            await fetch(`${fontawesomeUrl}/light/${iconName}.svg`).then((res) => res.text()),
          fat: async (iconName: string) =>
            await fetch(`${fontawesomeUrl}/thin/${iconName}.svg`).then((res) => res.text()),
          fad: async (iconName: string) =>
            await fetch(`${fontawesomeUrl}/duotone/${iconName}.svg`).then((res) => res.text()),
          fasr: async (iconName: string) =>
            await fetch(`${fontawesomeUrl}/sharp-regular/${iconName}.svg`).then((res) =>
              res.text()
            ),
          fass: async (iconName: string) =>
            await fetch(`${fontawesomeUrl}/sharp-solid/${iconName}.svg`).then((res) => res.text()),
          fasl: async (iconName: string) =>
            await fetch(`${fontawesomeUrl}/sharp-light/${iconName}.svg`).then((res) => res.text())
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
    ]
  }
}
