<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { resetPasswordApi } from '@/composables/api/master/auth/reset-password.api.ts';
import { usePassword } from '@/composables/password.ts';
import { toast } from '@/toast.ts';
import { handleError } from '@/utils/api.ts';

import { useForm } from './form.ts';

const route = useRoute();
const router = useRouter();
const form = useForm();
const passwordStore = reactive(usePassword());

const isLoading = ref(false);
const onSubmit = async () => {
  try {
    isLoading.value = true;

    if ((form.errors.value.password?.length ?? 0) > 0) {
      return toast('Please use strong password', { color: 'danger' });
    }

    if (!form.isPasswordConfirmed.value) {
      form.errors.value.confirm_password = ['Password do not match'];
      return toast('Password confirmation not match', { color: 'danger' });
    }

    const response = await resetPasswordApi({
      code: route.query.code as string,
      password: form.data.value.password,
    });
    if (response?.modified_count === 1) {
      form.reset();
      toast('Reset password success', { color: 'success' });
      router.push('/signin');
    }
  } catch (error) {
    const errorResponse = handleError(error);
    if (errorResponse.errors) {
      form.errors.value = {
        password: errorResponse.errors.password || [],
        confirm_password: errorResponse.errors.confirm_password || [],
      };
    }
    if (errorResponse.message) {
      toast(errorResponse.message, {
        lists: errorResponse.lists,
        color: 'danger',
      });
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <base-card title="Reset Password" class="max-w-xl">
    <form @submit.prevent="onSubmit" class="flex flex-col gap-8">
      <div class="flex flex-col gap-4">
        <base-input label="New Password" layout="vertical"
          required
          :disabled="isLoading"
          :type="passwordStore.type"
          v-model="form.data.value.password"
          :errors="form.errors?.value.password"
          @keyup="form.validatePassword()"
          :reset-errors-on-update="false"
        >
          <template #suffix>
            <base-button @click="passwordStore.toggle" variant="text" color="secondary">
              <base-icon icon="i-fa7-regular:eye" />
            </base-button>
          </template>
        </base-input>
        <base-input label="Password Confirmation" layout="vertical"
          required
          :disabled="isLoading"
          :type="passwordStore.type"
          v-model="form.data.value.confirm_password"
          :errors="form.errors?.value.confirm_password"
          @keyup="form.validateConfirmationPassword()"
          :reset-errors-on-update="false"
        >
          <template #suffix>
            <base-button @click="passwordStore.toggle" variant="text" color="secondary">
              <base-icon icon="i-fa7-regular:eye" />
            </base-button>
          </template>
        </base-input>
      </div>
      <base-button :is-loading="isLoading" color="primary" @click="onSubmit">Reset Password</base-button>
    </form>
    <div class="mt-4">Remember your password? <router-link to="/signin" class="text-blue-600">Sign In</router-link></div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
