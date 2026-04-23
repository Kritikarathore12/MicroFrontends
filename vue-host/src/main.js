// FILE PURPOSE: Main entry point that bootstraps the Vue Host application and mounts it to the DOM.
// Main entry point for the Vue Host application that bootstraps the entire Micro-Frontend container
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
