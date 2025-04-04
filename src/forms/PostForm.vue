<script setup lang="ts">
import type { PostFormProps } from '@/types/Posts';
const {formTitle,data,onSave}= defineProps<PostFormProps>()
</script>

<template>
    <div>
        {{formTitle}}
        <form class="max-w-sm mx-auto">
            <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                Title</label>
            <textarea id="title" rows="4" v-model="data.title"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Leave a comment..."></textarea>
            <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                Description</label>
            <textarea id="description" rows="4" v-model="data.description"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Leave a comment..."></textarea>
            <button
                class="text-white mt-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                @click.prevent="onSave()">
            {{data.id ? "Edit" :"Create"}}
            </button>
        </form>
    </div>
</template>