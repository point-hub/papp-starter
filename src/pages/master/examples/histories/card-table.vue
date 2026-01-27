<script setup lang="ts">
import { watchDebounced } from '@vueuse/core';
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import BaseDateRangePicker from '@/components/base-date-range-picker.vue';
import TableSettingModal from '@/components/table-setting-modal.vue';
import { getAuditLogsApi, type IGetAuditLogsApiResponse } from '@/composables/api/administrator/audit-logs/get.api';
import { useQueryParams } from '@/composables/query-params';
import { useTableFilter } from '@/composables/table-filter';
import { useTableSetting } from '@/composables/table-setting';
import { toast } from '@/toast';
import { handleError } from '@/utils/api';
import { formatDate } from '@/utils/date';
import { getEntityLink } from '@/utils/router-resolver';

/**
 * Utilities for updating query parameters in the URL.
 */
const { updateQueryParams, applyQueryParams } = useQueryParams();
const route = useRoute();
const router = useRouter();

/**
 * Setup table columns and visibility state using the useTableSetting composable.
 */
const {
  isOpen,
  open,
  close,
  columns,
  visibleColumns,
  countVisibleColumns,
  pageSize,
  pageSizeOptions,
  resetTableSetting,
} = useTableSetting({
  columns: {
    created_at: { label: 'Date', isVisible: true, isSelectable: false },
    actor_type: { label: 'Actor Type', isVisible: true, isSelectable: true },
    actor_id: { label: 'Actor ID', isVisible: false, isSelectable: true },
    actor_name: { label: 'Actor Name', isVisible: true, isSelectable: false },
    action: { label: 'Action', isVisible: true, isSelectable: false },
    user_reason: { label: 'User Reason', isVisible: true, isSelectable: true },
  },
});

/**
 * Setup filtering, sorting, and pagination state using the useTableFilter composable.
 * - initial filters for all, name, age, gender are empty
 * - initial sort keys all set to 0 (no sort)
 */
const {
  filter,
  resetFilter,
  sort,
  sortObjectToString,
  toggleSort,
  pagination,
  resetPagination,
} = useTableFilter({
  initialFilter: {
    all: '',
    created_at: '',
    created_at_from: '',
    created_at_to: '',
    actor_type: '',
    actor_id: '',
    actor_name: '',
    action: '',
    user_reason: '',
  },
  initialSortKeys: {
    created_at: -1,
    actor_type: 0,
    actor_id: 0,
    actor_name: 0,
    action: 0,
    user_reason: 0,
  },
});

/**
 * Reactive references for:
 * - auditLogs data retrieved from API
 * - loading state
 * - control flags to prevent unnecessary watcher triggers
 */
const auditLogs = ref<IGetAuditLogsApiResponse>();
const isInitialSetup = ref(true);
const isLoading = ref(false);

/**
 * Function triggered when pagination page changes.
 * Fetches new data for the updated page and updates query params.
 */
const onPageUpdate = async () => {
  if (!isInitialSetup.value) {
    await getAuditLogs(pagination.page);
    await updateQueryParams({ 'page': pagination.page.toString() });
  }
};

/**
 * Reset pagination to first page and fetch data accordingly.
 */
const resetPageAndFetch = async () => {
  pagination.page = 1;
  await updateQueryParams({ page: 1 });
  await getAuditLogs();
};

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
        ...filter,
        created_at_from: formatDate(filter.created_at_from, { boundary: 'start-of-day' }),
        created_at_to: formatDate(filter.created_at_to, { boundary: 'end-of-day' }),
        entity_type: 'examples',
        entity_id: String(route.params.id),
      },
      group_by_operation_id: true,
      sort: sortObjectToString(sort),
      page,
      page_size: pagination.page_size,
    });
    auditLogs.value = response;
    Object.assign(pagination, response.pagination);
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
 * Handler to reset all filters, sorting, pagination, and table settings.
 * Clears URL query parameters and fetches default data.
 */
const onResetFilter = async () => {
  isInitialSetup.value = true;

  // Clear all query params from URL
  await router.push({ query: undefined });

  // Reset pagination, table settings, filter, and sort states
  resetPagination(pageSize.value.size);
  resetTableSetting();
  resetFilter();

  // Fetch data without any filters applied
  await getAuditLogs();

  setTimeout(() => { isInitialSetup.value = false; }, 1000);
};

/**
 * Lifecycle hook: runs when component is mounted.
 * Applies query params to state and fetches initial data.
 */
