import { createRouter, createWebHistory } from 'vue-router'
import LoginWrapper from '../components/LoginWrapper.vue'
import SignupWrapper from '../components/SignupWrapper.vue'

const routes = [
  {
    path: '/',
    component: LoginWrapper,
  },
  {
    path: '/signup',
    component: SignupWrapper,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router