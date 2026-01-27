<script setup lang="ts">
import { ref } from 'vue';

import AppContainer from '@/components/app-container.vue';
import { updatePasswordUserApi } from '@/composables/api/master/users/update-password.api';
import { useAuthStore } from '@/stores/auth.store';
import { toast } from '@/toast';
import { handleError } from '@/utils/api';

import CardBreadcrumbs from './card-breadcrumbs.vue';
import CardPassword from './card-password.vue';
import { useForm } from './form';

const form = useForm();

const isSaving = ref(false);
const isLoading = ref(false);
const authStore = useAuthStore();

const onSave = async () => {
  try {
    isSaving.value = true;

    if ((form.errors.new_password?.length ?? 0) > 0) {
      return toast('Please use a strong password', { color: 'danger' });
    }

    if (!form.isPasswordConfirmed.value) {
      form.errors.confirm_password = ['Password do not match'];
      return toast('Password confirmation does not match', { color: 'danger' });
    }

    await updatePasswordUserApi(authStore.authUser?._id as string, form.data);
    form.reset();
    toast('Update success', { color: 'success' });
  } catch (error) {
    const errorResponse = handleError(error);
    if (errorResponse.errors) {
      form.errors.current_password = errorResponse.errors.current_password || [];
      form.errors.new_password = errorResponse.errors.new_password || [];
    }
    if (errorResponse.message) {
      toast(errorResponse.message, {
        lists: errorResponse.lists,
        color: 'danger',
      });
    }
  } finally {
    isSaving.value = false;
  }
};
</script>

<template>
  <app-container :is-loading="isLoading">
    <card-breadcrumbs />

    <card-password
      v-model:data="form.data"
      v-model:errors="form.errors"
      v-model:is-saving="isSaving"
      :validate-new-password="form.validatePassword"
      :validate-confirmation-password="form.validateConfirmationPassword"
    />

    <div class="flex gap-2">
      <base-button class="flex-1" :is-loading="isSaving" color="primary" @click="onSave">Save</base-button>
    </div>
  </app-container>
</template>