onMounted(async () => {
  isInitialSetup.value = true;
  // Set initial page size from table setting
  pagination.page_size = pageSize.value.size;

  // Apply query params from route to filter, sort, pagination, columns
  applyQueryParams({
    query: route.query,
    filter,
    sort,
    pagination,
    pageSize,
    pageSizeOptions,
    columns,
  });
  if (Object.keys(route.query).length === 0) {
    await updateQueryParams({
      search: filter,
      sort: sortObjectToString(sort),
      page: pagination.page.toString(),
      'page-size': pagination.page_size.toString(),
    });
  }

  await getAuditLogs(pagination.page);

  setTimeout(() => { isInitialSetup.value = false; }, 1000);
});

/**
 * Watcher for filter changes with debounce to reduce API calls.
 * Resets page to 1 and fetches data on filter change.
 * Skips if flagged to prevent API calls on initial setup or manual resets.
 */
watchDebounced(() => ({...filter}), async () => {
  if (!isInitialSetup.value) {
    await updateQueryParams({ search: filter });
    await resetPageAndFetch();
  }
}, { debounce: 500, maxWait: 1000 });

/**
 * Watcher for page size changes.
 * Updates pagination and query params, then fetches data.
 */
watch(pageSize, async () => {
  if (!isInitialSetup.value) {
    pagination.page_size = pageSize.value.size;
    await updateQueryParams({ 'page-size': pagination.page_size.toString() });
    await resetPageAndFetch();
  }
});

/**
 * Watcher for visible columns changes.
 * Updates query params to reflect visible columns.
 */
watch(visibleColumns, async () => {
  if (!isInitialSetup.value) {
    await updateQueryParams({ 'columns': visibleColumns.value });
  }
});

/**
 * Watcher for sort state changes.
 * Updates query params and fetches data accordingly.
 */
watch(sort, async () => {
  if (!isInitialSetup.value) {
    await updateQueryParams({ sort: sortObjectToString(sort) });
    await resetPageAndFetch();
  }
});


</script>

