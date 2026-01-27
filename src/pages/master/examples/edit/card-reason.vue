<script setup lang="ts">
import type { IForm, IFormError } from './form';

const data = defineModel<IForm>('data', {
  default: () => ({
    reason: undefined,
  }),
});
const errors = defineModel<IFormError>('errors', {
  default: () => ({
    reason: [],
  }),
});
const isSaving = defineModel('is-saving', { default: false });
</script>

<template>
  <base-card title="Reason">
    <div class="flex flex-col gap-2">
      <p>Leaving a reason helps you remember why you updated it.</p>
      <base-textarea
        :min-height="128"
        v-model="data.update_reason"
        :errors="errors.update_reason"
        :disabled="isSaving"
      />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
