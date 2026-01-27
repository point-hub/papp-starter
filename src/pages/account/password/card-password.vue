<script setup lang="ts">
import { type IForm, type IFormError } from './form';
import { usePassword } from './password';

defineProps<{
  validateConfirmationPassword: () => void
  validateNewPassword: () => void
}>();

const data = defineModel<IForm>('data', {
  default: () => ({
    current_password: '',
    new_password: '',
    password_confirmation: '',
  }),
});
const errors = defineModel<IFormError>('errors', {
  default: () => ({
    current_password: [],
    new_password: [],
    password_confirmation: [],
  }),
});
const isSaving = defineModel('is-saving', { default: false });
const { type, toggle } = usePassword();
</script>

<template>
  <base-card title="Password">
    <div class="flex flex-col gap-2">
      <base-input label="Current Password"
        required
        :disabled="isSaving"
        :type="type"
        v-model="data.current_password"
        :errors="errors.current_password"
      >
        <template #suffix>
          <button @click="toggle" variant="text" color="secondary">
            <base-icon icon="i-fa7-regular-eye" />
          </button>
        </template>
      </base-input>
      <base-input
        label="New Password"
        required
        :disabled="isSaving"
        :type="type"
        v-model="data.new_password"
        :errors="errors.new_password"
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
        v-model="data.password_confirmation"
        :errors="errors.password_confirmation"
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
