<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { usePassword } from '@/composables/password';
import { useAuthStore } from '@/stores/auth.store';
import { toast } from '@/toast';
import { handleError } from '@/utils/api';

import { useForm } from './form';

const form = useForm();
const password = reactive(usePassword());
const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const isLoading = ref(false);
const onSubmit = async () => {
  try {
    isLoading.value = true;

    await authStore.signin(form.data.value.username, form.data.value.password, form.data.value.remember_me);

    router.replace(route.query.redirect?.toString() || '/');
  } catch (error) {
    const errorResponse = handleError(error);
    if (errorResponse.errors) {
      form.errors.value.username = errorResponse.errors.username || [];
      form.errors.value.password = errorResponse.errors.password || [];
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
  <base-card class="max-w-xl p-8!" shadow>
    <form @submit.prevent="onSubmit" class="flex flex-col gap-8 relative">
      <div class="flex flex-col gap-4">
        <h1 class="font-semibold text-2xl">Sign in</h1>

        <div class="flex flex-col gap-4">
          <base-input autofocus :disabled="isLoading" v-model="form.data.value.username"
            :errors="form.errors.value.username" label="Username / Email" border="simple" layout="vertical" />
          <base-input :disabled="isLoading" :type="password.type" v-model="form.data.value.password"
            :errors="form.errors.value.password" label="Password" border="simple" layout="vertical">
            <template #suffix>
              <BaseButton @click="password.toggle" variant="text" color="secondary">
                <BaseIcon icon="i-fa7-regular:eye" />
              </BaseButton>
            </template>
          </base-input>
          <div class="flex justify-between">
            <base-checkbox v-model="form.data.value.remember_me" text="Remember Me" :disabled="isLoading" />
            <router-link class="text-blue-600" to="/forgot-password">Forgot Password</router-link>
          </div>
          <div>
            <base-button size="lg" type="submit" is-block :is-loading="isLoading" color="primary">
              Sign In
            </base-button>
          </div>
        </div>
      </div>
    </form>
  </base-card>
</template>

<style scoped lang="postcss"></style>
