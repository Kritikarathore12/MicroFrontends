import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'vue_host',
      remotes: {
        react_login:    'http://localhost:5001/assets/remoteEntry.js',
        react_signup:   'http://localhost:5002/assets/remoteEntry.js',
        react_profile:  'http://localhost:5003/assets/remoteEntry.js',
        react_dashboard:'http://localhost:5004/assets/remoteEntry.js',
      },
      shared: {
        'vue':       { singleton: true, requiredVersion: false },
        'react':     { singleton: true, requiredVersion: false },
        'react-dom': { singleton: true, requiredVersion: false },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    cors: true,
  },
  preview: {
    port: 5173,
    cors: true,
  },
  build: {
    target: 'esnext',
  },
})