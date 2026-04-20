import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'react_login',
      filename: 'remoteEntry.js',
      exposes: {
        './Login': './src/LoginWrapper.jsx',
      },
      shared: {
        'react': { singleton: true, requiredVersion: false },
        'react-dom': { singleton: true, requiredVersion: false },
      },
    }),
  ],
  build: {
    target: 'esnext',
  },
  server: {
    port: 5001,
    cors: true,
  },
  preview: {
    port: 5001,
    cors: true,
  },
})