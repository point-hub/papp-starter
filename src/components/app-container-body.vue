<script setup lang="ts">
interface IProps {
  isExists?: boolean | undefined
}
withDefaults(defineProps<IProps>(), {
  isExists: false,
});

</script>

<template>
  <base-card v-if="!isExists">
    Data Not Found
  </base-card>
  <template v-else>
    <slot />
  </template>
</template>