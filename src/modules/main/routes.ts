export const routes = {
  path: '/',
  component: () => import('@/layouts/app/app-index.vue'),
  children: [
    {
      path: '',
      component: () => import('./views/page-index.vue')
    },
    {
      path: 'dashboard',
      component: () => import('./views/page-dashboard.vue')
    },
    {
      path: 'page-1',
      component: () => import('./views/page-1.vue')
    },
    {
      path: 'page-2',
      component: () => import('./views/page-2.vue')
    },
    {
      path: 'nested',
      children: [
        {
          path: 'page-nested-1',
          component: () => import('./views/nested/page-nested-1.vue')
        },
        {
          path: 'page-nested-2',
          component: () => import('./views/nested/page-nested-2.vue')
        }
      ]
    }
  ]
}
