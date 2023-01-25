import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  root: '.',
  base: '/daily-tasks',
  build: {
    outDir: 'build',
  },
  resolve: {
    alias: {
      '@/services': resolve(__dirname, './src/common/services'),
      '@/utils': resolve(__dirname, './src/common/utils'),
      '@/pages': resolve(__dirname, './src/pages'),
    },
  },
  // @ts-ignore
  test: {
    css: false,
    coverage: {
      reporter: ['text', 'json', 'html', 'lcov'],
    },
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      base: '/daily-tasks/',
      includeAssets: ['favicon.ico', 'icon.png', 'icon-512x512.png'],
      manifest: {
        name: 'daily-tasks',
        short_name: 'daily-tasks',
        description: 'Gerencie suas daily tasks diárias',
        theme_color: '#2d3036',
        background_color: '#2d3036',
        orientation: 'portrait',
        start_url: '/daily-tasks/registerSW.js',
        scope: '/daily-tasks/',
        display: 'standalone',
        icons: [
          {
            src: '/daily-tasks/icons/icon-192.png',
            type: 'image/png',
            sizes: '192x192',
          },
          {
            src: '/daily-tasks/icons/icon-512.png',
            type: 'image/png',
            sizes: '512x512',
          },
          {
            src: '/daily-tasks/icons/icon-maskable-192.png',
            type: 'image/png',
            sizes: '192x192',
            purpose: 'maskable',
          },
          {
            src: '/daily-tasks/icons/icon-maskable-512.png',
            type: 'image/png',
            sizes: '512x512',
            purpose: 'maskable',
          },
        ],
      },

      // devOptions: {
      //   enabled: true,
      // },
    }),
  ],
});
