import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'react_signup',
      filename: 'remoteEntry.js',
      exposes: {
        './Signup': './src/SignupWrapper.jsx',
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
    port: 5002,
    cors: true,
  },
  preview: {
    port: 5002,
    cors: true,
  },
})