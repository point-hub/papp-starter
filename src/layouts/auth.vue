<script setup lang="ts">
import AuthFooter from '../components/auth-footer.vue';
import AuthHeader from '../components/auth-header.vue';
</script>

<template>
  <div class="auth-layout">
    <component :is="AuthHeader" />
    <router-view />
    <component :is="AuthFooter" />
  </div>
</template>

<style scoped lang="postcss">
.auth-layout {
  @apply flex flex-col gap-6 items-center justify-center container mx-auto py-16;
}
</style>
