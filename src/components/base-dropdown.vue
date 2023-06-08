<script lang="ts">
interface Props {
  position?: 'left' | 'right'
}
</script>

<script setup lang="ts">
import { Menu, MenuButton, MenuItems } from '@headlessui/vue'

const props = withDefaults(defineProps<Props>(), {
  position: 'left'
})
</script>

<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton class="">
        <slot name="trigger">
          <div
            class="w-full inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            <span>Options</span>
            <i class="i-far-angle-down ml-2 block"></i>
          </div>
        </slot>
      </MenuButton>
    </div>

    <transition>
      <MenuItems
        class="absolute z-10 mt-2 w-56 origin-top-right cursor-pointer rounded-md bg-white text-sm shadow-lg ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 dark:bg-slate-700 focus:outline-none dark:divide-gray-700"
        :class="{ 'left-0': props.position === 'left', 'right-0': props.position === 'right' }"
      >
        <slot></slot>
      </MenuItems>
    </transition>
  </Menu>
</template>
