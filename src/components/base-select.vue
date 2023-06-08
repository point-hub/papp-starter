<script lang="ts">
export interface OptionsInterface {
  label: string
  [key: string]: any
}

export interface Props {
  modelValue: any
  placeholder?: string
  border?: 'full' | 'simple' | 'none'
  list: OptionsInterface[]
}
</script>

<script setup lang="ts">
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { computed } from 'vue'

const props = withDefaults(defineProps<Props>(), {
  border: 'simple',
  placeholder: 'Choose one'
})

const clearSelect = () => {
  selected.value = {}
}

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
}>()

const selected = computed({
  set: (obj: any) => {
    emit('update:modelValue', obj)
  },
  get: () => props.modelValue
})
</script>

<template>
  <Listbox v-model="selected">
    <div class="list-box">
      <ListboxButton
        class="list-box-button"
        :class="{
          border: props.border === 'full',
          'border-b': props.border === 'simple'
        }"
      >
        <span v-if="!selected.label" class="block text-slate-400">
          {{ props.placeholder }}
        </span>
        <span v-else class="block">{{ selected.label }}</span>
        <span class="list-box-button-icon">
          <i v-if="!selected.label" class="i-fas-angle-down block h-5 w-5 text-gray-400"></i>
          <i v-else class="i-fas-xmark block h-5 w-5 text-gray-400" @click="clearSelect()"></i>
        </span>
      </ListboxButton>

      <transition>
        <ListboxOptions class="list-box-options">
          <ListboxOption
            v-slot="{ active, selected }"
            v-for="(data, index) in list"
            :key="index"
            :value="data"
            as="template"
          >
            <li
              :class="[
                active ? 'list-box-option-active' : 'list-box-option-inactive',
                'list-box-option'
              ]"
            >
              <span :class="[selected ? 'font-extrabold' : 'font-normal', 'block ']">{{
                data.label
              }}</span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<style lang="postcss" scoped>
.list-box {
  @apply relative w-full cursor-pointer;
}
.list-box-button {
  @apply relative w-full dark:bg-slate-800 dark:border-slate-600 bg-white py-2 pl-3 pr-10 text-left focus-visible:border-indigo-500 sm:text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-orange-300;
}
.list-box-button-icon {
  @apply absolute inset-y-0 right-0 flex items-center pr-2;
}
.list-box-options {
  @apply absolute dark:bg-slate-800 dark:border-slate-600 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 sm:text-sm focus:outline-none z-1;
}
.list-box-option-active {
  @apply bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100;
}
.list-box-option-inactive {
  @apply text-gray-900 dark:text-gray-300;
}
.list-box-option {
  @apply relative select-none py-2 pl-4 pr-4;
}
</style>
