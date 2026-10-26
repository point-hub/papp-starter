<script setup lang="ts">
import { computed, ref } from 'vue';

import LayoutsWithHeader from '@/components/bottom-bar-layouts/with-header.vue';

interface INotification {
  id: string;
  actorName: string;
  actorAvatar?: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

type NotificationTab = 'all' | 'unread';

const activeTab = ref<NotificationTab>('all');

const notifications = ref<INotification[]>([
  {
    id: '1',
    actorName: 'John Doe',
    message: 'cheered your goal.',
    createdAt: '5 minutes ago',
    isRead: false,
  },
  {
    id: '2',
    actorName: 'Jane Smith',
    message: 'commented on your progress.',
    createdAt: '1 hour ago',
    isRead: true,
  },
  {
    id: '3',
    actorName: 'Alex Brown',
    message: 'started supporting your goal.',
    createdAt: 'Yesterday',
    isRead: false,
  },
]);

const unreadCount = computed(() =>
  notifications.value.filter(notification => !notification.isRead).length,
);

const filteredNotifications = computed(() => {
  if (activeTab.value === 'unread') {
    return notifications.value.filter(notification => !notification.isRead);
  }

  return notifications.value;
});

const markAllAsRead = () => {
  notifications.value.forEach((notification) => {
    notification.isRead = true;
  });
};

const markAsRead = (notification: INotification) => {
  notification.isRead = true;
};
</script>

<template>
  <layouts-with-header page-title="Notifications" :has-sidebar="false" :has-aside="false">

    <div class="flex justify-end">
      <button
        type="button"
        :disabled="unreadCount === 0"
        class="shrink-0 rounded-lg px-3 py-2 text-sm font-semibold text-blue-600 bg-blue-50
          hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-40
          dark:text-blue-400 dark:hover:bg-slate-800"
        @click="markAllAsRead"
      >
        Mark all as read
      </button>
    </div>

    <!-- Tabs -->
    <div class="mt-5 flex gap-6 border-b border-gray-200 dark:border-slate-700">
      <button
        type="button"
        class="border-b-2 px-1 pb-3 text-sm font-semibold transition-colors"
        :class="activeTab === 'all'
          ? 'border-blue-600 text-blue-600 dark:text-blue-400'
          : 'border-transparent text-gray-500 hover:text-gray-800 dark:text-slate-400 dark:hover:text-slate-100'"
        @click="activeTab = 'all'"
      >
        All
      </button>

      <button
        type="button"
        class="flex items-center gap-2 border-b-2 px-1 pb-3 text-sm font-semibold transition-colors"
        :class="activeTab === 'unread'
          ? 'border-blue-600 text-blue-600 dark:text-blue-400'
          : 'border-transparent text-gray-500 hover:text-gray-800 dark:text-slate-400 dark:hover:text-slate-100'"
        @click="activeTab = 'unread'"
      >
        Unread
        <span
          v-if="unreadCount > 0"
          class="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700 dark:bg-blue-950 dark:text-blue-300"
        >
          {{ unreadCount }}
        </span>
      </button>
    </div>

    <!-- Notification List -->
    <div v-if="filteredNotifications.length > 0" class="mt-3">
      <button
        v-for="notification in filteredNotifications"
        :key="notification.id"
        type="button"
        class="my-1 flex w-full items-start gap-3 rounded-xl p-4 text-left transition-colors
          hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-blue-500 dark:hover:bg-slate-800"
        :class="{
          'bg-blue-50/70 dark:bg-blue-950/30': !notification.isRead,
        }"
        @click="markAsRead(notification)"
      >
        <img
          v-if="notification.actorAvatar"
          :src="notification.actorAvatar"
          :alt="notification.actorName"
          class="h-11 w-11 shrink-0 rounded-full object-cover"
        >

        <div
          v-else
          class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-100 dark:bg-slate-700"
        >
          <span class="i-lucide-bell text-xl text-gray-500" />
        </div>

        <div class="min-w-0 flex-1">
          <p class="text-sm leading-6 text-gray-800 dark:text-slate-100">
            <span class="font-semibold">
              {{ notification.actorName }}
            </span>
            {{ notification.message }}
          </p>

          <p class="mt-1 text-xs text-gray-500 dark:text-slate-400">
            {{ notification.createdAt }}
          </p>
        </div>

        <span
          v-if="!notification.isRead"
          class="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-600"
          aria-label="Unread"
        />
      </button>
    </div>

    <!-- Empty State -->
    <div
      v-else
      class="flex flex-col items-center justify-center py-16 text-center"
    >
      <div class="i-lucide-bell-ring text-4xl text-gray-400 dark:text-slate-500" />

      <p class="mt-4 font-semibold">
        {{ activeTab === 'unread' ? 'You’re all caught up' : 'No notifications yet' }}
      </p>

      <p class="mt-1 text-sm text-gray-500 dark:text-slate-400">
        {{ activeTab === 'unread'
          ? 'You have no unread notifications.'
          : 'When something happens, you’ll see it here.' }}
      </p>
    </div>

  </layouts-with-header>
</template>
