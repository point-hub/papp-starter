<script setup lang="ts">
import { ref } from 'vue'
import { inject, type Ref } from 'vue'

import apiConfig from '@/config/api'
import type { IToastRef } from '@/main-app.vue'
import { apiRequest, handleError } from '@/utils/api'

const examples = ref()
const isLoading = ref(false)
const url = ref(`${apiConfig.baseURL}/v1/examples`)
const toastRef = inject<Ref<IToastRef>>('toastRef')

const getRequest = async () => {
  isLoading.value = true
  try {
    const response = await apiRequest.get(url.value)
    examples.value = response.data
  } catch (error) {
    const responseError = handleError(error)
    toastRef?.value.toast(responseError.message ?? '', { color: 'danger' })
  }
  isLoading.value = false
}
</script>

<template>
  <base-card>
    <template #header>API Example</template>
    <p>
      Click the 'GET' button to test the API call. You can use this starter template to build the
      backend API
      <a href="https://github.com/point-hub/papi-starter" target="_blank" class="link">
        https://github.com/point-hub/papi-starter
      </a>
    </p>
    <div class="space-y-4 mt-10">
      <div class="flex items-center gap-4">
        <base-button color="primary" size="sm" @click="getRequest">GET</base-button>
        <base-input v-model="url" class="w-full" />
      </div>

      <article v-if="examples" class="bg-black text-white text-sm rounded-xl p-4">
        <pre><code>{{ examples }}</code></pre>
      </article>
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
