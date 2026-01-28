<script setup lang="ts">
import { onMounted, ref } from 'vue';

import AppMenu, { type IMenu } from '@/components/app-menu.vue';
import { useAuthStore } from '@/stores/auth.store';

const breadcrumbs = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Master',
  },
];

const authStore = useAuthStore();
const menus = ref<IMenu[]>([]);

onMounted(() => {
  if (authStore.hasPermissions(['users:module'])) {
    menus.value.push({ name: 'Users', path: '/master/users', icon: 'i-fa7-solid:address-card' });
  }
  if (authStore.hasPermissions(['roles:module'])) {
    menus.value.push({ name: 'Roles', path: '/master/roles', icon: 'i-fa7-solid:user-gear' });
  }
  if (authStore.hasPermissions(['examples:module'])) {
    menus.value.push({ name: 'Examples', path: '/master/examples', icon: 'i-fa7-solid:books' });
  }
});
</script>

<template>
  <app-menu :breadcrumbs="breadcrumbs" v-model:menus="menus" />
</template>
