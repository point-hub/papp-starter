import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../layouts/base.vue'),
      children: [
        {
          path: '',
          component: () => import('@/pages/home.vue')
        },
        {
          path: 'websocket',
          component: () => import('@/pages/websocket.vue')
        }
      ]
    }
  ]
})

export default router
