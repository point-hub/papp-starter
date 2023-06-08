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
  helper?: string
  errors?: string[]
}
</script>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot
} from '@headlessui/vue'

const props = withDefaults(defineProps<Props>(), {
  border: 'simple',
  placeholder: 'Choose one'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
}>()

const selected = computed({
  set: (obj: any) => {
    emit('update:modelValue', obj)
  },
  get: () => props.modelValue
})

let query = ref('')

let filtered = computed(() =>
  query.value === ''
    ? props.list
    : props.list.filter((data) =>
        data.label
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.value.toLowerCase().replace(/\s+/g, ''))
      )
)
</script>

<template>
  <Combobox v-model="selected">
    <div class="relative mt-1">
      <div class="relative">
        <ComboboxInput
          class="form-input"
          :placeholder="placeholder"
          :class="{
            border: props.border === 'full',
            'border-none p-0': props.border === 'none',
            'border-t-none border-x-none border-b': props.border === 'simple'
          }"
          :displayValue="(data) => (data as OptionsInterface).label"
          @change="query = $event.target.value"
        />
        <ComboboxButton
          v-if="Object.keys(selected).length === 0"
          class="absolute inset-y-0 right-0 flex items-center pr-2"
        >
          <i class="i-far-angle-down block"></i>
        </ComboboxButton>
        <button
          v-if="Object.keys(selected).length > 0"
          class="absolute inset-y-0 right-0 flex items-center pr-2"
          @click="selected = {}"
        >
          <i class="i-far-xmark block"></i>
        </button>
        <slot name="helper" v-if="helper">
          <span class="text-xs text-slate-500">{{ helper }}</span>
        </slot>
        <slot name="error" v-if="errors">
          <p class="text-xs text-danger" v-for="(error, index) in errors" :key="index">
            {{ error }}
          </p>
        </slot>
      </div>
      <TransitionRoot
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        @after-leave="query = ''"
      >
        <ComboboxOptions class="options">
          <div
            v-if="filtered.length === 0 && query !== ''"
            class="relative cursor-default select-none px-4 py-2 text-gray-700"
          >
            Nothing found.
          </div>

          <ComboboxOption
            v-for="data in filtered"
            as="template"
            :key="data.id"
            :value="data"
            v-slot="{ selected, active }"
          >
            <li
              class="option"
              :class="{
                'option-active': active,
                'option-inactive': !active
              }"
            >
              <span class="block" :class="{ 'font-medium': selected, 'font-normal': !selected }">
                {{ data.label }}
              </span>
            </li>
          </ComboboxOption>
        </ComboboxOptions>
      </TransitionRoot>
    </div>
  </Combobox>
</template>

<style lang="postcss" scoped>
.options {
  @apply absolute dark:bg-slate-800 dark:border-slate-600 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 sm:text-sm focus:outline-none z-1;
}
.option {
  @apply relative cursor-pointer select-none py-2 px-4;
}
.option-active {
  @apply bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100;
}
.option-inactive {
  @apply text-gray-900 dark:text-gray-300;
}
</style>
