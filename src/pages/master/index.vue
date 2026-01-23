<script setup lang="ts">
import { onMounted, ref } from 'vue';

import AppMenu, { type IMenu } from '@/components/app-menu.vue';

const breadcrumbs = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Master',
  },
];

const menus = ref<IMenu[]>([]);

onMounted(() => {
  menus.value.push({ name: 'Users', path: '/master/users', icon: 'i-fa7-solid:address-card' });
  menus.value.push({ name: 'Roles', path: '/master/roles', icon: 'i-fa7-solid:user-gear' });
  menus.value.push({ name: 'Examples', path: '/master/examples', icon: 'i-fa7-solid:books' });
});
</script>

<template>
  <app-menu :breadcrumbs="breadcrumbs" v-model:menus="menus" />
</template>
