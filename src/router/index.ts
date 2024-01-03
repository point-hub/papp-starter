import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../layouts/app.vue'),
      children: [
        {
          path: '',
          redirect: '/app1a/home'
        }
      ]
    },
    {
      path: '/app1a',
      component: () => import('../layouts/app.vue'),
      children: [
        {
          path: '',
          redirect: '/app1a/home'
        },
        {
          path: 'home',
          component: () => import('@/pages/home.vue')
        },
        {
          path: 'websocket',
          component: () => import('@/pages/websocket.vue')
        },
        {
          path: 'nested/page-1',
          component: () => import('@/pages/nested/page-1.vue')
        },
        {
          path: 'nested/page-2',
          component: () => import('@/pages/nested/page-2.vue')
        }
      ]
    },
    {
      path: '/app1b',
      component: () => import('../layouts/app.vue'),
      children: [
        {
          path: '',
          redirect: '/app1b/home'
        },
        {
          path: 'home',
          component: () => import('@/pages/home.vue')
        }
      ]
    }
  ]
})

export default router
