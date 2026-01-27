<script setup lang="ts">
import { type IForm } from './form';

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
</script>

<template>
  <base-card title="Example">
    <div class="flex flex-col gap-4">
      <base-input layout="horizontal" label="Code" readonly v-model="data.code" border="full" />
      <base-input layout="horizontal" label="Name" readonly v-model="data.name" border="full" />
      <base-input layout="horizontal" label="Composite Unique 1" readonly v-model="data.composite_unique_1" border="full" />
      <base-input layout="horizontal" label="Composite Unique 2" readonly v-model="data.composite_unique_2" border="full" />
      <base-input-number layout="horizontal" label="Age" readonly v-model="data.age" align="left" border="full" />
      <base-input layout="horizontal" label="Gender" readonly v-model="data.gender" border="full" />
      <base-input layout="horizontal" label="Optional Unique" readonly v-model="data.optional_unique" border="full" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
