<script lang="ts" setup>
import api from '@/utils/api';
import { onMounted, ref } from 'vue';
import { TailwindPagination } from 'laravel-vue-pagination';

interface Post {
    id: number;
    title: string;
    description: string;
    is_published: boolean;
    created_at: string;
}

interface PaginatedData {
    current_page: number;
    data: Post[];
    first_page_url: string;
    from: number | null;
    last_page: number;
    last_page_url: string;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number | null;
    total: number;
}

const laravelData = ref<PaginatedData | null>(null);
const isLoading = ref(true);

const getResults = async (page = 1) => {
    isLoading.value = true;
    try {
        const response = await api.get<PaginatedData>(`/dashboard/posts?page=${page}`);
        laravelData.value = response.data;
    } catch (err) {
        console.error('Error fetching posts:', err);
    } finally {
        isLoading.value = false;
    }
}

onMounted(async() =>{
await getResults();

})
</script>

<template>
    <div class="relative overflow-x-auto">
        <div v-if="isLoading" class="text-center py-4">
            Loading posts...
        </div>

        <div v-else-if="laravelData?.total === 0" class="text-center py-4">
            No posts found. Create your first post!
        </div>

        <template v-else>
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">ID</th>
                        <th scope="col" class="px-6 py-3">Title</th>
                        <th scope="col" class="px-6 py-3">Description</th>
                        <th scope="col" class="px-6 py-3">Published</th>
                        <th scope="col" class="px-6 py-3">Created At</th>
                        <th scope="col" class="px-6 py-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="post in laravelData?.data" :key="post.id"
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ post.id }}
                        </th>
                        <td class="px-6 py-4">{{ post.title }}</td>
                        <td class="px-6 py-4">{{ post.description }}</td>
                        <td class="px-6 py-4">{{ post.is_published ? "Published" : "Draft" }}</td>
                        <td class="px-6 py-4">{{ post.created_at }}</td>
                        <td class="px-6 py-4">
                            <div class="flex gap-5 align-center">
                                <button class="cursor-pointer">Delete</button>
                                <button class="cursor-pointer">Edit</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            {{ console.log(laravelData,"laravelData") }}
            <TailwindPagination
            :data="laravelData"
            @pagination-change-page="getResults"            
                class="mt-4"
            />
            
        </template>
    </div>
</template>