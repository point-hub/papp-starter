<script setup lang="ts">
import { useRoute } from 'vue-router';

import AppBreadcrumb, { type IBreadcrumb } from '@/components/app-breadcrumb.vue';

const route = useRoute();

const breadcrumbs: IBreadcrumb[] = [
  { name: 'Home', path: '/' },
  { name: 'Master', path: '/master' },
  { name: 'Examples', path: '/master/examples' },
  { name: `${route.params.id}`, path: `/master/examples/${route.params.id}` },
  { name: 'Edit' },
];
</script>

<template>
  <app-breadcrumb :breadcrumbs="breadcrumbs" />
</template>
