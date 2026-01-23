<script setup lang="ts">
import { computed } from 'vue';

type StatusType = 'info' | 'warning' | 'danger';

const props = defineProps<{
  message: string;
  statusType?: StatusType;
}>();

const config = computed(() => {
  switch (props.statusType) {
  case 'danger':
    return {
      cardBg: 'red',
      textColor: 'text-red-200',
      iconBg: 'bg-red-200',
      icon: 'i-fa7-solid:warning',
    };
  case 'warning':
    return {
      cardBg: 'yellow',
      textColor: 'text-yellow-800',
      iconBg: 'bg-yellow-800',
      icon: 'i-fa7-solid:warning',
    };
  default:
    return {
      cardBg: 'blue',
      textColor: 'text-blue-200',
      iconBg: 'bg-blue-200',
      icon: 'i-fa7-solid:circle-info',
    };
  }
});
</script>

<template>
  <base-card :bg-color="config.cardBg" body-color="white">
    <div class="flex items-start gap-2">
      <div
        :class="[
          config.icon,
          config.iconBg,
          'flex-shrink-0 self-start text-2xl'
        ]"
      />
      <p :class="['uppercase font-bold', config.textColor]">
        {{ message }}
      </p>
    </div>
  </base-card>
</template>
