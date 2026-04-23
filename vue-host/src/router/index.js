// FILE PURPOSE: Configures URLs and manages access control (e.g., kicking logged-out users back to login).
import { createRouter, createWebHistory } from 'vue-router'
import LoginWrapper from '../components/LoginWrapper.vue'
import SignupWrapper from '../components/SignupWrapper.vue'
import ProfileWrapper from '../components/ProfileWrapper.vue'
import DashboardWrapper from '../components/DashboardWrapper.vue'
import ChaitanyaWrapper from '../components/ChaitanyaWrapper.vue'

import { eventBus } from '../utils/event-bus'

const routes = [
  { path: '/', redirect: '/login' },
  { 
    path: '/login', 
    component: LoginWrapper,
    meta: { guestOnly: true }
  },
  { 
    path: '/signup', 
    component: SignupWrapper,
    meta: { guestOnly: true }
  },
  { 
    path: '/profile', 
    component: ProfileWrapper,
    meta: { requiresAuth: true }
  },
  { 
    path: '/dashboard', 
    component: DashboardWrapper,
    meta: { requiresAuth: true }
  },
  {
    path: '/chaitanya',
    component: ChaitanyaWrapper
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Intercepts navigation to enforce route protection based on the user's authentication status
router.beforeEach(async (to) => {
  
  let isAuthenticated = false
  try {
    const res = await fetch('/api/auth/me')
    const data = await res.json()
    if (data.user) isAuthenticated = true
  } catch (err) {
    isAuthenticated = false
  }

  if (to.meta.requiresAuth && !isAuthenticated) {
    return '/login';
  } else if (to.meta.guestOnly && isAuthenticated) {
    return '/dashboard';
  }
})


export default router
