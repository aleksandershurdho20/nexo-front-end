<script lang="ts" setup>
import api from '@/utils/api';
import { onMounted, ref } from 'vue';
import type { Posts } from "@/types/Posts"
const posts = ref<Array<Posts> | null>(null)
onMounted(() => {
    api.get("/dashboard/posts").then(res => posts.value = res.data).catch(err => console.log(err))
})
</script>
<template>

    <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        ID
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Title
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Description
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Published
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Created At
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody>

                <template v-if="posts">
                    <tr v-for="post in posts" :key="post.id"
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ post.id }}
                        </th>
                        <td class="px-6 py-4">
                            {{ post.title }}
                        </td>
                        <td class="px-6 py-4">
                            {{ post.description }}
                        </td>
                        <td class="px-6 py-4">
                            {{ post.is_published ? "Published" : "Draft" }}
                        </td>
                        <td class="px-6 py-4">
                            {{ post.created_at }}
                        </td>
                        <td class="px-6 py-4">
                            <div class="flex gap-5 align-center">
                                <button class="cursor-pointer">Delete</button>
                                <button class="cursor-pointer">Edit</button>
                            </div>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>

</template>