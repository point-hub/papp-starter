<script setup lang="ts">
import { type IForm, type IFormError } from './form';

const data = defineModel<IForm>('data', {
  default: () => ({
    email: '',
  }),
});
const errors = defineModel<IFormError>('errors', {
  default: () => ({
    email: [],
  }),
});
const isSaving = defineModel('is-saving', { default: false });
</script>

<template>
  <base-card>
    <div class="flex flex-col">
      <base-input
        label="Email Address"
        required
        v-model="data.email"
        :errors="errors.email"
        :disabled="isSaving"
        description="Please enter a valid email address, as you need to confirm it to receive emails." />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
