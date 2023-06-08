<script setup lang="ts">
import { ref } from 'vue'
import { BaseDropdown } from '@/components/index'
import ComponentNotification from './component-notification.vue'
import ComponentToggleSidebar from './component-toggle-sidebar.vue'
import { appName } from '@/config/app'

const htmlTag = document.getElementsByTagName('html')[0]
const isDarkMode = ref(htmlTag.classList.contains('dark'))

function toggleDarkMode() {
  if (htmlTag.classList.contains('dark')) {
    htmlTag.classList.remove('dark')
    localStorage.setItem('dark-mode', 'light')
  } else {
    htmlTag.classList.add('dark')
    localStorage.setItem('dark-mode', 'dark')
  }

  isDarkMode.value = htmlTag.classList.contains('dark')
}
</script>

<template>
  <!-- Header Wrapper-->
  <nav class="header">
    <!-- Header  -->
    <div class="relative w-full flex">
      <div class="w-full flex items-center justify-between">
        <!-- Left: Sidebar Toggle Button -->
        <div class="flex">
          <component :is="ComponentToggleSidebar" class="pr-4" />
          <h1 class="text-base font-extrabold lg:text-lg">{{ appName }}</h1>
        </div>

        <!-- Right: Header Buttons -->
        <div class="flex items-center space-x-2">
          <component :is="ComponentNotification" />

          <component :is="BaseDropdown">
            <template #trigger>
              <div
                class="relative max-w-75 w-full flex cursor-pointer items-center rounded-lg py-2 pl-3 text-left lg:min-w-50 space-x-2 focus-visible:border-indigo-500 sm:text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-orange-300"
              >
                <div class="avatar avatar-xs">
                  <img class="mask mask-squircle" src="https://via.placeholder.com/150" />
                </div>
                <div class="hidden lg:block">
                  <span class="block">John Doe</span>
                  <span class="block text-xs">Admin Purchasing</span>
                </div>
              </div>
            </template>
            <div class="p-1">
              <div class="flex items-center gap-2 p-2">
                <i class="i-far-circle-user block"></i>
                <span>Profile</span>
              </div>
              <div class="flex items-center gap-2 p-2">
                <i class="i-far-gear block"></i>
                <span>Setting</span>
              </div>
            </div>
            <div class="p-1">
              <button
                @click="toggleDarkMode()"
                class="w-full flex items-center rounded-md px-2 py-2 text-sm space-x-2"
              >
                <i v-if="isDarkMode" class="i-ph-sun block"></i>
                <i v-else class="i-ph-moon-fill block"></i>
                <span>Dark Mode</span>
              </button>
            </div>
            <div class="p-1">
              <div class="flex items-center gap-2 p-2">
                <i class="i-far-power-off block"></i>
                <span>Logout</span>
              </div>
            </div>
          </component>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
nav.header {
  @apply fixed top-0 flex w-full h-60px z-20 px-4 bg-white dark:bg-slate-900 shadow;
}

.is-sidebar-open nav.header {
  @apply lg:w-[calc(100%-(var(--sidebar-shortcut-width)+var(--sidebar-panel-width)))] lg:ml-[calc(var(--sidebar-shortcut-width)+var(--sidebar-panel-width))] duration-200;
}
</style>
