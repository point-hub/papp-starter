import { type Preset } from 'unocss'
import presetIcon from './preset-icon'

export default function presetMain(): Preset {
  return {
    name: 'preset-main',
    presets: [presetIcon()]
  }
}
