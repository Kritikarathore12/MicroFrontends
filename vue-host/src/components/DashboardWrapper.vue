<!-- FILE PURPOSE: A Vue wrapper specifically designed to fetch and display the React Dashboard micro-frontend. -->
<template>
  <div style="width: 100%; min-height: 400px; position: relative;">
    <!-- Skeleton Loader -->
    <div v-if="loading" class="skeleton-container">
      <div class="skeleton-header"></div>
      <div class="skeleton-banner"></div>
      <div class="skeleton-grid">
        <div class="skeleton-card" v-for="i in 3" :key="i"></div>
      </div>
    </div>

    <!-- Error State -->
    <div v-if="error" class="error-block">
      <div style="font-size: 40px; margin-bottom: 15px;">🔌</div>
      <h3>Micro-frontend Offline</h3>
      <p>The Dashboard service is currently unavailable. Please ensure port 5004 is running.</p>
      <button @click="retryLoad" class="retry-btn">Retry Connection</button>
    </div>

    <!-- Mounted React Component -->
    <div ref="container" v-show="!loading && !error"></div>
  </div>
</template>

<script>
import React from 'react'
import { createRoot } from 'react-dom/client'

export default {
  props: ['token'],
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
  watch: {
    token() {
      this._render()
    }
  },
  methods: {
    // Asynchronously fetches the React remote component and injects it into the Vue DOM
    async loadRemote(retries = 3, delay = 1000) {
      this.loading = true
      this.error = false
      for (let i = 0; i < retries; i++) {
        try {
          const module = await import('react_dashboard/Dashboard')
          this._Component = module.default
          if (!this._root) {
            this._root = createRoot(this.$refs.container)
          }
          this._render()
          this.loading = false
          return
        } catch (err) {
          if (i === retries - 1) {
            console.error('Failed to load Dashboard remote:', err)
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
        this._root.render(React.createElement(this._Component, { token: this.token }))
      }
    }
  },
  beforeUnmount() {
    if (this._root) this._root.unmount()
  }
}
</script>

<style scoped>
.skeleton-container {
  padding: 40px;
  background: rgba(255,255,255,0.02);
  border-radius: 24px;
}
.skeleton-header {
  width: 300px;
  height: 40px;
  background: rgba(255,255,255,0.05);
  border-radius: 8px;
  margin-bottom: 20px;
  animation: pulse 1.5s infinite;
}
.skeleton-banner {
  height: 80px;
  background: rgba(255,255,255,0.03);
  border-radius: 12px;
  margin-bottom: 30px;
  animation: pulse 1.5s infinite 0.2s;
}
.skeleton-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.skeleton-card {
  height: 150px;
  background: rgba(255,255,255,0.05);
  border-radius: 16px;
  animation: pulse 1.5s infinite 0.4s;
}

@keyframes pulse {
  0% { opacity: 0.3; }
  50% { opacity: 0.1; }
  100% { opacity: 0.3; }
}

.error-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px;
  background: rgba(239, 68, 68, 0.05);
  border: 1px dashed rgba(239, 68, 68, 0.3);
  border-radius: 24px;
  color: #f87171;
  text-align: center;
}

.retry-btn {
  margin-top: 20px;
  padding: 10px 25px;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 600;
}
</style>

