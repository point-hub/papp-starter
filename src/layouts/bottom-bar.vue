<script setup lang="ts">
import { computed, ref } from 'vue';
import { onBeforeRouteLeave, useRouter } from 'vue-router';

import { useAuthStore } from '@/stores/auth.store';

type MenuAction =
  | 'more'
  | 'signout';

interface IMenuItem {
  label: string;
  icon: string;
  to?: string;
  action?: MenuAction;
  badge?: boolean;
  exact?: boolean;
}

const authStore = useAuthStore();
const router = useRouter();
const showMenu = ref(false);
const unreadCount = ref(1);

const desktopMenuItems: IMenuItem[] = [
  { label: 'Home', icon: 'i-fa7-duotone:house', to: '/mobile', exact: true },
  { label: 'Mobile Sidebar', icon: 'i-fa7-duotone:sidebar', to: '/mobile-sidebar' },
  { label: 'Mobile Aside', icon: 'i-fa7-duotone:sidebar-flip', to: '/mobile-aside' },
  { label: 'Mobile Sidebar Aside', icon: 'i-fa7-duotone:columns-3', to: '/mobile-sidebar-aside' },
  { label: 'Notifications', icon: 'i-fa7-duotone:bell', to: '/notifications', badge: true },
];

const mobileMoreItems = computed<IMenuItem[]>(() => [
  { label: 'Mobile Sidebar Aside', icon: 'i-fa7-duotone:columns-3', to: '/mobile-sidebar-aside' },
  ...(authStore.authUser
    ? [
      { label: 'Sign Out', icon: 'i-fa7-duotone:left-to-bracket', action: 'signout' as const },
    ]
    : [
      { label: 'Register', icon: 'i-fa7-duotone:pen-to-square', to: '/signup' },
      { label: 'Sign In', icon: 'i-fa7-duotone:right-to-bracket', to: '/signin' },
    ]),
]);

const bottomMenuItems: IMenuItem[] = [
  { label: 'Home', icon: 'i-fa7-duotone:house', to: '/mobile', exact: true },
  { label: 'Mobile Sidebar', icon: 'i-fa7-duotone:sidebar', to: '/mobile-sidebar' },
  { label: 'Mobile Aside', icon: 'i-fa7-duotone:sidebar-flip', to: '/mobile-aside' },
  { label: 'Notifications', icon: 'i-fa7-duotone:bell', to: '/notifications', badge: true },
  { label: 'More', icon: 'i-lucide-menu', action: 'more' },
];

const closeAllMenus = () => {
  showMenu.value = false;
};

const handleMenuAction = (action: MenuAction) => {
  switch (action) {

  case 'more':
    showMenu.value = !showMenu.value;
    break;

  case 'signout':
    void onSignout();
    break;
  }
};

const onSignout = async () => {
  await authStore.signout();
  await router.push('/signin');
  closeAllMenus();
};

const onNavigate = () => {
  closeAllMenus();
};

onBeforeRouteLeave(closeAllMenus);
</script>

