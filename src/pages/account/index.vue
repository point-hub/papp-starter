<script setup lang="ts">
import { onMounted, ref } from 'vue';

import AppMenu, { type IMenu } from '@/components/app-menu.vue';

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Account' },
];


const menus = ref<IMenu[]>([]);

onMounted(() => {
  menus.value.push({ name: 'Profile', path: '/account/profile', icon: 'i-fa7-solid:address-card' });
  menus.value.push({ name: 'Email', path: '/account/email', icon: 'i-fa7-solid:at' });
  menus.value.push({ name: 'Username', path: '/account/username', icon: 'i-fa7-solid:pen-field' });
  menus.value.push({ name: 'Password', path: '/account/password', icon: 'i-fa7-solid:lock' });
});
</script>

<template>
  <app-menu :breadcrumbs="breadcrumbs" v-model:menus="menus" />
</template>
