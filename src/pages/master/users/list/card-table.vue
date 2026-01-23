<script setup lang="ts">
import { watchDebounced } from '@vueuse/core';
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import TableSettingModal from '@/components/table-setting-modal.vue';
import { getUsersApi, type IUserData } from '@/composables/api/master/users/get.api';
import { useQueryParams } from '@/composables/query-params';
import { useTableFilter } from '@/composables/table-filter';
import { useTableSetting } from '@/composables/table-setting';
import { toast } from '@/toast';
import { handleError } from '@/utils/api';

import ModalDelete from '../components/delete-modal/index.vue';

/**
 * Setup table columns and visibility state using the useTableSetting composable.
 * - name: visible and not selectable
 * - age and gender: visible and selectable
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
    username: { label: 'Username', isVisible: true, isSelectable: false },
    name: { label: 'Name', isVisible: true, isSelectable: false },
    email: { label: 'Email', isVisible: true, isSelectable: false },
    'role.code': { label: 'Role (Code)', isVisible: true, isSelectable: true },
    'role.name': { label: 'Role (Name)', isVisible: true, isSelectable: true },
    notes: { label: 'Notes', isVisible: false, isSelectable: true },
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
    username: '',
    name: '',
    email: '',
    'role.code': '',
    'role.name': '',
    notes: '',
  },
  initialSortKeys: {
    username: 0,
    name: 0,
    email: 0,
    'role.code': 0,
    'role.name': 0,
    notes: 0,
  },
});

/**
 * Utilities for updating query parameters in the URL.
 */
const { updateQueryParams, applyQueryParams } = useQueryParams();
const route = useRoute();
const router = useRouter();

/**
 * Reactive references for:
 * - users data retrieved from API
 * - loading state
 * - control flags to prevent unnecessary watcher triggers
 */
const users = ref<IUserData[]>();
const isInitialSetup = ref(true);
const isLoading = ref(false);

/**
 * References for dynamic UI components like row menus and delete modal.
 */
const rowMenuRef = ref();
const deleteModalRef = ref();

/**
 * Function triggered when pagination page changes.
 * Fetches new data for the updated page and updates query params.
 */
const onPageUpdate = async () => {
  if (!isInitialSetup.value) {
    await getUsers(pagination.page);
    await updateQueryParams({ 'page': pagination.page.toString() });
  }
};

/**
 * Reset pagination to first page and fetch data accordingly.
 */
const resetPageAndFetch = async () => {
  pagination.page = 1;
  await updateQueryParams({ page: 1 });
  await getUsers();
};

/**
 * Fetch data from API based on current filters, sorting, and pagination.
 * Manages loading state and error handling with user notifications.
 * @param page - Current page number to fetch (default 1)
 */
const getUsers = async (page = 1) => {
  try {
    isLoading.value = true;
    const response = await getUsersApi({
      search: filter,
      sort: sortObjectToString(sort),
      page,
      page_size: pagination.page_size,
    });
    users.value = response.data;
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
  await getUsers();

  setTimeout(() => { isInitialSetup.value = false; }, 1000);
};

/**
 * Opens the delete confirmation modal for a specific user.
 * Also closes the row menu popover.
 * @param user - The data row to delete
 * @param index - Index of the row for UI references
 */
const onDeleteModal = (user: IUserData, index: number) => {
  rowMenuRef.value[index].toggle(false);
  deleteModalRef.value.toggleModal({
    _id: user._id,
    label: `${user.name}`,
  });
};

/**
 * Handler called after a successful deletion.
 * Refreshes the data list.
 */
const onDeleted = async () => {
  await getUsers();
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
  await getUsers(pagination.page);

  setTimeout(() => { isInitialSetup.value = false; }, 1000);
});

/**
 * Watcher for filter changes with debounce to reduce API calls.
 * Resets page to 1 and fetches data on filter change.
 * Skips if flagged to prevent API calls on initial setup or manual resets.
 */
