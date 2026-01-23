import auditLogRoutes from './audit-logs/routes';

export default {
  path: 'administrator',
  children: [
    {
      path: '',
      component: () => import('./index.vue'),
      meta: { requiresAuth: true },
    },
    auditLogRoutes,
  ],
};
