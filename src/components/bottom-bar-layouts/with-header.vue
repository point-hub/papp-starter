<script setup lang="ts">
import { ref } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';

withDefaults(defineProps<{
  pageTitle?: string;
  sidebarTitle?: string;
  asideTitle?: string;
  hasSidebar?: boolean;
  hasAside?: boolean;
}>(), {
  hasSidebar: true,
  hasAside: true,
});

const isSidebarOpen = ref(false);
const isAsideOpen = ref(false);

const closeDrawers = () => {
  isSidebarOpen.value = false;
  isAsideOpen.value = false;
};

const toggleSidebar = () => {
  isAsideOpen.value = false;
  isSidebarOpen.value = !isSidebarOpen.value;
};

const toggleAside = () => {
  isSidebarOpen.value = false;
  isAsideOpen.value = !isAsideOpen.value;
};

onBeforeRouteLeave(closeDrawers);
</script>

<template>
  <div class="min-h-svh w-full bg-gray-50 text-gray-900 dark:bg-slate-900 dark:text-slate-100">
    <!-- Mobile Header -->
    <header class="fixed inset-x-0 top-0 z-30 flex items-center justify-between border-b border-gray-200 bg-white/95 p-3 backdrop-blur dark:border-slate-700 dark:bg-slate-900/95 lg:hidden">
      <div class="flex w-10 shrink-0 justify-start">
        <button
          v-if="hasSidebar"
          class="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-slate-800"
          aria-label="Open sidebar"
          :aria-expanded="isSidebarOpen"
          @click="toggleSidebar"
        >
          <div class="i-fa7-light:bars text-2xl" />
        </button>
      </div>

      <h1 class="min-w-0 flex-1 truncate px-3 text-center font-bold">
        {{ pageTitle }}
      </h1>

      <div class="flex w-10 shrink-0 justify-end">
        <button
          v-if="hasAside"
          class="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-slate-800"
          aria-label="Open aside"
          :aria-expanded="isAsideOpen"
          @click="toggleAside"
        >
          <div class="i-fa7-light:sliders text-2xl" />
        </button>
      </div>
    </header>

    <!-- Mobile Overlay -->
    <div
      v-if="(hasSidebar && isSidebarOpen) || (hasAside && isAsideOpen)"
      class="fixed inset-0 z-40 bg-black/50 lg:hidden"
      aria-hidden="true"
      @click="closeDrawers"
    />

    <div
      class="flex min-h-svh w-full pt-14 lg:pt-0"
      :class="{
        'lg:pl-0': !hasSidebar,
        'lg:pr-0': !hasAside,
      }"
    >
      <!-- Left Sidebar -->
      <aside
        v-if="hasSidebar"
        class="fixed inset-y-0 left-0 z-50 flex w-72 flex-col overflow-y-auto border-r border-gray-200 bg-white transition-transform duration-300 dark:border-slate-700 dark:bg-slate-800 lg:sticky lg:top-0 lg:z-10 lg:h-svh lg:w-64 lg:shrink-0 lg:translate-x-0"
        :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
      >
        <div class="flex items-center justify-between border-b border-gray-100 p-4 dark:border-slate-700">
          <h2 class="text-lg font-bold">
            {{ sidebarTitle }}
          </h2>

          <button
            class="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-slate-700 lg:hidden"
            aria-label="Close sidebar"
            @click="closeDrawers"
          >
            <div class="i-fa7-light:close text-xl" />
          </button>
        </div>

        <div @click="closeDrawers">
          <slot name="sidebar" />
        </div>
      </aside>

      <!-- Main Content -->
      <main class="min-w-0 flex-1 bg-white dark:bg-slate-900">
        <div class="mx-auto w-full max-w-6xl">
          <h1 class="hidden text-lg font-bold lg:block flex items-center justify-between border-b border-gray-100 p-4 dark:border-slate-700">
            {{ pageTitle }}
          </h1>
          <div class="p-4">
            <slot />
          </div>
        </div>
      </main>

      <!-- Right Aside -->
      <aside
        v-if="hasAside"
        class="fixed inset-y-0 right-0 z-50 flex w-80 flex-col overflow-y-auto border-l border-gray-200 bg-white transition-transform duration-300 dark:border-slate-700 dark:bg-slate-800 lg:sticky lg:top-0 lg:z-10 lg:h-svh lg:w-72 lg:shrink-0 lg:translate-x-0"
        :class="isAsideOpen ? 'translate-x-0' : 'translate-x-full'"
      >
        <div class="flex items-center justify-between border-b border-gray-100 p-4 dark:border-slate-700">
          <h2 class="text-lg font-bold">
            {{ asideTitle }}
          </h2>

          <button
            class="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-slate-700 lg:hidden"
            aria-label="Close aside"
            @click="closeDrawers"
          >
            <div class="i-fa7-light:close text-xl" />
          </button>
        </div>

        <div @click="closeDrawers">
          <slot name="aside" />
        </div>
      </aside>
    </div>
  </div>
</template>