watchDebounced(filter, async () => {
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
  <base-card title="Users">
    <div class="flex flex-col lg:flex-row gap-2 items-center justify-between mb-8">
      <div class="flex-1 w-full">
        <base-input v-model="filter.all" placeholder="Search..." border="full" :readonly="isLoading">
          <template #prefix>
            <base-icon icon="i-fa7-solid-magnifying-glass" />
          </template>
        </base-input>
      </div>
      <div class="flex gap-1">
        <router-link to="/master/users/create">
          <base-button color="primary" shape="sharp" class="font-bold">
            <base-icon class="i-lucide:square-plus" /> CREATE
          </base-button>
        </router-link>
        <base-button color="info" @click="open()" :disabled="isLoading" class="font-bold">
          <base-icon class="i-ph:sliders-horizontal-bold" />
        </base-button>
      </div>
    </div>

    <div class="flex flex-col gap-4">
      <base-table>
        <thead>
          <tr>
            <th class="w-1"></th>
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
            <th class="w-1"></th>

            <!-- Render filter inputs for visible columns -->
            <th v-if="columns['username']?.isVisible">
              <base-input v-model="filter.username" placeholder="Search..." :readonly="isLoading" border="none" paddingless />
            </th>
            <th v-if="columns['name']?.isVisible">
              <base-input v-model="filter.name" placeholder="Search..." :readonly="isLoading" border="none" paddingless />
            </th>
            <th v-if="columns['email']?.isVisible">
              <base-input v-model="filter.email" placeholder="Search..." :readonly="isLoading" border="none" paddingless />
            </th>
            <th v-if="columns['role.code']?.isVisible">
              <base-input v-model="filter['role.code']" placeholder="Search..." :readonly="isLoading" border="none" paddingless />
            </th>
            <th v-if="columns['role.name']?.isVisible">
              <base-input v-model="filter['role.name']" placeholder="Search..." :readonly="isLoading" border="none" paddingless />
            </th>
            <th v-if="columns['notes']?.isVisible">
              <base-input v-model="filter.notes" placeholder="Search..." :readonly="isLoading" border="none" paddingless />
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

          <!-- Show no data found message if no users and query params exist -->
          <tr v-if="!isLoading && users?.length === 0 && route.query">
            <td :colspan="countVisibleColumns + 1">
              <div class="w-full flex-col p-10 items-center justify-center gap-2 text-center">
                <p class="text-xl">Data Not Found</p>
                <base-button @click="onResetFilter" variant="filled" color="primary" size="xs" shape="pill" class="my-2">
                  Reset Filter
                </base-button>
              </div>
            </td>
          </tr>

          <!-- Render rows of user data when available -->
          <template v-if="!isLoading && users && users.length > 0">
            <tr v-for="(user, index) in users" :key="index">
              <td>
                <!-- Row action menu -->
                <base-popover placement="bottom" ref="rowMenuRef">
                  <base-button @click="rowMenuRef[index].toggle()">
                    <base-icon class="text-md!" icon="i-fa7-solid:ellipsis-vertical" />
                  </base-button>
                  <template #content>
                    <base-card class="p-0! gap-0! -mt-2" shadow>
                      <div class="flex flex-col">
                        <router-link :to="`/master/users/${user._id}`">
                          <base-button variant="text" color="info" class="w-full py-1! px-3! m-0! flex gap-2! items-center justify-start text-left!">
                            <base-icon icon="i-fa7-light-book-open-cover" />
                            <p class="flex-1">View</p>
                          </base-button>
                        </router-link>
                        <base-divider orientation="vertical" class="my-0!" />
                        <router-link :to="`/master/users/${user._id}/edit`">
                          <base-button variant="text" color="info" class="w-full py-1! px-3! m-0! flex gap-2! items-center justify-start text-left!">
                            <base-icon icon="i-fa7-light-file-pen" />
                            <p class="flex-1">Edit</p>
                          </base-button>
                        </router-link>
                        <base-divider orientation="vertical" class="my-0!" />
                        <base-button @click="onDeleteModal(user, index)" variant="text" color="danger" class="w-full py-1! px-3! m-0! flex gap-2! items-center justify-start text-left!">
                          <base-icon icon="i-fa7-light-trash-xmark" />
                          <p class="flex-1">Delete</p>
                        </base-button>
                      </div>
                    </base-card>
                  </template>
                </base-popover>
              </td>

              <!-- User fields rendered conditionally based on column visibility -->
              <td v-if="columns['username']?.isVisible">
                <router-link :to="`/master/users/${user._id}`" class="text-blue-600">{{ user.username }}</router-link>
              </td>
              <td v-if="columns['name']?.isVisible">
                <router-link :to="`/master/users/${user._id}`" class="text-blue-600">{{ user.name }}</router-link>
              </td>
              <td v-if="columns['email']?.isVisible">
                <router-link :to="`/master/users/${user._id}`" class="text-blue-600">{{ user.email }}</router-link>
              </td>
              <td v-if="columns['role.code']?.isVisible">
                <router-link :to="`/master/roles/${user.role?._id}`" class="text-blue-600">
                  {{ user.role.code }}
                </router-link>
              </td>
              <td v-if="columns['role.name']?.isVisible">
                <router-link :to="`/master/roles/${user.role?._id}`" class="text-blue-600">
                  {{ user.role.name }}
                </router-link>
              </td>
              <td v-if="columns['notes']?.isVisible">{{ user.notes }}</td>
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

    <!-- Delete confirmation modal -->
    <modal-delete ref="deleteModalRef" @deleted="onDeleted" />
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
