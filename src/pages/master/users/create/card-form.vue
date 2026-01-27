<script setup lang="ts">
import { type IForm, type IFormError } from './form';

const data = defineModel<IForm>('data', {
  default: () => ({
    name: '',
    username: '',
  }),
});
const errors = defineModel<IFormError>('errors', {
  default: () => ({
    name: [],
    username: [],
  }),
});
const isSaving = defineModel('is-saving', { default: false });
</script>

<template>
  <base-card title="User Information">
    <div class="flex flex-col gap-2">
      <base-input required v-model="data.name" label="Name" :errors="errors.name" :disabled="isSaving" />
      <base-input required v-model="data.username" label="Username" :errors="errors.username" :disabled="isSaving" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
