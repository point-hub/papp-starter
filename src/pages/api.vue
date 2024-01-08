<script setup lang="ts">
import { BaseButton, BaseCard } from '@point-hub/papp'
import { ref } from 'vue'

import axios from '@/axios'
import apiConfig from '@/config/api'

const examples = ref()

const getRequest = async () => {
  const response = await axios.get(`${apiConfig.baseURL}/v1/examples`)

  examples.value = response.data
}
</script>

<template>
  <h1>API Example</h1>
  <component :is="BaseCard">
    <div class="space-y-4">
      <div class="flex items-center gap-4">
        <component :is="BaseButton" color="primary" size="sm" @click="getRequest">Get</component>
        <p>https://papi.starter.pointhub.net/v1/examples</p>
      </div>
      <article class="bg-black text-white text-sm rounded-xl p-4">
        <pre><code>{{ examples }}</code></pre>
      </article>
    </div>
  </component>
</template>

<style scoped lang="postcss"></style>
