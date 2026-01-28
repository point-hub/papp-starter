<script setup lang="ts">
import { onMounted, ref } from 'vue';

import AppMenu, { type IMenu } from '@/components/app-menu.vue';
import { useAuthStore } from '@/stores/auth.store';

const breadcrumbs = [
  {
    name: 'Home',
    path: '/',
  },
];

const authStore = useAuthStore();
const menus = ref<IMenu[]>([]);

onMounted(() => {
  if (authStore.hasPermissions(['master:module'])) { menus.value.push({ name: 'Master', path: '/master', icon: 'i-fa7-solid:address-card' }); }
  if (authStore.hasPermissions(['administrator:module'])) { menus.value.push({ name: 'Administrator', path: '/administrator', icon: 'i-fa7-solid:folder-gear' }); }
});
</script>

<template>
  <app-menu :breadcrumbs="breadcrumbs" v-model:menus="menus" />
</template>
