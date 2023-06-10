<script setup lang="ts">
import { useSidebarStore } from '@/stores/sidebar'

const sidebarStore = useSidebarStore()

const toggleSidebar = () => {
  sidebarStore.toggleSidebar()
}
</script>

<template>
  <button @click="toggleSidebar()">
    <div v-if="!sidebarStore.isSidebarOpen">
      <i class="i-fas-bars block"></i>
    </div>
    <div v-if="sidebarStore.isSidebarOpen">
      <i class="i-fas-angle-left block"></i>
    </div>
  </button>
</template>
