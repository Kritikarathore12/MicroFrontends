import { createRouter, createWebHistory } from 'vue-router'
import LoginWrapper from '../components/LoginWrapper.vue'
import SignupWrapper from '../components/SignupWrapper.vue'
import ProfileWrapper from '../components/ProfileWrapper.vue'
import DashboardWrapper from '../components/DashboardWrapper.vue'

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

router.beforeEach((to, from) => {
  const jwt = localStorage.getItem('jwt_token');

  if (to.meta.requiresAuth && !jwt) {
    // Needs authentication, but token is missing
    return '/login';
  } else if (to.meta.guestOnly && jwt) {
    // Logged in users shouldn't see login/signup pages
    return '/dashboard';
  }
  // Proceed normally (returning undefined/true both work)
})

export default router