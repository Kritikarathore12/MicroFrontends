import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'react_shared_ui',
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/components/Button.jsx',
        './Input': './src/components/Input.jsx',
      },
      shared: {
        'react': { singleton: true, requiredVersion: false },
        'react-dom': { singleton: true, requiredVersion: false },
      }
    })
  ],
  build: {
    target: 'esnext',
    cssCodeSplit: false
  },
  server: { port: 5005, cors: true },
  preview: {
    port: 5005,
    strictPort: true,
    cors: true
  }
})
