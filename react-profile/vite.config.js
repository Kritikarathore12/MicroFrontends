import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'react_profile',
      filename: 'remoteEntry.js',
      exposes: {
        './Profile': './src/Profile.jsx',
      },
      shared: ['react', 'react-dom']
    })
  ],
  build: {
    target: 'esnext',
    cssCodeSplit: false
  },
  preview: {
    port: 5003,
    strictPort: true
  }
})
