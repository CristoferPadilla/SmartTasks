import { createRouter, createWebHistory } from 'vue-router'
import DASHBOARD from '../layouts/DASHBOARD.vue'
import TasksLayout from '../layouts/TasksLayout.vue'
import ProjectsLayout from '../layouts/ProjectsLayout.vue'
import TeamLayout from '../layouts/TeamLayout.vue'

const routes = [
  {
    path: '/',
    component: DASHBOARD,
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('../views/DASHBOARD.vue')
      },
      {
        path: 'tareas',
        name: 'tasks',
        component: TasksLayout
      },
      {
        path: 'proyectos',
        name: 'projects',
        component: ProjectsLayout
      },
      {
        path: 'equipo',
        name: 'team',
        component: TeamLayout
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 