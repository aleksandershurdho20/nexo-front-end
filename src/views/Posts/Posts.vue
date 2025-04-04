<script lang="ts" setup>
import PostForm from '@/forms/PostForm.vue';
import api from '@/utils/api';
import { onMounted, ref } from 'vue';
import type { Post } from '@/types/Posts';


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
const showModal = ref(false);
const currentPost = ref<Post | null>(null);

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

onMounted(async() => {
    await getResults();
})

const handleDelete = async(id: number) => {
    try {
        await api.delete(`/dashboard/posts/${id}`)
        await getResults()
    } catch (error) {
        console.log(error)
    }
}

const openEditModal = (post: Post) => {
    currentPost.value = { ...post };
    showModal.value = true;
}

const closeModal = () => {
    showModal.value = false;
    currentPost.value = null;
}

const handleUpdate = async() => {
    if (!currentPost.value) return;
    
    try {
        await api.put(`/dashboard/posts/${currentPost.value.id}`, {
            title: currentPost.value.title,
            description: currentPost.value.description,
            is_published: currentPost.value.is_published
        });
        await getResults();
        closeModal();
    } catch (error) {
        console.log(error);
    }
}
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
                                <button class="cursor-pointer" @click.prevent="handleDelete(post.id as number)">Delete</button>
                                <button class="cursor-pointer" @click.prevent="openEditModal(post)">Edit</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </template>
    </div>

    <div v-if="showModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
        <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div class="mt-3 text-center">
              <PostForm
                form-title="Edit Post"
                :data="currentPost as Post"

                :onSave="handleUpdate"

              />
                <div class="items-center px-4 py-3">
                   
                    <button @click="closeModal"
                        class="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>