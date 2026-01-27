<script setup lang="ts">
import { onMounted } from 'vue';

import { retrieveCounterApi } from '@/composables/api/counters/retrieve.api';

import { genderOptions } from '../gender';
import { type IForm, type IFormError } from './form';

const data = defineModel<IForm>('data', {
  default: () => ({
    code: undefined,
    name: undefined,
    composite_unique_1: undefined,
    composite_unique_2: undefined,
    age: undefined,
    gender: undefined,
    optional_unique: undefined,
  }),
});
const errors = defineModel<IFormError>('errors', {
  default: () => ({
    code: [],
    name: [],
    composite_unique_1: [],
    composite_unique_2: [],
    age: [],
    gender: [],
    optional_unique: [],
  }),
});
const isSaving = defineModel('is-saving', { default: false });

onMounted(async () => {
  const counter = await retrieveCounterApi('examples');
  data.value.code = counter.value;
});
</script>

<template>
  <base-card>
    <template #header>Examples</template>

    <div class="flex flex-col gap-4 my-5">
      <base-input layout="horizontal" label="Code" required v-model="data.code" :errors="errors.code" :disabled="isSaving" />
      <base-input layout="horizontal" label="Name" required v-model="data.name" :errors="errors.name" :disabled="isSaving" />
      <base-input layout="horizontal" label="Composite Unique 1" required v-model="data.composite_unique_1" :errors="errors.composite_unique_1" :disabled="isSaving" />
      <base-input layout="horizontal" label="Composite Unique 2" required v-model="data.composite_unique_2" :errors="errors.composite_unique_2" :disabled="isSaving" />
      <base-input-number layout="horizontal" label="Age" align="left" v-model="data.age" :errors="errors.age" :disabled="isSaving" />
      <base-select layout="horizontal" label="Gender" placeholder="Select" required v-model:selected-value="data.gender" :options="genderOptions" :errors="errors.gender" :disabled="isSaving" />
      <base-input layout="horizontal" label="Optional Unique" v-model="data.optional_unique" :errors="errors.optional_unique" :disabled="isSaving" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
