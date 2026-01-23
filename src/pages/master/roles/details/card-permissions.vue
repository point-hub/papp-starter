<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue';

import { getPermissionsApi } from '@/composables/api/master/permissions/get.api';

import { type IForm } from './form';

const data = defineModel<IForm>('data', {
  default: () => ({
    permissions: [],
  }),
});


watchEffect(() => {
  if (!Array.isArray(data.value.permissions)) {
    data.value.permissions = [];
  }
});

const toResourceActions = (list: { name: string }[]) => {
  const result: Record<string, string[]> = {};

  for (const { name } of list) {
    const [resource, action] = name.split(':');
    if (!resource || !action) continue;

    result[resource] ??= [];
    if (!result[resource].includes(action)) {
      result[resource].push(action);
    }
  }

  return result;
};

const availablePermissions = ref<Record<string, string[]>>({});

const hasPermission = (resource: string, action: string) => {
  return data.value.permissions?.includes(`${resource}:${action}`);
};

onMounted(async () => {
  const response = await getPermissionsApi();
  availablePermissions.value = toResourceActions(response.data);
});
</script>

<template>
  <base-card title="Permissions">
    <BaseTabGroup as="div" class="dark:bg-slate-800">
      <BaseTabList class="tablist">
        <BaseTab as="template" v-slot="{ selected }">
          <a class="tab" :class="{ 'border-b-2 !border-slate-500': selected }">
            Master
          </a>
        </BaseTab>
        <BaseTab as="template" v-slot="{ selected }">
          <a class="tab" :class="{ 'border-b-2 !border-slate-500': selected }">
            Administrator
          </a>
        </BaseTab>
      </BaseTabList>

      <BaseTabPanels class="flex-1 text-sm p-4">
        <!-- MASTER -->
        <BaseTabPanel>
          <div class="flex flex-col gap-4">
            <div v-if="availablePermissions.master" class="flex flex-col lg:flex-row lg:gap-8">
              <p class="uppercase font-bold lg:w-48">Menu Master</p>
              <div v-for="action in availablePermissions.master" :key="action">
                <base-checkbox
                  class="uppercase"
                  :text="action"
                  :model-value="hasPermission('master', action)"
                  disabled
                />
              </div>
            </div>

            <div v-if="availablePermissions.users" class="flex flex-col lg:flex-row lg:gap-8">
              <p class="uppercase font-bold lg:w-48">Users</p>
              <div v-for="action in availablePermissions.users" :key="action">
                <base-checkbox
                  class="uppercase"
                  :text="action"
                  :model-value="hasPermission('users', action)"
                  disabled
                />
              </div>
            </div>

            <div v-if="availablePermissions.roles" class="flex flex-col lg:flex-row lg:gap-8">
              <p class="uppercase font-bold lg:w-48">Roles</p>
              <div v-for="action in availablePermissions.roles" :key="action">
                <base-checkbox
                  class="uppercase"
                  :text="action"
                  :model-value="hasPermission('roles', action)"
                  disabled
                />
              </div>
            </div>
          </div>
        </BaseTabPanel>

        <!-- ADMINISTRATOR -->
        <BaseTabPanel>
          <div class="flex flex-col gap-4">
            <div v-if="availablePermissions.administrator" class="flex flex-col lg:flex-row lg:gap-8">
              <p class="uppercase font-bold lg:w-48">Menu Administrator</p>
              <div v-for="action in availablePermissions.administrator" :key="action">
                <base-checkbox
                  class="uppercase"
                  :text="action"
                  :model-value="hasPermission('administrator', action)"
                  disabled
                />
              </div>
            </div>

            <div v-if="availablePermissions['audit-logs']" class="flex flex-col lg:flex-row lg:gap-8">
              <p class="uppercase font-bold lg:w-48">Audit Logs</p>
              <div v-for="action in availablePermissions['audit-logs']" :key="action">
                <base-checkbox
                  class="uppercase"
                  :text="action"
                  :model-value="hasPermission('audit-logs', action)"
                  disabled
                />
              </div>
            </div>
          </div>
        </BaseTabPanel>
      </BaseTabPanels>
    </BaseTabGroup>
  </base-card>
</template>

<style scoped lang="postcss">
.tablist {
  @apply flex overflow-x-auto pt-4 border-b border-slate-200 dark:border-[#191e3a];
}
.tab {
  @apply flex pb-2 px-4 gap-2 items-center -mb-[1px] whitespace-nowrap outline-none;
}
</style>
