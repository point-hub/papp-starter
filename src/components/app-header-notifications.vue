<script setup lang="ts">
import {
  BaseButton,
  BasePopover,
  BaseTab,
  BaseTabGroup,
  BaseTabList,
  BaseTabPanel,
  BaseTabPanels,
} from '@point-hub/papp';
import { onMounted, ref, watch } from 'vue';

import { useAblyChannel } from '@/composables/ably-channel';
import { getAuditLogsApi } from '@/composables/api/administrator/audit-logs/get.api';
import { useNotification } from '@/composables/notification';
import { useAuthStore } from '@/stores/auth.store';
import { getEntityLink } from '@/utils/router-resolver';

const { unreadCount } = useNotification();
const authStore = useAuthStore();
const notificationPopoverRef = ref();
const logs = ref();

const formatDateTime = (isoString: string) => {
  const date = new Date(isoString);

  const datePart = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const timePart = date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return {
    date: datePart,
    time: timePart,
  };
};

const { messages } = useAblyChannel(`notifications:${authStore.authUser?._id}`);

onMounted(async () => {
  logs.value = await getAuditLogsApi({
    search: {
      actor_id: authStore.authUser?._id,
    },
    sort: '-created_at',
  });
});

watch(
  () => messages.value.length,
  () => {
    const message = messages.value?.[messages.value.length - 1];
    if (message && message.name === 'logs:new') {
      logs.value?.data.unshift({
        operation_id: message.data.data.operation_id,
        entity_type: message.data.data.entity_type,
        entity_id: message.data.data.entity_id,
        entity_ref: message.data.data.entity_ref,
        actor_type: message.data.data.actor_type,
        actor: message.data.data.actor,
        action: message.data.data.action,
        reason: message.data.data.reason,
        changes: message.data.data.changes,
        metadata: message.data.data.metadata,
        created_at: message.data.data.created_at,
      });
    }
  },
);
</script>

