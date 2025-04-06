<script setup lang="ts">

import { onMounted, reactive, ref } from 'vue';
import TheWelcome from '../components/TheWelcome.vue'
import api from '@/utils/api';
import Footer from '@/common/Footer.vue';

const posts = ref([])
const showCommentInput = reactive({})
const data = reactive({
    content: ""
})
onMounted(async () => {
    try {
        const response = await api.get("/posts");
        console.log(response.data); // Log the data to check its structure
        posts.value = response.data;
    } catch (error) {
        throw error
    }
})
const toggleLike = (post) => {
    post.isLiked = !post.isLiked;
    if (post.isLiked && post.isDisliked) {
        post.isDisliked = false;
    }
};

const toggleDislike = (post) => {
    post.isDisliked = !post.isDisliked;
    if (post.isDisliked && post.isLiked) {
        post.isLiked = false;
    }
};

const toggleCommentInput = (post) => {
    showCommentInput[post.id] = !showCommentInput[post.id];

};

const toggleFavorite = (post) => {
    post.isFavorite = !post.isFavorite;
};

const sharePost = (post) => {

    if (navigator.share) {
        navigator.share({
            title: post.title,
            text: post.description,
            url: window.location.href
        });
    } else {
        alert('Share functionality: Copy link to post: ' + window.location.href);
    }
};

const submitComment = async (post) => {
    const params = {
        post_id: post.id,
        content: data.content
    }
    try {
        await api.post("/comments", params)
        data.content = '';
        toggleCommentInput(post)
        alert("Commented succesfully!")
    } catch (error) {

    }
};
</script>

<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <template v-if="posts">
            <div v-for="post in posts" :key="post.id">
                <article
                    class="bg-gray-800 bg-opacity-50 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all duration-300 group">
                    <div class="h-48 bg-purple-800 relative overflow-hidden">
                        <img src="#" alt="Post Image"
                            class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300" />
                        <div class="absolute top-0 right-0 p-4">
                            <span
                                class="bg-white bg-opacity-20 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">Science</span>
                        </div>
                    </div>
                    <div class="p-6">
                        <div class="flex items-center mb-4">
                            <div class="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 mr-3"></div>
                            <div>
                                <p class="text-white text-sm font-medium">{{ post.user_id }}</p>
                                <p class="text-gray-400 text-xs">{{ post.created_at }}</p>
                            </div>
                        </div>
                        <h3 class="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">{{
                            post.title }}</h3>
                        <p class="text-gray-300 text-sm mb-4">{{ post.description }}</p>
                        <div class="flex justify-between items-center">
                            <span class="text-gray-400 text-xs">3 min read</span>
                            <div class="flex items-center space-x-3">
                                <span class="flex items-center text-gray-400 text-xs">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    1.2k
                                </span>
                                <span class="flex items-center text-gray-400 text-xs">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                    {{ post.comments.length }}
                                </span>
                            </div>
                        </div>

                        <div class="mt-4 pt-4 border-t border-gray-700 flex flex-wrap gap-3">
                            <button @click="toggleLike(post)" :class="[
                                'flex items-center text-sm px-3 py-1 rounded-full transition-colors',
                                post.isLiked ? 'bg-green-600 bg-opacity-30 text-green-400' : 'bg-gray-700 bg-opacity-50 text-gray-300 hover:bg-opacity-70'
                            ]">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                </svg>
                                Like
                            </button>

                            <button @click="toggleDislike(post)" :class="[
                                'flex items-center text-sm px-3 py-1 rounded-full transition-colors',
                                post.isDisliked ? 'bg-red-600 bg-opacity-30 text-red-400' : 'bg-gray-700 bg-opacity-50 text-gray-300 hover:bg-opacity-70'
                            ]">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2" />
                                </svg>
                                Dislike
                            </button>

                            <button @click="toggleCommentInput(post)"
                                class="flex items-center text-sm px-3 py-1 rounded-full bg-gray-700 bg-opacity-50 text-gray-300 hover:bg-opacity-70 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                                Comment
                            </button>

                            <button @click="toggleFavorite(post)" :class="[
                                'flex items-center text-sm px-3 py-1 rounded-full transition-colors',
                                post.isFavorite ? 'bg-yellow-600 bg-opacity-30 text-yellow-400' : 'bg-gray-700 bg-opacity-50 text-gray-300 hover:bg-opacity-70'
                            ]">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor" :stroke-width="post.isFavorite ? 2.5 : 2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                </svg>
                                Favorite
                            </button>

                            <button @click="sharePost(post)"
                                class="flex items-center text-sm px-3 py-1 rounded-full bg-gray-700 bg-opacity-50 text-gray-300 hover:bg-opacity-70 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                </svg>
                                Share
                            </button>
                        </div>

                        <div v-if="showCommentInput[post.id]" class="mt-4">
                            <div class="flex">
                                <input v-model="data.content" type="text" placeholder="Write a comment..."
                                    class="flex-grow bg-gray-700 bg-opacity-50 text-white text-sm rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                                <button @click.prevent="submitComment(post)"
                                    class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-r-lg transition-colors">
                                    Post
                                </button>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </template>
    </div>
</template>