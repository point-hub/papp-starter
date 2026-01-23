<script setup lang="ts">
import { type IForm } from './form';

const data = defineModel<IForm>('data', {
  default: () => ({
    code: undefined,
    name: undefined,
    optional_unique: undefined,
    notes: undefined,
  }),
});
</script>

<template>
  <base-card title="Role">
    <div class="flex flex-col gap-4">
      <base-input layout="horizontal" label="Code" readonly v-model="data.code" border="full" />
      <base-input layout="horizontal" label="Name" readonly v-model="data.name" border="full" />
      <base-textarea layout="horizontal" label="Notes" readonly :min-height="128" v-model="data.notes" border="full" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
