<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import api from '@/utils/api';

const route = useRoute();
const post = ref(null);
const loading = ref(true);
const error = ref(null);
const showCommentInput = ref(false);
const data = reactive({
    content: ""
});

onMounted(async () => {
    try {
        const postId = route.params.id;

        const response = await api.get(`/posts?id=${postId}`);
        post.value = response.data;
        loading.value = false;
    } catch (err) {
        error.value = "Failed to load post";
        loading.value = false;
        console.error(err);
    }
});

const toggleLike = () => {
    if (!post.value) return;
    
    post.value.isLiked = !post.value.isLiked;
    if (post.value.isLiked && post.value.isDisliked) {
        post.value.isDisliked = false;
    }
};

const toggleDislike = () => {
    if (!post.value) return;
    
    post.value.isDisliked = !post.value.isDisliked;
    if (post.value.isDisliked && post.value.isLiked) {
        post.value.isLiked = false;
    }
};

const toggleCommentInput = () => {
    showCommentInput.value = !showCommentInput.value;
};

const toggleFavorite = () => {
    if (!post.value) return;
    
    post.value.isFavorite = !post.value.isFavorite;
};

const sharePost = () => {
    if (!post.value) return;
    
    if (navigator.share) {
        navigator.share({
            title: post.value.title,
            text: post.value.description,
            url: window.location.href
        });
    } else {
        alert('Share functionality: Copy link to post: ' + window.location.href);
    }
};

const submitComment = async () => {
    if (!post.value) return;
    
    const params = {
        post_id: post.value.id,
        content: data.content
    };
    try {
        const response = await api.post("/comments", params);
        data.content = '';
        // Add the new comment to the post's comments
        post.value.comments.push(response.data);
        showCommentInput.value = false;
        
        setTimeout(() => {
            const commentsContainer = document.getElementById('comments-container');
            commentsContainer?.scrollTo({
                top: commentsContainer.scrollHeight,
                behavior: 'smooth'
            });
        }, 100);
    } catch (error) {
        console.error("Error submitting comment:", error);
        alert("Failed to post comment. Please try again.");
    }
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
};
</script>