<template>
  <base-card title="Audit Logs">
    <div class="flex flex-col lg:flex-row gap-2 items-center justify-between mb-8">
      <div class="flex-1 w-full">
        <base-input v-model="filter.all" placeholder="Search..." border="full" :readonly="isLoading">
          <template #prefix>
            <base-icon icon="i-fa7-solid-magnifying-glass" />
          </template>
        </base-input>
      </div>
      <div class="flex gap-1">
        <base-button color="info" @click="open()" :disabled="isLoading" class="font-bold">
          <base-icon class="i-ph:sliders-horizontal-bold" />
        </base-button>
      </div>
    </div>

    <div class="flex flex-col gap-4">
      <base-table>
        <thead>
          <tr>
            <!-- Render visible column headers with sortable buttons -->
            <template v-for="(column, key) in columns">
              <th :key="key" v-if="columns[key]?.isVisible">
                <div class="flex items-center gap-2 whitespace-nowrap">
                  <base-button size="xs" class="p-0!" @click="toggleSort(key)">
                    <base-icon v-if="sort[key] === 0" icon="i-solar:square-sort-vertical-outline" />
                    <base-icon v-if="sort[key] === 1" icon="i-heroicons-solid:sort-ascending" />
                    <base-icon v-if="sort[key] === -1" icon="i-heroicons-solid:sort-descending" />
                  </base-button>
                  <span>{{ column.label }}</span>
                </div>
              </th>
            </template>
          </tr>

          <tr class="bg-slate-100 dark:bg-slate-700">
            <!-- Render filter inputs for visible columns -->
            <th v-if="columns['created_at']?.isVisible">
              <!-- <base-input v-model="filter.date" placeholder="Search..." :readonly="isLoading" border="none" paddingless /> -->
              <base-date-range-picker
                v-model:date_from="filter.created_at_from"
                v-model:date_to="filter.created_at_to"
                placeholder="Search..."
                :readonly="isLoading"
                border="none"
                paddingless
              />
            </th>
            <th v-if="columns['operation_id']?.isVisible">
              <base-input v-model="filter.operation_id" placeholder="Search..." :readonly="isLoading" border="none" paddingless />
            </th>
            <th v-if="columns['actor_type']?.isVisible">
              <base-input v-model="filter.actor_type" placeholder="Search..." :readonly="isLoading" border="none" paddingless />
            </th>
            <th v-if="columns['actor_id']?.isVisible">
              <base-input v-model="filter.actor_id" placeholder="Search..." :readonly="isLoading" border="none" paddingless />
            </th>
            <th v-if="columns['actor_name']?.isVisible">
              <base-input v-model="filter.actor_name" placeholder="Search..." :readonly="isLoading" border="none" paddingless />
            </th>
            <th v-if="columns['action']?.isVisible">
              <base-input v-model="filter.action" placeholder="Search..." :readonly="isLoading" border="none" paddingless />
            </th>
            <th v-if="columns['module']?.isVisible">
              <base-input v-model="filter.module" placeholder="Search..." :readonly="isLoading" border="none" paddingless />
            </th>
            <th v-if="columns['entity_type']?.isVisible">
              <base-input v-model="filter.entity_type" placeholder="Search..." :readonly="isLoading" border="none" paddingless />
            </th>
            <th v-if="columns['entity_id']?.isVisible">
              <base-input v-model="filter.entity_id" placeholder="Search..." :readonly="isLoading" border="none" paddingless />
            </th>
            <th v-if="columns['entity_ref']?.isVisible">
              <base-input v-model="filter.entity_ref" placeholder="Search..." :readonly="isLoading" border="none" paddingless />
            </th>
            <th v-if="columns['user_reason']?.isVisible">
              <base-input v-model="filter.user_reason" placeholder="Search..." :readonly="isLoading" border="none" paddingless />
            </th>
          </tr>
        </thead>

        <tbody>
          <!-- Loading state with loader spanning all columns -->
          <tr v-if="isLoading">
            <td :colspan="countVisibleColumns + 1">
              <p class="w-full h-32 flex items-center justify-center gap-2 text-center text-xl">
                <base-loader type="classic" sample="2" />
              </p>
            </td>
          </tr>

          <!-- Show no data found message if no auditLogs and query params exist -->
          <tr v-if="!isLoading && auditLogs?.data?.length === 0 && route.query">
            <td :colspan="countVisibleColumns + 1">
              <div class="w-full flex-col p-10 items-center justify-center gap-2 text-center">
                <p class="text-xl">Data Not Found</p>
                <base-button @click="onResetFilter" variant="filled" color="primary" size="xs" shape="pill" class="my-2">
                  Reset Filter
                </base-button>
              </div>
            </td>
          </tr>

          <!-- Render rows of auditLog data when available -->
          <template v-if="!isLoading && auditLogs?.data && auditLogs?.data.length > 0">
            <tr v-for="(auditLog, index) in auditLogs?.data" :key="index">
              <!-- AuditLog fields rendered conditionally based on column visibility -->
              <td v-if="columns['created_at']?.isVisible" class="whitespace-nowrap">{{ formatDate(auditLog.created_at) }}</td>
              <td v-if="columns['operation_id']?.isVisible">
                <router-link :to="`/administrator/audit-logs/${auditLog.operation_id}`" class="text-blue-600">
                  {{ auditLog.operation_id?.substring(0, 13) }}...
                </router-link>
              </td>
              <td v-if="columns['actor_type']?.isVisible">{{ auditLog.actor_type }}</td>
              <td v-if="columns['actor_id']?.isVisible">
                <a target="_blank" :href="`/master/users/${auditLog.actor_id}`" class="text-blue-600">
                  {{ auditLog.actor_id }}
                </a>
              </td>
              <td v-if="columns['actor_name']?.isVisible">
                <a target="_blank" :href="`/master/users/${auditLog.actor_id}`" class="text-blue-600">
                  {{ auditLog.actor_name }}
                </a>
              </td>
              <td v-if="columns['action']?.isVisible">{{ auditLog.action }}</td>
              <td v-if="columns['module']?.isVisible">{{ auditLog.module }}</td>
              <td v-if="columns['entity_type']?.isVisible">{{ auditLog.entity_type }}</td>
              <td v-if="columns['entity_id']?.isVisible">
                <a target="_blank" :href="getEntityLink({ entity_type: auditLog.entity_type, entity_id: auditLog.entity_id })" class="text-blue-600">
                  {{ auditLog.entity_id }}
                </a>
              </td>
              <td v-if="columns['entity_ref']?.isVisible">
                <a target="_blank" :href="getEntityLink({ entity_type: auditLog.entity_type, entity_id: auditLog.entity_id })" class="text-blue-600">
                  {{ auditLog.entity_ref }}
                </a>
              </td>
              <td v-if="columns['user_reason']?.isVisible">{{ auditLog.user_reason }}</td>
            </tr>
          </template>
        </tbody>
      </base-table>

      <!-- Pagination component with two-way binding to pagination.page -->
      <base-pagination
        v-if="!isLoading"
        v-model="pagination.page"
        :page-size="pagination.page_size"
        :total-document="pagination.total_document"
        @update:model-value="onPageUpdate()"
      />
    </div>
  </base-card>

  <!-- Table Setting modal -->
  <table-setting-modal
    :is-open="isOpen"
    :columns="columns"
    :page-size="pageSize"
    :page-size-options="pageSizeOptions"
    @update:close="close"
    @update:pageSize="val => { pageSize = val }"
  />
</template>

<style scoped lang="postcss"></style>
