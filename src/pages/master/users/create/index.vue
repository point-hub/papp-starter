<script setup lang="ts">
import { ref } from 'vue';

import AppContainer from '@/components/app-container.vue';
import { createUserApi } from '@/composables/api/master/users/create.api';
import router from '@/router';
import { toast } from '@/toast';
import { handleError } from '@/utils/api';

import CardBreadcrumbs from './card-breadcrumbs.vue';
import CardEmail from './card-email.vue';
import CardForm from './card-form.vue';
import CardPassword from './card-password.vue';
import CardRole from './card-role.vue';
import { useForm } from './form';

const form = useForm();

const isSaving = ref(false);

const onSave = async () => {
  try {
    isSaving.value = true;
    const response = await createUserApi(form.data);
    if (response?.inserted_id) {
      toast('Create success', { color: 'success' });
      await router.push(`/master/users/${response.inserted_id}`);
    }
  } catch (error) {
    const errorResponse = handleError(error);
    if (errorResponse.errors) {
      form.errors.username = errorResponse.errors.username || [];
      form.errors.name = errorResponse.errors.name || [];
      form.errors.notes = errorResponse.errors.notes || [];
      form.errors.email = errorResponse.errors.email || [];
      form.errors.role_id = errorResponse.errors.role_id || [];
      form.errors.password = errorResponse.errors.password || [];
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
  <app-container>
    <card-breadcrumbs />
    <card-form v-model:data="form.data" v-model:errors="form.errors" v-model:is-saving="isSaving" />
    <card-email v-model:data="form.data" v-model:errors="form.errors" v-model:is-saving="isSaving" />
    <card-role v-model:data="form.data" v-model:errors="form.errors" v-model:is-saving="isSaving" />
    <card-password v-model:data="form.data" v-model:errors="form.errors" v-model:is-saving="isSaving" />
    <div class="flex gap-2">
      <base-button class="flex-1" :is-loading="isSaving" color="primary" @click="onSave">Save</base-button>
    </div>
  </app-container>
</template>
