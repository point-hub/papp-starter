<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { findRoleApi } from '@/composables/api/master/roles/find-by-id.api';

import CardBreadcrumbs from './card-breadcrumbs.vue';
import CardTable from './card-table.vue';

const route = useRoute();
const role = ref();

onMounted(async () => {
  const response = await findRoleApi(route.params.id as string);

  role.value = response;
});
</script>

<template>
  <div class="content-container">
    <card-breadcrumbs :role_identifier="`${role?.code} - ${role?.name}`" />
    <card-table />
  </div>
</template>
