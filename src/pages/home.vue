<script setup lang="ts">
import { onMounted, ref } from 'vue';

import AppMenu, { type IMenu } from '@/components/app-menu.vue';

const breadcrumbs = [
  {
    name: 'Home',
    path: '/',
  },
];


const menus = ref<IMenu[]>([]);

onMounted(() => {
  menus.value.push({ name: 'Master', path: '/master', icon: 'i-fa7-solid:address-card' });
  menus.value.push({ name: 'Administrator', path: '/administrator', icon: 'i-fa7-solid:folder-gear' });
});
</script>

<template>
  <app-menu :breadcrumbs="breadcrumbs" v-model:menus="menus" />
</template>
