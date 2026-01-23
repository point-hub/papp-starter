export default {
  path: 'users',
  children: [
    {
      path: '',
      component: () => import('./list/index.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: 'create',
      component: () => import('./create/index.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: ':id',
      component: () => import('./details/index.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: ':id/edit',
      component: () => import('./edit/index.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: ':id/histories',
      component: () => import('./histories/index.vue'),
      meta: { requiresAuth: true, permission: 'roles:read' },
    },
    {
      path: ':id/audits',
      component: () => import('./audits/index.vue'),
      meta: { requiresAuth: true, permission: 'audit-logs:read' },
    },
    {
      path: ':id/field-histories/:field',
      component: () => import('./field-histories/index.vue'),
      meta: { requiresAuth: true, permission: 'roles:read' },
    },
  ],
};
