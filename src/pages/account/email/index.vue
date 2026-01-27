<script setup lang="ts">
import { onMounted, ref } from 'vue';

import AppContainer from '@/components/app-container.vue';
import PasswordConfirmationModal from '@/components/password-confirmation-modal/index.vue';
import { findUserApi } from '@/composables/api/master/users/find-by-id.api';
import { updateEmailUserApi } from '@/composables/api/master/users/update-email.api';
import { useAuthStore } from '@/stores/auth.store';
import { toast } from '@/toast';
import { handleError } from '@/utils/api';

import CardBreadcrumbs from './card-breadcrumbs.vue';
import CardEmail from './card-email.vue';
import { useForm } from './form';

const form = useForm();

const isSaving = ref(false);
const isLoading = ref(false);
const authStore = useAuthStore();

onMounted(async () => {
  try {
    isLoading.value = true;
    const response = await findUserApi(authStore.authUser?._id as string);
    form.data.email = response.email;
  } catch (error) {
    const errorResponse = handleError(error);
    if (errorResponse.message) {
      toast(errorResponse.message, {
        lists: errorResponse.lists,
        color: 'danger',
      });
    }
  } finally {
    isLoading.value = false;
  }
});

const onSave = async () => {
  try {
    isSaving.value = true;
    await updateEmailUserApi(authStore.authUser?._id as string, form.data);
    toast('Update success, Until verification is completed, your account will continue to use your existing email address.', { color: 'success', timer: 10000 });
  } catch (error) {
    const errorResponse = handleError(error);
    if (errorResponse.errors) {
      form.errors.email = errorResponse.errors.email || [];
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

const passwordConfirmationModalRef = ref();
const onSubmit = () => {
  passwordConfirmationModalRef.value.toggleModal();
};
const onPasswordConfirmed = async () => {
  await onSave();
};
</script>

<template>
  <password-confirmation-modal ref="passwordConfirmationModalRef" @confirmed="onPasswordConfirmed" />
  <app-container :is-loading="isLoading">
    <card-breadcrumbs />

    <card-email v-model:data="form.data" v-model:errors="form.errors" v-model:is-saving="isSaving" />

    <div class="flex gap-2">
      <base-button class="flex-1" :is-loading="isSaving" color="primary" @click="onSubmit">Save</base-button>
    </div>
  </app-container>
</template>
