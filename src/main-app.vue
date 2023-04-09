<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="mx-auto container">
    <header class="py-5">
      <div>
        <nav class="flex space-x-3">
          <router-link to="/" class="inline-flex items-center">
            <i class="i-fasr-house block mr-1"></i> Home
          </router-link>
          <router-link class="inline-flex items-center" to="/about">
            <i class="i-fasr-user-secret block mr-1"></i> About
          </router-link>
        </nav>
      </div>
    </header>

    <RouterView />
  </div>
</template>

<style scoped></style>