<template>
  <!-- Notification -->
  <base-popover ref="notificationPopoverRef" placement="bottom">
    <base-button type="button" size="xs" @click="notificationPopoverRef.toggle()">
      <BaseIcon icon="i-ph-bell-ringing" class="w-6 h-6" />
      <!-- ping -->
      <span v-if="unreadCount" class="absolute -mt-6 -mr-6 h-2 w-2 flex items-center justify-center">
        <span class="absolute h-full w-full inline-flex animate-ping rounded-full bg-red-400 opacity-80" />
        <span class="h-2 w-2 inline-flex rounded-full bg-red-400" />
      </span>
    </base-button>
    <template #content>
      <div class="popper-root">
        <BaseTabGroup as="div" class="bg-slate-100 dark:bg-slate-800">
          <BaseTabList class="flex overflow-x-auto overflow-y-hidden pt-4 border-b border-slate-200 dark:border-[#191e3a] scrollbar-hidden">
            <BaseTab as="template" v-slot="{ selected }">
              <a href="javascript:void(0);"
                class="flex pb-1 px-2 gap-1 items-center !outline-none"
                :class="{ 'border-b-2 !border-slate-500': selected }"
              >
                <BaseIcon icon="i-ph-bell-duotone" />
                <p>Notifications</p>
              </a>
            </BaseTab>
            <BaseTab as="template" v-slot="{ selected }">
              <a
                href="javascript:void(0);"
                class="flex pb-1 px-2 gap-1 items-center !outline-none"
                :class="{ 'border-b-2 !border-slate-500': selected }"
              >
                <BaseIcon icon="i-ph-folder-notch-minus-duotone" />
                <p>Logs</p>
              </a>
            </BaseTab>
          </BaseTabList>
          <BaseTabPanels class="flex-1 bg-white dark:bg-slate-700 text-sm p-4">
            <BaseTabPanel>
              <div class="pb-8 text-center" v-if="true">
                <div class="mt-5">
                  <p class="text-base font-semibold text-slate-700 dark:text-slate-100">
                    Empty Notification
                  </p>
                  <p class="text-slate-400 dark:text-slate-300">There are no new notifications</p>
                </div>
              </div>
              <div v-else class="overflow-y-auto flex flex-col gap-4 max-h-80 -mx-4 px-4">
              </div>
              <router-link to="" v-if="false" class="flex items-center justify-center my-2 -mb-2 p-2 hover:bg-slate-100">See all logs</router-link>
            </BaseTabPanel>
            <BaseTabPanel>
              <div class="pb-8 text-center" v-if="logs.data.length === 0">
                <div class="mt-5">
                  <p class="text-base font-semibold text-slate-700 dark:text-slate-100">
                    Empty Logs
                  </p>
                  <p class="text-slate-400 dark:text-slate-300">There are no unread logs</p>
                </div>
              </div>
              <div v-if="logs.data.length > 0" class="overflow-y-auto flex flex-col gap-4 max-h-80 -mx-4 px-4">
                <div v-for="log in logs.data">
                  <router-link :to="getEntityLink({ entity_type: log.entity_type, entity_id: log.entity_id })" class="flex items-start space-x-2" @click="notificationPopoverRef.toggle(false)">
                    <div>
                      <div v-if="log.action === 'create'" class="bg-info/10 dark:bg-info/15 h-10 w-10 flex shrink-0 items-center justify-center rounded-lg">
                        <base-icon icon="i-mingcute:plus-fill" />
                      </div>
                      <div v-else-if="log.action === 'update'" class="bg-info/10 dark:bg-info/15 h-10 w-10 flex shrink-0 items-center justify-center rounded-lg">
                        <base-icon icon="i-mingcute:pencil-2-fill" />
                      </div>
                      <div v-else-if="log.action === 'delete'" class="bg-danger/10 dark:bg-danger/15 h-10 w-10 flex shrink-0 items-center justify-center rounded-lg">
                        <base-icon icon="i-mingcute:delete-2-fill" />
                      </div>
                      <div v-else-if="log.action === 'approve'" class="bg-info/10 dark:bg-info/15 h-10 w-10 flex shrink-0 items-center justify-center rounded-lg">
                        <base-icon icon="i-fa7-solid:file-circle-check" />
                      </div>
                      <div v-else-if="log.action === 'reject'" class="bg-danger/10 dark:bg-danger/15 h-10 w-10 flex shrink-0 items-center justify-center rounded-lg">
                        <base-icon icon="i-fa7-solid:file-circle-xmark" />
                      </div>
                      <div v-else-if="log.action === 'archive'" class="bg-info/10 dark:bg-info/15 h-10 w-10 flex shrink-0 items-center justify-center rounded-lg">
                        <base-icon icon="i-material-symbols-light:archive" />
                      </div>
                      <div v-else-if="log.action === 'restore'" class="bg-danger/10 dark:bg-danger/15 h-10 w-10 flex shrink-0 items-center justify-center rounded-lg">
                        <base-icon icon="i-material-symbols-light:unarchive" />
                      </div>
                      <div v-else class="bg-info/10 dark:bg-info/15 h-10 w-10 flex shrink-0 items-center justify-center rounded-lg">
                        <base-icon icon="i-fa7-regular:pencil" />
                      </div>
                    </div>
                    <div class="min-w-0 break-words">
                      <p class="text-sm text-slate-500 dark:text-slate-100">
                        <span class="font-extrabold">{{ formatDateTime(log.created_at).date }}</span> <span class="text-xs">{{ formatDateTime(log.created_at).time }}</span>
                      </p>
                      <div class="text-xs text-slate-700 dark:text-slate-300 uppercase">
                        <span class="line-clamp-3">{{ log.action }} {{ log.module }} {{ log.entity_ref }}</span>
                      </div>
                    </div>
                  </router-link>
                </div>
              </div>
              <router-link to="/administrator/audit-logs" v-if="logs.data.length > 0" class="flex items-center justify-center my-2 -mb-2 p-2 hover:bg-slate-100" @click="notificationPopoverRef.toggle(false)">See all logs</router-link>
            </BaseTabPanel>
          </BaseTabPanels>
        </BaseTabGroup>
      </div>
    </template>
  </base-popover>
</template>