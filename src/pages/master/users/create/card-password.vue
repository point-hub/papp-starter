<script setup lang="ts">
import { usePassword } from '@/composables/password';

import { type IForm, type IFormError } from './form';

defineProps<{
  validateConfirmationPassword: () => void
  validateNewPassword: () => void
}>();

const data = defineModel<IForm>('data', {
  default: () => ({
    password: '',
    confirm_password: '',
  }),
});
const errors = defineModel<IFormError>('errors', {
  default: () => ({
    password: [],
    confirm_password: [],
  }),
});
const isSaving = defineModel('is-saving', { default: false });
const { type, toggle } = usePassword();
</script>

<template>
  <base-card title="Password">
    <div class="flex flex-col gap-2">
      <base-input
        label="Password"
        required
        :disabled="isSaving"
        :type="type"
        v-model="data.password"
        :errors="errors.password"
        @keyup="validateNewPassword()"
        :reset-errors-on-update="false"
      >
        <template #suffix>
          <button @click="toggle" variant="text" color="secondary">
            <base-icon icon="i-fa7-regular-eye" />
          </button>
        </template>
      </base-input>
      <base-input
        label="Password Confirmation"
        required
        :disabled="isSaving"
        :type="type"
        v-model="data.confirm_password"
        :errors="errors.confirm_password"
        @keyup="validateConfirmationPassword()"
        :reset-errors-on-update="false"
      >
        <template #suffix>
          <button @click="toggle" variant="text" color="secondary">
            <base-icon icon="i-fa7-regular-eye" />
          </button>
        </template>
      </base-input>
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
