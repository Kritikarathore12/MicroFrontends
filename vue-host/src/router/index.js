import { createRouter, createWebHistory } from 'vue-router'
import LoginWrapper from '../components/LoginWrapper.vue'
import SignupWrapper from '../components/SignupWrapper.vue'
import ProfileWrapper from '../components/ProfileWrapper.vue'
import DashboardWrapper from '../components/DashboardWrapper.vue'

import { bridge } from '../utils/bridge-client'

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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to) => {
  bridge.init()
  const jwt = await bridge.getItem('jwt_token')

  if (to.meta.requiresAuth && !jwt) {
    return '/login';
  } else if (to.meta.guestOnly && jwt) {
    return '/dashboard';
  }
})


export default router