export default {
  path: 'audit-logs',
  children: [
    {
      path: '',
      component: () => import('./list/index.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: ':id',
      component: () => import('./operation/index.vue'),
      meta: { requiresAuth: true },
    },
  ],
};
