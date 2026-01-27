<script setup lang="ts">
import { onMounted, ref } from 'vue';

import AppContainer from '@/components/app-container.vue';
import { findUserApi } from '@/composables/api/master/users/find-by-id.api';
import { updateUsernameUserApi } from '@/composables/api/master/users/update-username.api';
import { useAuthStore } from '@/stores/auth.store';
import { toast } from '@/toast';
import { handleError } from '@/utils/api';

import CardBreadcrumbs from './card-breadcrumbs.vue';
import CardForm from './card-form.vue';
import { useForm } from './form';

const form = useForm();
const authStore = useAuthStore();

const isSaving = ref(false);
const isLoading = ref(false);

onMounted(async () => {
  try {
    isLoading.value = true;

    const response = await findUserApi(authStore.authUser?._id as string);

    form.data.username = response.username;
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
    await updateUsernameUserApi(authStore.authUser?._id as string, form.data);
    toast('Update success', { color: 'success' });

    window.location.reload();
  } catch (error) {
    const errorResponse = handleError(error);
    if (errorResponse.errors) {
      form.errors.username = errorResponse.errors.username || [];
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
    <card-form v-model:data="form.data" v-model:errors="form.errors" v-model:is-saving="isSaving" />
    <div class="flex gap-2">
      <base-button class="flex-1" :is-loading="isSaving" color="primary" @click="onSave">Save</base-button>
    </div>
  </app-container>
</template>
