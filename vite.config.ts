import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import UnoCSS from 'unocss/vite';
import { defineConfig, loadEnv } from 'vite';

export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    plugins: [vue(), UnoCSS()],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    esbuild: mode === 'production' ? { drop: ['console', 'debugger'] } : {},
    server: {
      port: Number(env.VITE_PORT),
    },
    preview: {
      port: Number(env.VITE_PORT),
    },
  });
};
