<script setup lang="ts">
import {
  useDarkMode,
  useMobileBreakpoint,
  useSidebar,
  useSidebarMenuStore,
  useSidebarStore
} from '@point-hub/papp'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import { version } from '../../package.json'

const route = useRoute()

useSidebar()

const mobileBreakpoint = useMobileBreakpoint()
const sidebarStore = useSidebarStore()
const sidebarMenuStore = useSidebarMenuStore()
const { isDarkMode, toggleDarkMode } = useDarkMode()

// Sidebar
const appMenu = [
  {
    name: 'Application Name',
    path: '/',
    icon: 'https://assets.pointhub.net/assets/images/logo/primary/icon-rounded.png',
    menu: [
      {
        name: 'Home',
        path: '/home'
      },
      {
        name: 'API',
        path: '/api'
      },
      {
        name: 'Nested',
        submenu: [
          { name: 'Page 1', path: '/nested/page-1' },
          { name: 'Page 2', path: '/nested/page-2' }
        ],
        separator: true
      },
      {
        name: 'unocss.dev',
        path: 'https://unocss.dev/'
      },
      {
        name: 'fontawesome.com',
        path: 'https://fontawesome.com/search'
      },
      {
        name: 'iconify.design',
        path: 'https://icon-sets.iconify.design'
      },
      {
        name: 'icones',
        path: 'https://icones.js.org/'
      },
      {
        name: 'undraw.co',
        path: 'https://undraw.co/illustrations'
      },
      {
        name: 'vuejs.org',
        path: 'https://vuejs.org/'
      },
      {
        name: 'vitejs.dev',
        path: 'https://vitejs.dev/'
      }
    ]
  }
]
const appList = [
  {
    name: 'Application Name',
    path: 'https://www.example.com'
  }
]
sidebarMenuStore.setAppMenu(appMenu, appList)

// Header
const account = ref({
  organization: 'Organization',
  username: 'John Doe',
  avatar: 'https://placehold.co/150'
})

const organizations = ref([
  {
    name: 'Organization ABC',
    link: '?organization=abc'
  }
])

const onSignout = () => {
  // Handle signout
}

onMounted(() => {
  sidebarMenuStore.onChooseApp(route.path)
})
</script>

<template>
  <div class="app-layout">
    <!-- Header -->
    <app-header>
      <template #left-header>
        <header-sidebar-button
          :on-toggle-sidebar="sidebarStore.toggleSidebar"
          v-model:is-sidebar-open="sidebarStore.isSidebarOpen"
        />
      </template>
      <template #right-header>
        <header-notification></header-notification>
        <base-divider class="h-10" orientation="horizontal" />
        <header-menu
          :organization="account.organization"
          :username="account.username"
          :avatar="account.avatar"
        >
          <header-menu-account
            :organization="account.organization"
            :username="account.username"
            :avatar="account.avatar"
          />
          <base-divider orientation="vertical" />
          <header-menu-switch-organization :organizations="organizations" />
          <header-menu-dark-mode
            :on-toggle-dark-mode="toggleDarkMode"
            v-model:is-dark-mode="isDarkMode"
          />
          <header-menu-signout :on-signout="onSignout" />
        </header-menu>
      </template>
    </app-header>

    <!-- Sidebar -->
    <app-sidebar
      :title="sidebarMenuStore.choosenAppTitle"
      :apps="sidebarMenuStore.appMenu"
      :menus="sidebarMenuStore.appMenu[sidebarMenuStore.choosenAppIndex].menu ?? []"
      :is-sidebar-open="sidebarStore.isSidebarOpen"
      :is-mobile="mobileBreakpoint.isMobile()"
      @choose="sidebarMenuStore.onChooseApp"
    />

    <!-- Main Container -->
    <div class="main-container">
      <!-- Main Content -->
      <main class="main-content">
        <router-view></router-view>
      </main>

      <!-- Footer -->
      <app-footer :version="version" :year="2025" />
    </div>
  </div>
</template>

<style scoped lang="postcss">
.app-layout {
  @apply h-100vh w-full flex grow;
}

.main-container {
  @apply flex flex-col py-4 space-y-8 w-full transition-all duration-300;
}

.is-sidebar-open .main-container {
  @apply lg:w-[calc(100%-(var(--sidebar-panel-width)+var(--sidebar-menu-width)))] lg:ml-[calc(var(--sidebar-panel-width)+var(--sidebar-menu-width))];
}

.main-content {
  @apply mt-[60px] px-4 flex-1;
}

.main-content-header {
  @apply flex space-x-4 py-2 overflow-x-hidden;
}

.main-content-body {
  @apply flex flex-col space-y-5;
}
</style>
