<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import TableSettingModal from '@/components/table-setting-modal.vue';
import { getFieldsSummaryApi, type IGetFieldsSummaryData } from '@/composables/api/administrator/audit-logs/get-fields-summary.api';
import { useQueryParams } from '@/composables/query-params';
import { useTableFilter } from '@/composables/table-filter';
import { useTableSetting } from '@/composables/table-setting';
import { toast } from '@/toast';
import { handleError } from '@/utils/api';
import { timeAgo } from '@/utils/time-ago';

/**
 * Setup table columns and visibility state using the useTableSetting composable.
 */
const {
  isOpen,
  close,
  columns,
  countVisibleColumns,
  pageSize,
  pageSizeOptions,
} = useTableSetting({
  columns: {
    field: { label: 'Field', isVisible: true, isSelectable: false },
    actor: { label: 'Actor', isVisible: true, isSelectable: true },
    newest_created_at: { label: 'Last Updated', isVisible: true, isSelectable: false },
  },
});

/**
 * Setup filtering, sorting, and pagination state using the useTableFilter composable.
 * - initial filters for all, name, age, gender are empty
 * - initial sort keys all set to 0 (no sort)
 */
const {
  filter,
  sort,
  pagination,
} = useTableFilter({
  initialFilter: {
    all: '',
    field: '',
    actor: '',
    newest_created_at: '',
  },
  initialSortKeys: {
    field: 0,
    actor: 0,
    newest_created_at: 0,
  },
});

/**
 * Utilities for updating query parameters in the URL.
 */
const { updateQueryParams, applyQueryParams } = useQueryParams();
const route = useRoute();

/**
 * Reactive references for:
 * - auditLogs data retrieved from API
 * - loading state
 * - control flags to prevent unnecessary watcher triggers
 */
const auditLogs = ref<IGetFieldsSummaryData[]>();
const isInitialSetup = ref(true);
const isLoading = ref(false);

/**
 * Function triggered when pagination page changes.
 * Fetches new data for the updated page and updates query params.
 */
const onPageUpdate = async () => {
  if (!isInitialSetup.value) {
    await getFieldsSummary(pagination.page);
    await updateQueryParams({ 'page': pagination.page.toString() });
  }
};

/**
 * Fetch data from API based on current filters, sorting, and pagination.
 * Manages loading state and error handling with user notifications.
 * @param page - Current page number to fetch (default 1)
 */
const getFieldsSummary = async (page = 1) => {
  try {
    isLoading.value = true;
    const response = await getFieldsSummaryApi({
      filter: {
        entity_type: 'roles',
        entity_id: route.params.id,
      },
      sort: 'field',
      page,
      page_size: 1000,
    });
    auditLogs.value = response.data;
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

  // Fetch initial data
  await getFieldsSummary(pagination.page);

  setTimeout(() => { isInitialSetup.value = false; }, 1000);
});
</script>

<template>
  <base-card title="Audits">
    <div class="flex flex-col gap-4">
      <base-table>
        <thead>
          <tr>
            <!-- Render visible column headers with sortable buttons -->
            <template v-for="(column, key) in columns">
              <th :key="key" v-if="columns[key]?.isVisible">
                <div class="flex items-center gap-2 whitespace-nowrap" :class="{'justify-end': column.label === 'Last Updated' || column.label === 'Actor' }">
                  <span>{{ column.label }}</span>
                </div>
              </th>
            </template>
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
          <tr v-if="!isLoading && auditLogs?.length === 0 && route.query">
            <td :colspan="countVisibleColumns + 1">
              <div class="w-full flex-col p-10 items-center justify-center gap-2 text-center">
                <p class="text-xl">Data Not Found</p>
              </div>
            </td>
          </tr>

          <!-- Render rows of role data when available -->
          <template v-if="!isLoading && auditLogs && auditLogs.length > 0">
            <tr v-for="(auditLog, index) in auditLogs" :key="index">
              <!-- Fields rendered conditionally based on column visibility -->
              <td v-if="columns['field']?.isVisible">
                <router-link :to="`/master/roles/${route.params.id}/field-histories/${auditLog.field}`" class="text-blue">{{ auditLog.field }}</router-link>
              </td>
              <td v-if="columns['actor']?.isVisible" class="text-right">
                <router-link :to="`/master/users/${auditLog.actor_id}`" class="text-blue">{{ auditLog.actor_name }}</router-link>
              </td>
              <td v-if="columns['newest_created_at']?.isVisible" class="text-right w-40">{{ timeAgo(auditLog.newest_created_at) }}</td>
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
