import { fileURLToPath } from 'node:url';

import vue from '@vitejs/plugin-vue';
import UnoCSS from 'unocss/vite';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    plugins: [vue(), UnoCSS()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    esbuild: mode === 'production' ? {
      drop: ['console', 'debugger'],
    } : {},
    server: {
      port: Number(env.VITE_PORT),
    },
    preview: {
      port: Number(env.VITE_PORT),
    },
  });
};