<template>
  <div class="flex min-h-svh max-w-screen overflow-x-hidden bg-white font-open-sans text-gray-900 dark:bg-slate-900 dark:text-slate-100">
    <!-- Desktop Sidebar -->
    <nav class="fixed z-20 hidden h-screen w-64 flex-col border-r border-gray-200 bg-white dark:border-slate-700 dark:bg-slate-800 lg:flex">
      <div class="flex items-center justify-between border-b border-gray-100 p-4 dark:border-slate-700 text-lg font-bold">
        <div class="p-0.5">
          <img
            src="https://assets.pointhub.net/assets/images/logo/primary/logo.png"
            alt="Pointhub"
            class="h-6"
          >
        </div>
      </div>

      <div class="flex flex-col space-y-1 overflow-y-auto px-2 py-4">
        <template v-for="item in desktopMenuItems" :key="item.label">
          <router-link
            v-if="item.to"
            :to="item.to"
            class="flex items-center gap-2 rounded-lg px-2 py-2.5 hover:bg-gray-100 dark:hover:bg-slate-700"
            active-class="font-extrabold"
            :exact-active-class="item.exact ? 'font-extrabold' : ''"
            @click="onNavigate"
          >
            <div class="relative shrink-0">
              <div :class="[item.icon, 'text-2xl']" />
              <span
                v-if="item.badge && unreadCount > 0"
                class="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-red-500"
              />
            </div>

            <span>{{ item.label }}</span>
          </router-link>

          <button
            v-else
            class="flex items-center gap-2 rounded-lg px-2 py-2.5 text-left hover:bg-gray-100 dark:hover:bg-slate-700"
            @click="item.action && handleMenuAction(item.action)"
          >
            <div class="relative shrink-0">
              <div :class="[item.icon, 'text-2xl']" />
              <span
                v-if="item.badge && unreadCount > 0"
                class="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-red-500"
              />
            </div>

            <span>{{ item.label }}</span>
          </button>
        </template>
      </div>

      <div v-if="authStore.authUser" class="mt-auto border-t border-gray-200 p-4 dark:border-slate-700">
        <button
          class="flex w-full items-center gap-2 rounded-lg bg-red-400 px-2 py-2.5 font-bold text-white hover:bg-red-500"
          @click="onSignout"
        >
          <div class="i-fa7-duotone:left-to-bracket text-2xl" />
          <span>Sign Out</span>
        </button>
      </div>

      <div v-if="!authStore.authUser" class="flex flex-col gap-2 border-t border-gray-200 dark:border-slate-700 p-4">
        <router-link
          to="/signup"
          class="flex items-center gap-2 rounded-lg bg-slate-500 px-2 py-2.5 font-bold text-white hover:bg-slate-600"
          @click="onNavigate"
        >
          <div class="i-fa7-duotone:pen-to-square text-2xl" />
          <span>Register</span>
        </router-link>

        <router-link
          to="/signin"
          class="flex items-center gap-2 rounded-lg bg-blue-500 px-2 py-2.5 font-bold text-white hover:bg-blue-600"
          @click="onNavigate"
        >
          <div class="i-fa7-duotone:right-to-bracket text-2xl" />
          <span>Sign In</span>
        </router-link>
      </div>
    </nav>

    <!-- Mobile More Options -->
    <Transition name="slide-up">
      <div
        v-if="showMenu"
        class="fixed inset-0 z-50 flex items-end justify-center bg-black/50"
        @click.self="showMenu = false"
      >
        <div class="menu-panel w-full max-w-xl rounded-t-2xl bg-white pb-[env(safe-area-inset-bottom,0px)] text-gray-900 dark:bg-slate-800 dark:text-slate-100">
          <div class="mb-2 flex items-center justify-between px-4 pt-4">
            <h3 class="text-sm font-semibold">
              More Options
            </h3>

            <button
              class="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-slate-700"
              aria-label="Close menu"
              @click="showMenu = false"
            >
              <div class="i-lucide-x text-xl" />
            </button>
          </div>

          <template v-for="item in mobileMoreItems" :key="item.label">
            <router-link
              v-if="item.to"
              :to="item.to"
              class="flex w-full items-center gap-2 border-b border-gray-100 px-4 py-3 hover:bg-gray-50 dark:border-slate-700 dark:hover:bg-slate-700"
              @click="onNavigate"
            >
              <div :class="[item.icon, 'text-2xl']" />
              <span>{{ item.label }}</span>
            </router-link>

            <button
              v-else
              class="flex w-full items-center gap-2 px-4 py-3 hover:bg-red-50 dark:hover:bg-red-950"
              @click="item.action && handleMenuAction(item.action)"
            >
              <div :class="[item.icon, 'text-2xl']" />
              <span>{{ item.label }}</span>
            </button>
          </template>
        </div>
      </div>
    </Transition>

    <!-- Main Content -->
    <main class="relative flex max-w-screen flex-1 bg-white pb-[calc(4rem+env(safe-area-inset-bottom,0px))] text-slate-900 dark:bg-slate-900 dark:text-slate-100 lg:ml-64 lg:pb-0">
      <router-view />
    </main>

    <!-- Mobile Bottom Navigation -->
    <nav class="fixed bottom-0 left-0 right-0 z-30 flex h-[calc(4rem+env(safe-area-inset-bottom,0px))] items-center justify-around border-t border-gray-200 bg-white pb-[env(safe-area-inset-bottom,0px)] shadow-2xl dark:border-slate-700 dark:bg-slate-800 lg:hidden">
      <template v-for="item in bottomMenuItems" :key="item.label">
        <router-link
          v-if="item.to"
          :to="item.to"
          :aria-label="item.label"
          @click="onNavigate"
        >
          <div class="relative">
            <div :class="[item.icon, 'text-2xl text-gray-700 dark:text-slate-100']" />

            <span
              v-if="item.badge && unreadCount > 0"
              class="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-red-500"
            />
          </div>
        </router-link>

        <button
          v-else
          :aria-label="item.label"
          @click="item.action && handleMenuAction(item.action)"
        >
          <div class="relative">
            <div :class="[item.icon, 'text-2xl text-gray-700 dark:text-slate-100']" />

            <span
              v-if="item.badge && unreadCount > 0"
              class="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-red-500"
            />
          </div>
        </button>
      </template>
    </nav>
  </div>

  <base-toast />
</template>
