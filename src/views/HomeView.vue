<script setup lang="ts">
import { onMounted, ref } from 'vue';
import TheWelcome from '../components/TheWelcome.vue'
import api from '@/utils/api';
const posts = ref([])
onMounted(async() =>{
try {
  const response = await api.get("/posts");
    console.log(response.data); // Log the data to check its structure
    posts.value = response.data;
} catch (error) {
  throw error
}
})
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
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button class="bg-white text-indigo-600 px-4 py-2 rounded-full font-medium hover:bg-opacity-90 transition-all">
            Sign In
          </button>
        </div>
      </nav>
      <div class="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <h1 class="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">Discover <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Amazing</span> Content</h1>
        <p class="text-white text-opacity-80 text-lg md:text-xl max-w-xl">Explore trending topics and stay updated with the latest innovations across technology, science, and design.</p>
      </div>
    </header>

    <main class="container mx-auto px-4 py-12">
      <div class="mb-16">
        <div class="flex items-center mb-6">
          <div class="h-10 w-1 bg-purple-500 rounded-full mr-4"></div>
          <h2 class="text-2xl font-bold text-white">Featured Post</h2>
        </div>
        <div class="bg-gray-800 bg-opacity-50 rounded-2xl overflow-hidden backdrop-blur-lg border border-gray-700 hover:border-purple-500 transition-all duration-300 shadow-xl">
          <div class="md:flex">
            <div class="md:w-1/2">
              <div class="h-64 md:h-full bg-purple-900 relative overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 opacity-80"></div>
                <div class="absolute bottom-0 left-0 p-6">
                  <span class="bg-white bg-opacity-20 text-white text-sm px-3 py-1 rounded-full backdrop-blur-sm">Technology</span>
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
              <h3 class="text-2xl font-bold text-white mb-4">The Future of Artificial Intelligence: Breaking New Boundaries</h3>
              <p class="text-gray-300 mb-6">Discover how the latest advancements in AI are reshaping industries and creating unprecedented opportunities for innovation across the global technology landscape.</p>
              <div class="flex justify-between items-center">
                <button class="group flex items-center text-purple-400 font-medium hover:text-purple-300 transition-colors">
                  Read More
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
                <div class="flex items-center space-x-3">
                  <button class="text-gray-400 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                  <button class="text-gray-400 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
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
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button class="text-white bg-gray-800 bg-opacity-50 hover:bg-gray-700 p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <template v-if="posts">
            <div v-for="post in posts" :key="post.id">
              <article class="bg-gray-800 bg-opacity-50 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all duration-300 group">
                <div class="h-48 bg-purple-800 relative overflow-hidden">
                  <img src="#" alt="Post Image" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300" />
                  <div class="absolute top-0 right-0 p-4">
                    <span class="bg-white bg-opacity-20 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">Science</span>
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
                  <h3 class="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">{{ post.title }}</h3>
                  <p class="text-gray-300 text-sm mb-4">{{ post.description }}.</p>
                  <div class="flex justify-between items-center">
                    <span class="text-gray-400 text-xs">3 min read</span>
                    <div class="flex items-center space-x-3">
                      <span class="flex items-center text-gray-400 text-xs">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        1.2k
                      </span>
                      <span class="flex items-center text-gray-400 text-xs">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        36
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </template>
        </div>
      </div>

      <div class="mb-16">
        <div class="flex items-center mb-8">
          <div class="h-10 w-1 bg-purple-500 rounded-full mr-4"></div>
          <h2 class="text-2xl font-bold text-white">Trending Topics</h2>
        </div>
        <div class="flex flex-wrap gap-4">
          <a href="#" class="group px-6 py-3 bg-gray-800 bg-opacity-50 rounded-full flex items-center space-x-2 border border-gray-700 hover:border-purple-500 transition-all duration-300">
            <div class="h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
              <span class="text-white text-xs">#</span>
            </div>
            <span class="text-gray-300 group-hover:text-white transition-colors">Artificial Intelligence</span>
          </a>
          <a href="#" class="group px-6 py-3 bg-gray-800 bg-opacity-50 rounded-full flex items-center space-x-2 border border-gray-700 hover:border-purple-500 transition-all duration-300">
            <div class="h-6 w-6 rounded-full bg-gradient-to-r from-green-400 to-cyan-500 flex items-center justify-center">
              <span class="text-white text-xs">#</span>
            </div>
            <span class="text-gray-300 group-hover:text-white transition-colors">Sustainable Tech</span>
          </a>
          <a href="#" class="group px-6 py-3 bg-gray-800 bg-opacity-50 rounded-full flex items-center space-x-2 border border-gray-700 hover:border-purple-500 transition-all duration-300">
            <div class="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center">
              <span class="text-white text-xs">#</span>
            </div>
            <span class="text-gray-300 group-hover:text-white transition-colors">UX Design</span>
          </a>
          <a href="#" class="group px-6 py-3 bg-gray-800 bg-opacity-50 rounded-full flex items-center space-x-2 border border-gray-700 hover:border-purple-500 transition-all duration-300">
            <div class="h-6 w-6 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
              <span class="text-white text-xs">#</span>
            </div>
            <span class="text-gray-300 group-hover:text-white transition-colors">Web3</span>
          </a>
          <a href="#" class="group px-6 py-3 bg-gray-800 bg-opacity-50 rounded-full flex items-center space-x-2 border border-gray-700 hover:border-purple-500 transition-all duration-300">
            <div class="h-6 w-6 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center">
              <span class="text-white text-xs">#</span>
            </div>
            <span class="text-gray-300 group-hover:text-white transition-colors">Quantum Computing</span>
          </a>
        </div>
      </div>

      <div class="bg-gradient-to-r from-purple-900 to-indigo-900 rounded-2xl p-8 md:p-12 relative overflow-hidden">
        <div class="absolute top-0 right-0 w-64 h-64 bg-purple-600 rounded-full filter blur-3xl opacity-20 -mr-20 -mt-20"></div>
        <div class="absolute bottom-0 left-0 w-64 h-64 bg-blue-600 rounded-full filter blur-3xl opacity-20 -ml-20 -mb-20"></div>
        <div class="relative z-10">
          <h2 class="text-3xl font-bold text-white mb-4">Stay Updated</h2>
          <p class="text-purple-200 mb-6 max-w-lg">Get the latest tech insights and trending topics delivered straight to your inbox. No spam, just the content you care about.</p>
          <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <input
              type="email"
              placeholder="Enter your email"
              class="px-6 py-3 bg-white bg-opacity-10 rounded-full border border-purple-400 border-opacity-30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 backdrop-blur-sm flex-grow"
            />
            <button class="px-8 py-3 bg-white text-purple-700 rounded-full font-medium hover:bg-opacity-90 transition-all transform hover:scale-105 active:scale-95 flex-shrink-0">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </main>

    <footer class="bg-gray-900 border-t border-gray-800 mt-20">
      <div class="container mx-auto px-4 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div class="text-white font-bold text-2xl tracking-tighter flex items-center">
              <div class="h-8 w-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-2">
                <span class="text-white text-xs font-bold">N</span>
              </div>
              NEXUS
            </div>
            <p class="text-gray-400 mt-4">A futuristic platform for discovering and sharing cutting-edge content across technology, science, and design.</p>
          </div>
          <div>
            <h3 class="text-white font-bold mb-4">Navigation</h3>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Explore</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Categories</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">About</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-white font-bold mb-4">Connect</h3>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Twitter</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Discord</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">GitHub</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">LinkedIn</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-white font-bold mb-4">Legal</h3>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div class="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p class="text-gray-500 text-sm">&copy; 2025 NEXUS. All rights reserved.</p>
          <div class="flex space-x-6 mt-4 md:mt-0">
            <a href="#" class="text-gray-400 hover:text-white transition-colors">
              <span class="sr-only">Twitter</span>
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>