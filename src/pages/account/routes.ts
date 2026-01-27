export default {
  path: 'account',
  children: [
    {
      path: '',
      component: () => import('./index.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: 'profile',
      component: () => import('./profile/index.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: 'email',
      component: () => import('./email/index.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: 'username',
      component: () => import('./username/index.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: 'password',
      component: () => import('./password/index.vue'),
      meta: { requiresAuth: true },
    },
  ],
};
