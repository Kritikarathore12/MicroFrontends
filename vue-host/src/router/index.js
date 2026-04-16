import { createRouter, createWebHistory } from 'vue-router'
import LoginWrapper from '../components/LoginWrapper.vue'
import SignupWrapper from '../components/SignupWrapper.vue'
import ProfileWrapper from '../components/ProfileWrapper.vue'
import DashboardWrapper from '../components/DashboardWrapper.vue'

const routes = [
  {
    path: '/',
    component: LoginWrapper,
  },
  {
    path: '/signup',
    component: SignupWrapper,
  },
  {
    path: '/profile',
    component: ProfileWrapper,
  },
  {
    path: '/dashboard',
    component: DashboardWrapper,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router