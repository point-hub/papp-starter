<script setup lang="ts">
import { type BaseFormLayoutType } from '@point-hub/papp';
import { computed,ref } from 'vue';

export type BaseChoosenBorderType = 'none' | 'simple' | 'full';

export interface SelectedItem {
  label: string;
  [key: string]: unknown;
}

export interface Props {
  id?: string;
  mode?: 'input' | 'text';
  title?: string;
  label?: string;
  description?: string;
  placeholder?: string;
  border?: BaseChoosenBorderType;
  layout?: BaseFormLayoutType;
  autofocus?: boolean;
  required?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  helpers?: string[];
  paddingless?: boolean;
  dataTestid?: string;
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'input',
  border: 'full',
  layout: 'horizontal',
  autofocus: false,
  required: false,
  readonly: false,
  disabled: false,
  paddingless: false,
});

/* =======================
 * MODELS (OUTPUTS)
 * ======================= */
const dateFrom = defineModel<string | undefined>('date_from');
const dateTo = defineModel<string | undefined>('date_to');
const errors = defineModel<string[]>('errors');

/* =======================
 * STATE
 * ======================= */
const showModal = ref(false);

/* =======================
 * COMPUTED
 * ======================= */
const input = computed(() => {
  if (dateFrom.value && dateTo.value) {
    return `${dateFrom.value} - ${dateTo.value}`;
  } else if (dateFrom.value && !dateTo.value) {
    return `${dateFrom.value} - ...`;
  } else if (!dateFrom.value && dateTo.value) {
    return `... - ${dateTo.value}`;
  }
  return '';
});

/* =======================
 * MODAL HANDLERS
 * ======================= */
const onOpen = () => {
  if (props.readonly || props.disabled) return;
  showModal.value = true;
};

const onClose = () => {
  showModal.value = false;
};

/* =======================
 * DATE HELPERS
 * ======================= */
const formatDate = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const today = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

const yesterday = () => {
  const d = today();
  d.setDate(d.getDate() - 1);
  return d;
};

const startOfWeek = (date = new Date()) => {
  const d = new Date(date);
  const day = d.getDay() || 7;
  d.setDate(d.getDate() - day + 1);
  d.setHours(0, 0, 0, 0);
  return d;
};

const endOfWeek = (date = new Date()) => {
  const d = startOfWeek(date);
  d.setDate(d.getDate() + 6);
  return d;
};

const startOfMonth = (date = new Date()) =>
  new Date(date.getFullYear(), date.getMonth(), 1);

const endOfMonth = (date = new Date()) =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0);

const startOfYear = (date = new Date()) =>
  new Date(date.getFullYear(), 0, 1);

const endOfYear = (date = new Date()) =>
  new Date(date.getFullYear(), 11, 31);

/* =======================
 * APPLY RANGE
 * ======================= */
const applyRange = (from: Date, to: Date) => {
  dateFrom.value = formatDate(from);
  dateTo.value = formatDate(to);
  onClose();
};

/* =======================
 * QUICK ACTIONS
 * ======================= */
const setToday = () => applyRange(today(), today());
const setYesterday = () => applyRange(yesterday(), yesterday());

const setThisWeek = () =>
  applyRange(startOfWeek(), endOfWeek());

const setLastWeek = () => {
  const start = startOfWeek();
  start.setDate(start.getDate() - 7);
  applyRange(start, endOfWeek(start));
};

const setThisMonth = () =>
  applyRange(startOfMonth(), endOfMonth());

const setLastMonth = () => {
  const d = new Date();
  d.setMonth(d.getMonth() - 1);
  applyRange(startOfMonth(d), endOfMonth(d));
};

const setThisYear = () =>
  applyRange(startOfYear(), endOfYear());

const setLastYear = () => {
  const d = new Date();
  d.setFullYear(d.getFullYear() - 1);
  applyRange(startOfYear(d), endOfYear(d));
};
</script>

<template>
  <base-form
    :label="props.label"
    :layout="props.layout"
    :description="props.description"
    :required="props.required"
    :helpers="props.helpers"
    :errors="errors"
    class="w-full"
  >
    <!-- INPUT MODE -->
    <base-input
      v-if="mode === 'input'"
      readonly
      :model-value="input"
      @click="onOpen"
      :border="border"
      :placeholder="placeholder"
      class="w-full"
      :data-testid="`${dataTestid}-input`"
      :paddingless="paddingless"
    />

    <!-- TEXT MODE -->
    <div
      v-if="mode === 'text'"
      class="border-b border-dashed cursor-pointer border-black dark:border-white"
      @click="onOpen"
      :data-testid="`${dataTestid}-input`"
    >
      {{ input || 'SELECT' }}
    </div>
  </base-form>

  <base-modal
    size="md"
    :is-open="showModal"
    @on-close="onClose"
    title="Choose Date"
  >
    <div class="max-h-90vh h-full flex flex-col gap-4 pb-4">
      <div class="flex items-center justify-between gap-2">
        <base-datepicker
          label="From"
          layout="vertical"
          v-model="dateFrom"
          autofocus
        />
        <base-datepicker
          label="To"
          layout="vertical"
          v-model="dateTo"
        />
      </div>

      <div class="grid grid-cols-3 gap-2">
        <base-button color="info" variant="filled" class="font-bold" @click="setToday">
          Today
        </base-button>
        <base-button color="info" variant="filled" class="font-bold" @click="setYesterday">
          Yesterday
        </base-button>
        <base-button color="info" variant="filled" class="font-bold" @click="setLastWeek">
          Last Week
        </base-button>
        <base-button color="info" variant="filled" class="font-bold" @click="setThisWeek">
          This Week
        </base-button>
        <base-button color="info" variant="filled" class="font-bold" @click="setLastMonth">
          Last Month
        </base-button>
        <base-button color="info" variant="filled" class="font-bold" @click="setThisMonth">
          This Month
        </base-button>
        <base-button color="info" variant="filled" class="font-bold" @click="setLastYear">
          Last Year
        </base-button>
        <base-button color="info" variant="filled" class="font-bold" @click="setThisYear">
          This Year
        </base-button>
      </div>
    </div>
  </base-modal>
</template>

<style lang="postcss" scoped>
.form-input:read-only {
  @apply !hover:cursor-pointer !text-slate-900 !dark:text-slate-100;
}
</style>
