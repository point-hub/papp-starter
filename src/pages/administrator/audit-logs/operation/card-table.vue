<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { getAuditLogsApi, type IGetAuditLogsApiResponse } from '@/composables/api/administrator/audit-logs/get.api';
import { toast } from '@/toast';
import { handleError } from '@/utils/api';
import { formatDate } from '@/utils/date';
import { getEntityLink } from '@/utils/router-resolver';

/**
 * Utilities for updating query parameters in the URL.
 */
const route = useRoute();

/**
 * Reactive references for:
 * - auditLogs data retrieved from API
 * - loading state
 * - control flags to prevent unnecessary watcher triggers
 */
const auditLogs = ref<IGetAuditLogsApiResponse>();
const isLoading = ref(false);

/**
 * Fetch data from API based on current filters, sorting, and pagination.
 * Manages loading state and error handling with user notifications.
 * @param page - Current page number to fetch (default 1)
 */
const getAuditLogs = async (page = 1) => {
  try {
    isLoading.value = true;
    const response = await getAuditLogsApi({
      search: {
        operation_id: route.params.id,
      },
      sort: 'created_at',
      page,
      page_size: 1000,
    });
    auditLogs.value = response;
  } catch (error) {
    const errorResponse = handleError(error);
    if (errorResponse.message) {
      toast(errorResponse.message, {
        lists: errorResponse.lists,
        color: 'danger',
      });
    }
  } finally {
    isLoading.value = false;
  }
};

/**
 * Lifecycle hook: runs when component is mounted.
 * Applies query params to state and fetches initial data.
 */
onMounted(async () => {
  await getAuditLogs(1);
});

const getChangedKeys = (
  changes?: { summary?: { fields?: string[] } },
  before?: Record<string, unknown>,
  after?: Record<string, unknown>,
) => {
  if (changes?.summary?.fields) {
    return changes.summary.fields;
  }

  // fallback to previous logic
  const allKeys = Array.from(
    new Set([
      ...Object.keys(before || {}),
      ...Object.keys(after || {}),
    ]),
  );

  return allKeys.filter(key => before?.[key] !== after?.[key]);
};
</script>

<template>
  <base-card title="Audit Logs">
    <div class="flex flex-col gap-4">
      <base-table>
        <thead>
          <tr>
            <th class="w-40">Key</th>
            <th>Value</th>
          </tr>
        </thead>

        <tbody>
          <!-- Loading state with loader spanning all columns -->
          <tr v-if="isLoading">
            <td :colspan="2">
              <p class="w-full h-32 flex items-center justify-center gap-2 text-center text-xl">
                <base-loader type="classic" sample="2" />
              </p>
            </td>
          </tr>

          <!-- Render rows of auditLog data when available -->
          <template v-if="!isLoading">
            <tr>
              <td class="font-bold whitespace-nowrap">Operation ID</td>
              <td>{{ auditLogs?.data[0]?.operation_id }}</td>
            </tr>
            <tr>
              <td class="font-bold whitespace-nowrap">Date</td>
              <td>{{ formatDate(auditLogs?.data[0]?.created_at) }}</td>
            </tr>
            <tr>
              <td class="font-bold whitespace-nowrap">Actor Type</td>
              <td>{{ auditLogs?.data[0]?.actor_type }}</td>
            </tr>
            <tr>
              <td class="font-bold whitespace-nowrap">Actor ID</td>
              <td>
                <a :href="`/master/users/${auditLogs?.data[0]?.actor_id}`" target="_blank" class="text-blue-600">
                  {{ auditLogs?.data[0]?.actor_id }}
                </a>
              </td>
            </tr>
            <tr>
              <td class="font-bold whitespace-nowrap">Actor Name</td>
              <td>{{ auditLogs?.data[0]?.actor_name }}</td>
            </tr>
            <tr>
              <td class="font-bold whitespace-nowrap">Action </td>
              <td>{{ auditLogs?.data[0]?.action }}</td>
            </tr>
            <tr>
              <td class="font-bold whitespace-nowrap">Module</td>
              <td>{{ auditLogs?.data[0]?.module }}</td>
            </tr>
            <tr>
              <td class="font-bold whitespace-nowrap">User Reason</td>
              <td>{{ auditLogs?.data[0]?.user_reason }}</td>
            </tr>
          </template>
        </tbody>
      </base-table>
      <h1 class="text-3xl">Entity Changes</h1>
      <base-timeline>
        <base-timeline-content v-for="(auditLog, index) in auditLogs?.data">
          <template #point>
            <div class="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold">
              {{ index + 1 }}
            </div>
          </template>
          <template #content>
            <div>
              <p class="case-capital">{{ auditLog.system_reason }}</p>
              <p class="text-xs font-light">{{ formatDate(auditLog.created_at) }}</p>
              <p class="text-sm font-bold">Entity Type: <span class="font-normal">{{ auditLog.entity_type }}</span></p>
              <p class="text-sm font-bold">
                Entity ID:
                <span class="font-normal">
                  <a :href="getEntityLink({ entity_type: auditLog.entity_type, entity_id: auditLog.entity_id })" class="text-blue-600">
                    {{ auditLog.entity_id }}
                  </a>
                </span>
              </p>
              <p class="text-sm font-bold">
                Entity:
                <span class="font-normal">
                  <a :href="getEntityLink({ entity_type: auditLog.entity_type, entity_id: auditLog.entity_id })" class="text-blue-600">
                    {{ auditLog.entity_ref }}
                  </a>
                </span>
              </p>
            </div>
            <base-table>
              <thead>
                <tr>
                  <th class="w-[30%]"><div class="flex items-center gap-2 whitespace-nowrap">Field</div></th>
                  <th class="w-[35%]"><div class="flex items-center gap-2 whitespace-nowrap">Before</div></th>
                  <th class="w-[35%]"><div class="flex items-center gap-2 whitespace-nowrap">After</div></th>
                </tr>
              </thead>

              <tbody>
                <!-- Loading state with loader spanning all columns -->
                <tr v-if="isLoading">
                  <td colspan="3">
                    <p class="w-full h-32 flex items-center justify-center gap-2 text-center text-xl">
                      <base-loader type="classic" sample="2" />
                    </p>
                  </td>
                </tr>

                <!-- Render rows of auditLog data when available -->
                <template v-if="!isLoading">
                  <tr v-for="key in getChangedKeys(auditLog.changes, auditLog.changes?.snapshot?.before, auditLog.changes?.snapshot?.after)" :key="key">
                    <td class="font-semibold">{{ key }}</td>
                    <td class="break-all text-red-700 dark:text-red-300">{{ auditLog.changes?.snapshot?.before?.[key] }}</td>
                    <td class="break-all text-green-700 dark:text-green-300">{{ auditLog.changes?.snapshot?.after?.[key] }}</td>
                  </tr>
                </template>
              </tbody>
            </base-table>
          </template>
        </base-timeline-content>
      </base-timeline>
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
