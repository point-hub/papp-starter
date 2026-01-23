<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { findUserApi } from '@/composables/api/master/users/find-by-id.api';

import CardBreadcrumbs from './card-breadcrumbs.vue';
import CardTable from './card-table.vue';

const route = useRoute();
const user = ref();

onMounted(async () => {
  const response = await findUserApi(route.params.id as string);

  user.value = response;
});
</script>

<template>
  <div class="content-container">
    <card-breadcrumbs :user_identifier="`${user?.username}`" />
    <card-table />
  </div>
</template>
