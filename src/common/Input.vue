<script setup lang="ts">
import { defineEmits, useAttrs } from 'vue';

const emit = defineEmits(["update:modelValue"]);
const attrs = useAttrs();
</script>

<template>
  <div>
    <label v-if="attrs.label" :for="attrs.id as string" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      {{ attrs.label }}
    </label>
    <input
      v-bind="attrs"
      :value="attrs.modelValue"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    />
  </div>
</template>
