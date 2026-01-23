<script setup lang="ts">
import { useRoute } from 'vue-router';

import AppBreadcrumb, { type IBreadcrumb } from '@/components/app-breadcrumb.vue';

const route = useRoute();

const breadcrumbs: IBreadcrumb[] = [
  { name: 'Home', path: '/' },
  { name: 'Administrator', path: '/administrator' },
  { name: 'Audit Logs', path: '/administrator/audit-logs'  },
  { name: `${route.params.id}` },
];
</script>

<template>
  <app-breadcrumb :breadcrumbs="breadcrumbs" />
</template>
