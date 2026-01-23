import { presetPappIcon } from '@point-hub/preset-papp-icon';
import presetWind4 from '@unocss/preset-wind4';
import TransformerDirectives from '@unocss/transformer-directives';
import { defineConfig, presetWebFonts } from 'unocss';

export default defineConfig({
  presets: [
    presetWind4({
      preflights: { reset: true },
      mode: 'vue-scoped',
    }),
    presetPappIcon(),
    presetWebFonts({
      provider: 'none',
      fonts: {
        inter: 'Inter',
        'open-sans': 'Open Sans',
      },
    }),
  ],
  transformers: [TransformerDirectives()],
  theme: {
    colors: {
      primary: '#321fda',
      secondary: '#9da5b1',
      info: '#3399ff',
      success: '#2eb85c',
      warning: '#f9b115',
      danger: '#e55353',
    },
  },
});
