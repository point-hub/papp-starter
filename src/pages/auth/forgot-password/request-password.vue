<script setup lang="ts">
import { ref } from 'vue';

import { requestPasswordApi } from '@/composables/api/master/auth/request-password.api';
import { toast } from '@/toast';
import { handleError } from '@/utils/api';

import { useForm } from './form';
import RequestPasswordSuccess from './request-password-success.vue';

const form = useForm();
const isRequestPasswordSuccess = ref(false);

const isLoading = ref(false);
const onSubmit = async () => {
  try {
    isLoading.value = true;
    await requestPasswordApi({ email: form.data.value.email });
    isRequestPasswordSuccess.value = true;
  } catch (error) {
    const errorResponse = handleError(error);
    if (errorResponse.errors) {
      form.errors.value.email = errorResponse.errors.email || [];
      return;
    }
    if (errorResponse.message) {
      toast(errorResponse.message, {
        lists: errorResponse.lists,
        color: 'danger',
        timer: 5000,
      });
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <base-card class="max-w-xl" v-if="isRequestPasswordSuccess === false">
    <form @submit.prevent="onSubmit" class="flex flex-col gap-8">
      <div class="flex flex-col gap-4">
        <base-input
          v-model="form.data.value.email"
          :errors="form.errors.value.email"
          :disabled="isLoading"
          label="Email"
          layout="vertical"
          autofocus
        />
      </div>
      <base-button type="submit" color="primary" :is-loading="isLoading">
        Request Reset Password
      </base-button>
    </form>
    <div class="mt-4">Remember Password ? <router-link to="/signin" class="text-blue-600">Sign In</router-link></div>
  </base-card>
  <request-password-success :email="form.data.value.email" v-else />
</template>

<style scoped lang="postcss"></style>
