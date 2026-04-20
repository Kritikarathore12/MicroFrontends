<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { bridge } from './utils/bridge-client'

const router = useRouter()
const jwtToken = ref(null)
const reactMessage = ref('')
const hostInput = ref('')
const loading = ref(true) // Only for the initial session sync
const notification = ref(null)
let unsubscribeBroadcast = null

onMounted(async () => {
  bridge.init()
  // Initial one-time session check — this is the ONLY time we show the loader
  const token = await bridge.getItem('jwt_token')
  jwtToken.value = token
  loading.value = false

  // FIX 3: Store the unsubscribe function
  unsubscribeBroadcast = bridge.onBroadcast((eventName, detail) => {
    if (eventName === 'DashboardToHost') {
      reactMessage.value = detail
    } else if (eventName === 'GLOBAL_ALERT') {
      showNotification(detail)
    } else if (eventName === 'USER_LOGOUT') {
      if (jwtToken.value) {
        jwtToken.value = null
        reactMessage.value = ''
        router.push('/login')
      }
    } else if (eventName === 'NAVIGATE') {
      // Fix 9: React MFEs can trigger Vue Router navigation (e.g. "Sign in" / "Sign up" links)
      router.push(detail)
    }
  })

})

// FIX 3: Clean up listener when the component is destroyed
onUnmounted(() => {
  if (unsubscribeBroadcast) unsubscribeBroadcast()
})

const showNotification = (msg) => {
  notification.value = msg
  setTimeout(() => notification.value = null, 4000)
}

// FIX 6: No loading spinner for login/logout — only update state and navigate
const handleLogin = async (token) => {
  await bridge.setItem('jwt_token', token)
  jwtToken.value = token
  router.push('/dashboard')
}

const handleLogout = async () => {
  await bridge.removeItem('jwt_token')
  bridge.broadcast('USER_LOGOUT', true)
  jwtToken.value = null
  reactMessage.value = ''
  router.push('/login')
}

const sendToDashboard = () => {
  if (!hostInput.value.trim()) return
  bridge.broadcast('HostToDashboard', hostInput.value)
  hostInput.value = ''
}
</script>



<template>
  <div style="background-color: #0b1020; min-height: 100vh; color: white; display: flex; flex-direction: column;">
    
    <!-- Global Notification System -->
    <transition name="fade">
      <div v-if="notification" style="position: fixed; top: 20px; left: 50%; transform: translateX(-50%); background: #3b82f6; color: white; padding: 12px 24px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); z-index: 1000; font-weight: 600; display: flex; align-items: center; gap: 10px;">
        <span style="font-size: 20px;">🔔</span> {{ notification }}
      </div>
    </transition>

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
      <div v-if="loading" style="display: flex; flex-direction: column; align-items: center; gap: 20px; margin-top: 100px; color: #94a3b8;">
        <div class="loader"></div>
        <p style="font-weight: 500; letter-spacing: 1px;">Synchronizing Session...</p>
      </div>
      <div v-else style="width: 100%; max-width: 1200px;">
        <router-view :onLogin="handleLogin" :token="jwtToken" />
      </div>
    </main>

  </div>
</template>

<style>
.loader {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  border-top-color: #3b82f6;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -20px) !important;
}

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