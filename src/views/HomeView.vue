<script setup lang="ts">

import { onMounted, ref } from 'vue';
import TheWelcome from '../components/TheWelcome.vue'
import api from '@/utils/api';
import Footer from '@/common/Footer.vue';
import PostsList from './Posts/PostsList.vue';

const posts = ref([])
const showCommentInput = ref(false)
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
  showCommentInput.value = !showCommentInput.value;
  if (showCommentInput.value) {
    // Focus on the input when it appears
    // this.$nextTick(() => {
    //   document.querySelector(`#post-${post.id}-comment`).focus();
    // });
  }
};

const toggleFavorite = (post) => {
  post.isFavorite = !post.isFavorite;
};

const sharePost = (post) => {
  // Implement share functionality
  // This could open a modal or use the Web Share API if available
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

const submitComment = (post) => {
  if (post.commentText.trim()) {
    // Here you would typically send the comment to your backend
    console.log('Comment submitted:', post.commentText);

    // Clear the input and hide it
    post.commentText = '';
    post.showCommentInput = false;

    // You might want to add the comment to a comments array and display it
  }
};
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
    <header class="relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-90 z-0"></div>
      <nav class="container mx-auto px-4 py-6 flex items-center justify-between relative z-10">
        <div class="text-white font-bold text-2xl tracking-tighter flex items-center">
          <div class="h-8 w-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-2">
            <span class="text-white text-xs font-bold">N</span>
          </div>
          NEXUS
        </div>
        <div class="hidden md:flex space-x-8 text-white font-medium">
          <a href="#" class="hover:text-purple-200 transition-colors">Home</a>
          <a href="#" class="hover:text-purple-200 transition-colors">Explore</a>
          <a href="#" class="hover:text-purple-200 transition-colors">Categories</a>
          <a href="#" class="hover:text-purple-200 transition-colors">About</a>
        </div>
        <div class="flex items-center space-x-4">
          <button class="bg-white bg-opacity-20 text-white p-2 rounded-full hover:bg-opacity-30 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button
            class="bg-white text-indigo-600 px-4 py-2 rounded-full font-medium hover:bg-opacity-90 transition-all">
            Sign In
          </button>
        </div>
      </nav>
      <div class="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <h1 class="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">Discover <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Amazing</span> Content
        </h1>
        <p class="text-white text-opacity-80 text-lg md:text-xl max-w-xl">Explore trending topics and stay updated with
          the latest innovations across technology, science, and design.</p>
      </div>
    </header>

    <main class="container mx-auto px-4 py-12">
      <div class="mb-16">
        <div class="flex items-center mb-6">
          <div class="h-10 w-1 bg-purple-500 rounded-full mr-4"></div>
          <h2 class="text-2xl font-bold text-white">Featured Post</h2>
        </div>
        <div
          class="bg-gray-800 bg-opacity-50 rounded-2xl overflow-hidden backdrop-blur-lg border border-gray-700 hover:border-purple-500 transition-all duration-300 shadow-xl">
          <div class="md:flex">
            <div class="md:w-1/2">
              <div class="h-64 md:h-full bg-purple-900 relative overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 opacity-80"></div>
                <div class="absolute bottom-0 left-0 p-6">
                  <span
                    class="bg-white bg-opacity-20 text-white text-sm px-3 py-1 rounded-full backdrop-blur-sm">Technology</span>
                </div>
              </div>
            </div>
            <div class="p-6 md:w-1/2 md:p-8">
              <div class="flex items-center mb-4">
                <div class="h-10 w-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 mr-3"></div>
                <div>
                  <p class="text-white font-medium">Alex Morgan</p>
                  <p class="text-gray-400 text-sm">Apr 2, 2025 · 5 min read</p>
                </div>
              </div>
              <h3 class="text-2xl font-bold text-white mb-4">The Future of Artificial Intelligence: Breaking New
                Boundaries</h3>
              <p class="text-gray-300 mb-6">Discover how the latest advancements in AI are reshaping industries and
                creating unprecedented opportunities for innovation across the global technology landscape.</p>
              <div class="flex justify-between items-center">
                <button
                  class="group flex items-center text-purple-400 font-medium hover:text-purple-300 transition-colors">
                  Read More
                  <svg xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
                <div class="flex items-center space-x-3">
                  <button class="text-gray-400 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                  <button class="text-gray-400 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Posts -->
      <div class="mb-16">
        <div class="flex items-center justify-between mb-8">
          <div class="flex items-center">
            <div class="h-10 w-1 bg-purple-500 rounded-full mr-4"></div>
            <h2 class="text-2xl font-bold text-white">Recent Posts</h2>
          </div>
          <div class="flex space-x-2">
            <button class="text-white bg-gray-800 bg-opacity-50 hover:bg-gray-700 p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button class="text-white bg-gray-800 bg-opacity-50 hover:bg-gray-700 p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        <PostsList/>
      </div>

      <div class="mb-16">
        <div class="flex items-center mb-8">
          <div class="h-10 w-1 bg-purple-500 rounded-full mr-4"></div>
          <h2 class="text-2xl font-bold text-white">Trending Topics</h2>
        </div>
        <div class="flex flex-wrap gap-4">
          <a href="#"
            class="group px-6 py-3 bg-gray-800 bg-opacity-50 rounded-full flex items-center space-x-2 border border-gray-700 hover:border-purple-500 transition-all duration-300">
            <div
              class="h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
              <span class="text-white text-xs">#</span>
            </div>
            <span class="text-gray-300 group-hover:text-white transition-colors">Artificial Intelligence</span>
          </a>
          <a href="#"
            class="group px-6 py-3 bg-gray-800 bg-opacity-50 rounded-full flex items-center space-x-2 border border-gray-700 hover:border-purple-500 transition-all duration-300">
            <div
              class="h-6 w-6 rounded-full bg-gradient-to-r from-green-400 to-cyan-500 flex items-center justify-center">
              <span class="text-white text-xs">#</span>
            </div>
            <span class="text-gray-300 group-hover:text-white transition-colors">Sustainable Tech</span>
          </a>
          <a href="#"
            class="group px-6 py-3 bg-gray-800 bg-opacity-50 rounded-full flex items-center space-x-2 border border-gray-700 hover:border-purple-500 transition-all duration-300">
            <div
              class="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center">
              <span class="text-white text-xs">#</span>
            </div>
            <span class="text-gray-300 group-hover:text-white transition-colors">UX Design</span>
          </a>
          <a href="#"
            class="group px-6 py-3 bg-gray-800 bg-opacity-50 rounded-full flex items-center space-x-2 border border-gray-700 hover:border-purple-500 transition-all duration-300">
            <div
              class="h-6 w-6 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
              <span class="text-white text-xs">#</span>
            </div>
            <span class="text-gray-300 group-hover:text-white transition-colors">Web3</span>
          </a>
          <a href="#"
            class="group px-6 py-3 bg-gray-800 bg-opacity-50 rounded-full flex items-center space-x-2 border border-gray-700 hover:border-purple-500 transition-all duration-300">
            <div
              class="h-6 w-6 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center">
              <span class="text-white text-xs">#</span>
            </div>
            <span class="text-gray-300 group-hover:text-white transition-colors">Quantum Computing</span>
          </a>
        </div>
      </div>

      <div class="bg-gradient-to-r from-purple-900 to-indigo-900 rounded-2xl p-8 md:p-12 relative overflow-hidden">
        <div
          class="absolute top-0 right-0 w-64 h-64 bg-purple-600 rounded-full filter blur-3xl opacity-20 -mr-20 -mt-20">
        </div>
        <div
          class="absolute bottom-0 left-0 w-64 h-64 bg-blue-600 rounded-full filter blur-3xl opacity-20 -ml-20 -mb-20">
        </div>
        <div class="relative z-10">
          <h2 class="text-3xl font-bold text-white mb-4">Stay Updated</h2>
          <p class="text-purple-200 mb-6 max-w-lg">Get the latest tech insights and trending topics delivered straight
            to your
            inbox. No spam, just the content you care about.</p>
          <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <input type="email" placeholder="Enter your email"
              class="px-6 py-3 bg-white bg-opacity-10 rounded-full border border-purple-400 border-opacity-30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 backdrop-blur-sm flex-grow" />
            <button
              class="px-8 py-3 bg-white text-purple-700 rounded-full font-medium hover:bg-opacity-90 transition-all transform hover:scale-105 active:scale-95 flex-shrink-0">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </main>

   <Footer/>
  </div>
</template>