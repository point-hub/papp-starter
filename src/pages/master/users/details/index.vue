<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import AppContainer from '@/components/app-container.vue';
import StatusBanner from '@/components/status-banner.vue';
import { findUserApi } from '@/composables/api/master/users/find-by-id.api';
import { toast } from '@/toast';
import { handleError } from '@/utils/api';

import CardActions from '../components/card-actions.vue';
import CardBreadcrumbs from './card-breadcrumbs.vue';
import CardEmail from './card-email.vue';
import CardForm from './card-form.vue';
import CardInternalNotes from './card-internal-notes.vue';
import CardRole from './card-role.vue';
import { useForm } from './form';

const form = useForm();
const route = useRoute();

const isLoading = ref(false);

onMounted(async () => {
  try {
    isLoading.value = true;
    const response = await findUserApi(route.params.id as string);
    form.data._id = response._id;
    form.data.username = response.username;
    form.data.name = response.name;
    form.data.email = response.email;
    form.data.notes = response.notes;
    form.data.role = response.role;
    form.data.is_archived = response.is_archived;
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

const onArchived = async () => {
  form.data.is_archived = true;
};

const onRestored = async () => {
  form.data.is_archived = false;
};
</script>

<template>
  <app-container :is-loading="isLoading">
    <card-breadcrumbs />

    <card-actions v-model:data="form.data" @restored="onRestored" @archived="onArchived" />

    <status-banner v-if="form.data.is_archived" status-type="danger" message="This data has been archived." />

    <base-card v-if="!form.data._id">
      Data Not Found
    </base-card>
    <template v-else>
      <card-form v-model:data="form.data" />
      <card-email v-model:data="form.data" />
      <card-role v-model:data="form.data" />
      <card-internal-notes v-model:data="form.data" />
    </template>
  </app-container>
</template>
