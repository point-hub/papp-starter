import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../layouts/app.vue'),
      children: [
        {
          path: '',
          redirect: '/home'
        },
        {
          path: 'home',
          component: () => import('@/pages/home.vue')
        },
        {
          path: 'api',
          component: () => import('@/pages/api.vue')
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
      path: '/unauthorized',
      name: 'unauthorized',
      component: () => import('@/pages/403.vue')
    },
    {
      path: '/:catchAll(.*)', // This handles all unknown routes
      name: 'not-found',
      component: () => import('@/pages/404.vue')
    }
  ]
})

export default router
