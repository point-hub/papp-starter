<script setup lang="ts">
defineProps<{
  isOpen: boolean
  columns: Record<string, { label: string; isVisible: boolean; isSelectable: boolean }>
  pageSize: { size: number; label: string }
  pageSizeOptions: Array<{ size: number; label: string }>
}>();

const emit = defineEmits<{
  (e: 'update:close', value: boolean): void
  (e: 'update:pageSize', value: { size: number; label: string }): void
}>();
const close = () => emit('update:close', false);
const updatePageSize = (size: { size: number; label: string }) => emit('update:pageSize', size);
</script>

<template>
  <base-modal title="Table Setting" :is-open="isOpen" @on-close="close()" size="xl">
    <div class="max-h-90vh overflow-auto">
      <div class="space-y-2">
        <div>
          <p>Check the columns that should be shown in the table</p>
        </div>

        <div class="space-y-2">
          <base-checkbox v-for="([key, column]) in Object.entries(columns)" :key="key" :id="key" :text="column.label"
            :disabled="!column.isSelectable" v-model="column.isVisible" />
        </div>
      </div>

      <base-divider orientation="vertical" />

      <div class="flex flex-col gap-2">
        <h3 class="font-extrabold text-lg">Page Size</h3>
        <div>
          <base-radio :model-value="pageSize" @update:model-value="updatePageSize" :options="pageSizeOptions">
            <template v-slot="{ checked, option }">
              <div class="w-full cursor-pointer">
                <div :class="[
                  checked
                    ? 'bg-blue-700 border-blue-700 text-white'
                    : 'bg-white dark:bg-slate-700 dark:text-white text-slate-900 dark:border-slate-600'
                ]" class="border rounded min-w-16 py-1 px-2">
                  <div class="w-full flex space-x-1 items-center justify-between">
                    <div class="flex flex-col">
                      <div class="text-base font-semibold">{{ option.label }}</div>
                    </div>
                    <div v-show="checked" class="shrink-0 text-white">
                      <base-icon icon="i-fa7-solid-circle-check" />
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </base-radio>
        </div>
      </div>

      <base-divider orientation="vertical" />

      <base-button color="primary" size="md" is-block @click="close()">
        Close
      </base-button>
    </div>
  </base-modal>
</template>
