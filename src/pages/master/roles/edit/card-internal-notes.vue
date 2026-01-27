<script setup lang="ts">
import { type IForm, type IFormError } from './form';

const data = defineModel<IForm>('data', {
  default: () => ({
    notes: '',
  }),
});
const errors = defineModel<IFormError>('errors', {
  default: () => ({
    notes: [],
  }),
});
const isSaving = defineModel('is-saving', { default: false });
</script>

<template>
  <base-card title="Internal Notes">
    <div class="flex flex-col gap-2">
      <base-textarea :min-height="128" v-model="data.notes" :errors="errors.notes" :disabled="isSaving" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
