<script setup lang="ts">
interface IProps {
  isLoading?: boolean
}
const props = withDefaults(defineProps<IProps>(), {
  isLoading: false,
});

</script>

<template>
  <base-card v-if="props.isLoading">
    <base-loader type="classic" sample="2" />
  </base-card>
  <div v-else class="content-container">
    <slot></slot>
  </div>
</template>