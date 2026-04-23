<!-- FILE PURPOSE: A Vue wrapper specifically designed to fetch and display the React Signup micro-frontend. -->
<template>
  <div style="width: 100%; min-height: 450px; position: relative; display: flex; justify-content: center; align-items: center;">
    <!-- Skeleton Loader -->
    <div v-if="loading" class="signup-skeleton">
      <div class="skeleton-title"></div>
      <div class="skeleton-input" v-for="i in 3" :key="i"></div>
      <div class="skeleton-btn"></div>
    </div>

    <!-- Error State -->
    <div v-if="error" class="error-block-compact">
      <div style="font-size: 32px;">🔌</div>
      <p>Signup Service Offline</p>
      <button @click="retryLoad" class="retry-btn-small">Retry</button>
    </div>

    <!-- Mounted React Component -->
    <div ref="container" v-show="!loading && !error" style="width: 100%;"></div>
  </div>
</template>

<script>
import React from 'react'
import { createRoot } from 'react-dom/client'

export default {
  props: ['onLogin'],
  data() {
    return { 
      _root: null, 
      _Component: null,
      loading: true,
      error: false
    }
  },
  async mounted() {
    await this.loadRemote()
  },
  methods: {
    // Asynchronously fetches the React remote component and injects it into the Vue DOM
    async loadRemote(retries = 3, delay = 1000) {
      this.loading = true
      this.error = false
      for (let i = 0; i < retries; i++) {
        try {
          const module = await import('react_signup/Signup')
          this._Component = module.default
          if (!this._root) {
            this._root = createRoot(this.$refs.container)
          }
          this._render()
          this.loading = false
          return
        } catch (err) {
          if (i === retries - 1) {
            console.error('Failed to load Signup remote:', err)
            this.error = true
            this.loading = false
          } else {
            await new Promise(r => setTimeout(r, delay * Math.pow(2, i)))
          }
        }
      }
    },
    retryLoad() {
      this.loadRemote()
    },
    _render() {
      if (this._root && this._Component) {
        this._root.render(React.createElement(this._Component, { onLogin: this.onLogin }))
      }
    }
  },
  beforeUnmount() {
    if (this._root) this._root.unmount()
  }
}
</script>

<style scoped>
.signup-skeleton {
  width: 100%;
  max-width: 420px;
  padding: 40px;
  background: rgba(255,255,255,0.03);
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.05);
}
.skeleton-title {
  height: 30px;
  width: 50%;
  background: rgba(255,255,255,0.05);
  margin: 0 auto 30px;
  border-radius: 4px;
  animation: pulse 1.5s infinite;
}
.skeleton-input {
  height: 45px;
  background: rgba(255,255,255,0.03);
  margin-bottom: 20px;
  border-radius: 8px;
  animation: pulse 1.5s infinite 0.2s;
}
.skeleton-btn {
  height: 45px;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 8px;
  animation: pulse 1.5s infinite 0.4s;
}

@keyframes pulse {
  0% { opacity: 0.3; }
  50% { opacity: 0.1; }
  100% { opacity: 0.3; }
}

.error-block-compact {
  padding: 30px;
  background: rgba(239, 68, 68, 0.05);
  border-radius: 16px;
  color: #f87171;
  text-align: center;
}

.retry-btn-small {
  margin-top: 10px;
  padding: 6px 20px;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  font-size: 13px;
}
</style>
