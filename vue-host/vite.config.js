import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [
      vue(),
      federation({
        name: 'vue_host',
        remotes: {
          react_login:    `${env.VITE_LOGIN_URL}/assets/remoteEntry.js`,
          react_signup:   `${env.VITE_SIGNUP_URL}/assets/remoteEntry.js`,
          react_profile:  `${env.VITE_PROFILE_URL}/assets/remoteEntry.js`,
          react_dashboard:`${env.VITE_DASHBOARD_URL}/assets/remoteEntry.js`,
          react_shared_ui:`${env.VITE_SHARED_UI_URL}/assets/remoteEntry.js`,
        },
      shared: {
        'vue':       { singleton: true, requiredVersion: false },
        'react': { singleton: true, requiredVersion: false },
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
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },
  preview: {
    port: 5173,
    strictPort: true,
    cors: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },
  build: {
    target: 'esnext',
    cssCodeSplit: false
  },
  }
})