<template>
    <div class="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">

        <div class="max-w-4xl mx-auto px-4 py-8 ">
            {{ console.log(post) }}
            <div v-if="loading" class="flex justify-center items-center h-64">
                <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
    
            <div v-else-if="error" class="bg-red-500 bg-opacity-20 text-red-400 p-4 rounded-lg text-center">
                {{ error }}
            </div>
    
            <div v-else-if="post" class="space-y-8">
                <div class="relative">
                    <div class="h-64 md:h-80 bg-purple-800 rounded-xl overflow-hidden relative">
                        <img :src="post.image_url || '#'" alt="Post Cover Image"
                            class="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500" />
                        <div class="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80"></div>
                        <div class="absolute top-0 right-0 p-6">
                            <span class="bg-white bg-opacity-20 text-white text-sm px-4 py-1 rounded-full backdrop-blur-sm">
                                Science
                            </span>
                        </div>
                    </div>
                    
                    <div class="absolute bottom-0 left-0 p-6 w-full">
                        <h1 class="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
                            {{ post.title }}
                        </h1>
                        <div class="flex items-center space-x-4">
                            <div class="flex items-center">
                                <div class="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 mr-3"></div>
                                <div>
                                    <p class="text-white text-sm font-medium">{{ post.user_id }}</p>
                                    <p class="text-gray-300 text-xs">{{ formatDate(post.created_at) }}</p>
                                </div>
                            </div>
                            <span class="text-gray-300 text-xs px-3 py-1 bg-gray-800 bg-opacity-50 rounded-full backdrop-blur-sm">
                                5 min read
                            </span>
                        </div>
                    </div>
                </div>
    
                <div class="bg-gray-800 bg-opacity-50 rounded-xl p-6 border border-gray-700 backdrop-blur-sm">
                    <div class="prose prose-invert max-w-none">
                        <p class="text-gray-200 leading-relaxed">{{ post.description }}</p>
                        <p class="text-gray-200 leading-relaxed mt-4">{{ post.content }}</p>
                    </div>
                    
                    <div class="flex items-center justify-between mt-8 pt-4 border-t border-gray-700">
                        <div class="flex space-x-6">
                            <span class="flex items-center text-gray-400 text-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                {{ post.views || '1.2k' }} views
                            </span>
                            <span class="flex items-center text-gray-400 text-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                {{ post.comments?.length || 0 }} comments
                            </span>
                        </div>
                        <div>
                            <span class="text-gray-400 text-sm">Published {{ formatDate(post.created_at) }}</span>
                        </div>
                    </div>
                    
                    <div class="flex flex-wrap gap-3 mt-6">
                        <button @click="toggleLike" :class="[
                            'flex items-center text-sm px-4 py-2 rounded-full transition-all duration-300',
                            post.isLiked ? 'bg-green-600 bg-opacity-30 text-green-400 border border-green-500' : 'bg-gray-700 bg-opacity-50 text-gray-300 hover:bg-opacity-70 border border-transparent'
                        ]">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                            </svg>
                            Like
                        </button>
    
                        <button @click="toggleDislike" :class="[
                            'flex items-center text-sm px-4 py-2 rounded-full transition-all duration-300',
                            post.isDisliked ? 'bg-red-600 bg-opacity-30 text-red-400 border border-red-500' : 'bg-gray-700 bg-opacity-50 text-gray-300 hover:bg-opacity-70 border border-transparent'
                        ]">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2" />
                            </svg>
                            Dislike
                        </button>
    
                        <button @click="toggleCommentInput"
                            class="flex items-center text-sm px-4 py-2 rounded-full bg-gray-700 bg-opacity-50 text-gray-300 hover:bg-opacity-70 transition-all duration-300 border border-transparent hover:border-purple-500">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                            Comment
                        </button>
    
                        <button @click="toggleFavorite" :class="[
                            'flex items-center text-sm px-4 py-2 rounded-full transition-all duration-300',
                            post.isFavorite ? 'bg-yellow-600 bg-opacity-30 text-yellow-400 border border-yellow-500' : 'bg-gray-700 bg-opacity-50 text-gray-300 hover:bg-opacity-70 border border-transparent'
                        ]">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" :stroke-width="post.isFavorite ? 2.5 : 2">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                            Favorite
                        </button>
    
                        <button @click="sharePost"
                            class="flex items-center text-sm px-4 py-2 rounded-full bg-gray-700 bg-opacity-50 text-gray-300 hover:bg-opacity-70 transition-all duration-300 border border-transparent hover:border-purple-500">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                            </svg>
                            Share
                        </button>
                    </div>
    
                    <div v-if="showCommentInput" class="mt-6 transition-all duration-300">
                        <div class="flex">
                            <input v-model="data.content" type="text" placeholder="Share your thoughts..."
                                class="flex-grow bg-gray-700 bg-opacity-50 text-white text-sm rounded-l-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                            <button @click.prevent="submitComment"
                                class="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-3 rounded-r-lg transition-colors">
                                Post
                            </button>
                        </div>
                    </div>
                </div>
    
                <div class="bg-gray-800 bg-opacity-50 rounded-xl p-6 border border-gray-700 backdrop-blur-sm">
                    <h2 class="text-xl font-bold text-white mb-6 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        Comments ({{ post.comments?.length || 0 }})
                    </h2>
    
                    <div v-if="!post.comments || post.comments.length === 0" class="text-center py-8">
                        <p class="text-gray-400">No comments yet. Be the first to share your thoughts!</p>
                        <button @click="toggleCommentInput" class="mt-4 bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded-full transition-colors">
                            Add Comment
                        </button>
                    </div>
    
                    <div v-else id="comments-container" class="space-y-4 max-h-96 overflow-y-auto pr-2">
                        <div v-for="comment in post.comments" :key="comment.id" 
                            class="bg-gray-700 bg-opacity-40 rounded-lg p-4 border border-gray-600 hover:border-purple-500 transition-all duration-300">
                            <div class="flex items-center mb-3">
                                <div class="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 mr-3"></div>
                                <div>
                                    <p class="text-white text-sm font-medium">{{ comment.user_id || 'Anonymous User' }}</p>
                                    <p class="text-gray-400 text-xs">{{ formatDate(comment.created_at) }}</p>
                                </div>
                            </div>
                            <p class="text-gray-300 text-sm">{{ comment.content }}</p>
                            
                            <div class="flex gap-4 mt-3">
                                <button class="text-gray-400 text-xs hover:text-purple-400 transition-colors">
                                    <span class="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                        </svg>
                                        Like
                                    </span>
                                </button>
                                <button class="text-gray-400 text-xs hover:text-purple-400 transition-colors">
                                    <span class="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                        </svg>
                                        Reply
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div v-if="post.comments && post.comments.length > 0" class="mt-4 text-center">
                        <button @click="toggleCommentInput" class="bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm px-4 py-2 rounded-full transition-colors border border-gray-600">
                            Add Your Comment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
#comments-container::-webkit-scrollbar {
    width: 6px;
}

#comments-container::-webkit-scrollbar-track {
    background: rgba(75, 85, 99, 0.2);
    border-radius: 10px;
}

#comments-container::-webkit-scrollbar-thumb {
    background: rgba(139, 92, 246, 0.5);
    border-radius: 10px;
}

#comments-container::-webkit-scrollbar-thumb:hover {
    background: rgba(139, 92, 246, 0.8);
}

.transition-all {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
}
</style>