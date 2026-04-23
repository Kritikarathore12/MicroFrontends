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
        'react': { singleton: true, requiredVersion: '^19.2.4', strictVersion: true },
        'react-dom': { singleton: true, requiredVersion: '^19.2.4', strictVersion: true },
      }
    })
  ],
  build: {
    target: 'esnext'
  },
  server: { port: 5005, cors: true },
  preview: {
    port: 5005,
    strictPort: true,
    cors: true
  }
})
