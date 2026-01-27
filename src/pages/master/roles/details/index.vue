<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import AppContainer from '@/components/app-container.vue';
import { findRoleApi } from '@/composables/api/master/roles/find-by-id.api';
import { toast } from '@/toast';
import { handleError } from '@/utils/api';

import StatusBanner from '../../../../components/status-banner.vue';
import CardActions from '../components/card-actions.vue';
import CardBreadcrumbs from './card-breadcrumbs.vue';
import CardForm from './card-form.vue';
import CardInternalNotes from './card-internal-notes.vue';
import CardPermissions from './card-permissions.vue';
import { useForm } from './form';

const route = useRoute();
const form = useForm();

const isLoading = ref(false);

onMounted(async () => {
  try {
    isLoading.value = true;
    const response = await findRoleApi(route.params.id as string);
    if (response) {
      form.data._id = response._id;
      form.data.code = response.code;
      form.data.name = response.name;
      form.data.notes = response.notes;
      form.data.is_archived = response.is_archived;
      form.data.permissions = response.permissions;
    }
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
      <card-permissions v-model:data="form.data" />
      <card-internal-notes v-model:data="form.data" />
    </template>
  </app-container>
</template>
