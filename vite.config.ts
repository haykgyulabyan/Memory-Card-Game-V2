import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@mui/styled-engine': '@mui/styled-engine-sc',
      api: '/src/api',
      data: '/src/data',
      pages: '/src/pages',
      store: '/src/store',
      hooks: '/src/hooks',
      types: '/src/types',
      utils: '/src/utils',
      styles: '/src/styles',
      routes: '/src/routes',
      assets: '/src/assets',
      models: '/src/models',
      config: '/src/config',
      contexts: '/src/contexts',
      components: '/src/components',
    },
  },
});
