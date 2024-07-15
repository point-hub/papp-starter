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
