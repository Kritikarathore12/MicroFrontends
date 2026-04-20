<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const jwtToken = ref(localStorage.getItem('jwt_token'))
const reactMessage = ref('')
const hostInput = ref('')

// Watch for route changes to verify localStorage status (in case of manual deletion/addition)
watch(() => route.path, () => {
  jwtToken.value = localStorage.getItem('jwt_token')
})

const handleLogin = (token) => {
  jwtToken.value = token
  router.push('/dashboard')
}

const handleLogout = () => {
  localStorage.removeItem('jwt_token')
  jwtToken.value = null
  reactMessage.value = ''
  router.push('/login')
}

// Bi-Directional Event Bus Logistics
const handleDashMsg = (e) => reactMessage.value = e.detail

onMounted(() => {
  window.addEventListener('DashboardToHost', handleDashMsg)
})
onUnmounted(() => {
  window.removeEventListener('DashboardToHost', handleDashMsg)
})

const sendToDashboard = () => {
  if (!hostInput.value) return;
  window.dispatchEvent(new CustomEvent('HostToDashboard', { detail: hostInput.value }))
  hostInput.value = ''
}
</script>

<template>
  <div style="background-color: #0b1020; min-height: 100vh; color: white; display: flex; flex-direction: column;">
    
    <!-- Top Navigation -->
    <nav style="display: flex; align-items: center; justify-content: space-between; padding: 15px 40px; background: rgba(15, 23, 42, 0.9); backdrop-filter: blur(10px); border-bottom: 1px solid rgba(255,255,255,0.05); position: sticky; top: 0; z-index: 50;">
      
      <!-- Brand Area -->
      <div style="display: flex; align-items: center; gap: 10px;">
        <div style="width: 30px; height: 30px; background: linear-gradient(135deg, #00f2fe, #4facfe); border-radius: 8px;"></div>
        <h1 style="font-size: 1.2rem; font-weight: 700; margin: 0; letter-spacing: -0.5px;">Global Host</h1>
      </div>

      <!-- Navigation Links Container -->
      <div style="display: flex; gap: 15px; align-items: center;">
        
        <!-- Guest Links (Not Logged In) -->
        <template v-if="!jwtToken">
          <router-link to="/login" class="nav-pill" active-class="nav-pill-active">React Login</router-link>
          <router-link to="/signup" class="nav-pill" active-class="nav-pill-active">React Sign Up</router-link>
        </template>

        <!-- Authenticated Links (Logged In) -->
        <template v-else>
          <!-- Display message received from React -->
          <div v-if="reactMessage" style="color: #cbd5e1; font-size: 13px; margin-right: 15px; max-width: 250px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; background: rgba(59, 130, 246, 0.1); padding: 6px 12px; border-radius: 8px; border: 1px solid rgba(59, 130, 246, 0.3);" title="Message from React Dashboard">
            <strong style="color: #60a5fa;">React:</strong> {{ reactMessage }}
          </div>
          
          <!-- Send message to React -->
          <div style="display: flex; gap: 8px; margin-right: 15px;">
            <input v-model="hostInput" type="text" placeholder="Type message..." style="padding: 6px 12px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.2); background: rgba(0,0,0,0.2); color: white; outline: none; width: 140px; font-size: 13px;" @keyup.enter="sendToDashboard" />
            <button @click="sendToDashboard" class="nav-btn-action">Send to React</button>
          </div>

          <div style="color: #94a3b8; font-size: 14px; margin-right: 15px; margin-left: 10px;">
            Status: <span style="color: #4ade80; font-weight: 600;">Authenticated</span>
          </div>
          <router-link to="/dashboard" class="nav-pill" active-class="nav-pill-active">React Dashboard</router-link>
          <router-link to="/profile" class="nav-pill" active-class="nav-pill-active">React Profile</router-link>
          <button @click="handleLogout" class="nav-btn-logout">Logout</button>
        </template>

      </div>
    </nav>

    <!-- Main Content Area where Microfrontends mount -->
    <main style="flex: 1; display: flex; justify-content: center; align-items: flex-start; padding: 40px;">
      <div style="width: 100%; max-width: 1200px;">
        <router-view :onLogin="handleLogin" :token="jwtToken" />
      </div>
    </main>

  </div>
</template>

<style>
/* Base modern styles */
body {
  margin: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

/* Nav Pills Styling */
.nav-pill {
  color: #cbd5e1;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  padding: 8px 16px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.2s ease;
}

.nav-pill:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
}

.nav-pill-active {
  background: rgba(59, 130, 246, 0.15) !important;
  color: #60a5fa !important;
  border-color: rgba(59, 130, 246, 0.3) !important;
}

/* Logout Button */
.nav-btn-logout {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #f87171;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s ease;
}

.nav-btn-logout:hover {
  background: rgba(239, 68, 68, 0.2);
  color: #fca5a5;
}

/* Bi-Directional Action Button */
.nav-btn-action {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s ease;
}

.nav-btn-action:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style>