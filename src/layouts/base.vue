<script setup lang="ts">
import { RouterView } from 'vue-router'
import BaseHeader from '@/components/base-header.vue'
</script>

<template>
  <component :is="BaseHeader" />
  <RouterView />
</template>

<style scoped></style>
