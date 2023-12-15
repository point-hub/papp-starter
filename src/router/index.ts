import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../layouts/base.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/pages/home.vue')
        }
      ]
    }
  ]
})

export default router