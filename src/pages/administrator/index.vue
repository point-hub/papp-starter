<script setup lang="ts">
import { onMounted, ref } from 'vue';

import AppMenu, { type IMenu } from '@/components/app-menu.vue';

const breadcrumbs = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Administrator',
  },
];

const menus = ref<IMenu[]>([]);

onMounted(() => {
  menus.value.push({ name: 'Audit Logs', path: '/administrator/audit-logs', icon: 'i-fa7-solid:file-magnifying-glass' });
});
</script>

<template>
  <app-menu :breadcrumbs="breadcrumbs" v-model:menus="menus" />
</template>
