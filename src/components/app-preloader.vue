<template>
  <div id="preloader" ref="preloaderRef" class="preloader">
    <div class="preloader-status">
      <div status class="preloader-status-text">{{ loadingText }}</div>
      <div class="preloader-status-loader">
        <div class="preloader-status-bar" :style="{ width: loaded + '%' }"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, onMounted } from 'vue'
const loaded = ref(0)
const loadingText = ref(`is loading ${loaded.value} %`)
const preloaderRef = ref()
let loadingState: any

onMounted(() => {
  hideBodyOverflow()
  loadingState = setInterval(() => {
    loaded.value += 20
    loadingText.value = `is loading ${loaded.value} %`
  }, 50)
})

watch(loaded, (newLoaded) => {
  if (newLoaded >= 100) {
    clearInterval(loadingState)
    loadingText.value = 'loading complete'
    showBodyOverflow()
    preloaderRef.value.style.display = 'none'
  }
})

const hideBodyOverflow = () => {
  document.body.style.overflow = 'hidden'
}

const showBodyOverflow = () => {
  document.body.style.overflow = ''
}
</script>

<style scoped lang="postcss">
.preloader {
  @apply w-full h-100vh flex flex-col justify-center items-center text-slate-50 bg-slate-900 relative z-50;
}
.preloader-status {
  @apply w-full flex flex-col justify-center items-center;
}
.preloader-status-text {
  @apply text-[28px] mb-[20px];
}
.preloader-status-loader {
  @apply w-full h-[3px];
}
.preloader-status-bar {
  @apply bg-slate-300 h-full;
}
</style>
