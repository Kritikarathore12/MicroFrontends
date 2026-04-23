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
      remotes: {
        react_shared_ui: 'http://localhost:5005/assets/remoteEntry.js',
      },
      shared: {
        'react': { singleton: true, requiredVersion: '^19.2.4', strictVersion: true },
        'react-dom': { singleton: true, requiredVersion: '^19.2.4', strictVersion: true },
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