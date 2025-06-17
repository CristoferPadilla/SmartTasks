import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import DASHBOARD from '../layouts/DASHBOARD.vue'
import TasksLayout from '../layouts/TasksLayout.vue'
import ProjectsLayout from '../layouts/ProjectsLayout.vue'
import TeamLayout from '../layouts/TeamLayout.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { requiresAuth: false }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: { requiresAuth: false }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../layouts/DASHBOARD.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: () => import('../layouts/TasksLayout.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('../layouts/ProjectsLayout.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/team',
    name: 'team',
    component: () => import('../layouts/TeamLayout.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Guardia de navegación
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    // Si la ruta requiere autenticación y el usuario no está autenticado
    next('/login')
  } else if (to.path === '/login' && isAuthenticated) {
    // Si el usuario está autenticado e intenta acceder al login
    next('/dashboard')
  } else {
    // En cualquier otro caso, permitir la navegación
    next()
  }
})

export default router 