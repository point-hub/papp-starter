<script setup lang="ts">
import { onMounted } from 'vue';

import { retrieveCounterApi } from '@/composables/api/counters/retrieve.api';

import { type IForm, type IFormError } from './form';

const data = defineModel<IForm>('data', {
  default: () => ({
    code: undefined,
    name: undefined,
    notes: undefined,
    permissions: undefined,
  }),
});
const errors = defineModel<IFormError>('errors', {
  default: () => ({
    code: [],
    name: [],
    notes: [],
    permissions: [],
  }),
});
const isSaving = defineModel('is-saving', { default: false });

onMounted(async () => {
  const counter = await retrieveCounterApi('roles');
  data.value.code = counter.value;
});
</script>

<template>
  <base-card title="role">
    <div class="flex flex-col gap-4 my-5">
      <base-input layout="horizontal" label="Code" required v-model="data.code" :errors="errors.code" :disabled="isSaving" />
      <base-input layout="horizontal" label="Name" required v-model="data.name" :errors="errors.name" :disabled="isSaving" />
      <base-textarea layout="horizontal" label="Notes" :min-height="128" v-model="data.notes" :errors="errors.notes" :disabled="isSaving" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
