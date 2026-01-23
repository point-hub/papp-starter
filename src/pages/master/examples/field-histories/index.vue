<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { findExampleApi } from '@/composables/api/master/examples/find-by-id.api';

import CardBreadcrumbs from './card-breadcrumbs.vue';
import CardTable from './card-table.vue';

const route = useRoute();
const example = ref();

onMounted(async () => {
  const response = await findExampleApi(route.params.id as string);

  example.value = response;
});
</script>

<template>
  <div class="content-container">
    <card-breadcrumbs :example_identifier="`${example?.code} - ${example?.name}`" />
    <card-table />
  </div>
</template>
