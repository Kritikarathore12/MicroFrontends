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
        },
      shared: {
        'vue':       { singleton: true, requiredVersion: false },
        'react': { singleton: true, requiredVersion: '^19.2.4', strictVersion: true },
        'react-dom': { singleton: true, requiredVersion: '^19.2.4', strictVersion: true },
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
  }
})