<script lang="ts" setup>
import api from '@/utils/api';
import { ref, computed, onMounted, reactive } from 'vue';

const activeCategory = ref('all');
const currentPage = ref(1);
const searchQuery = ref('');
const data = reactive({
    posts: [],
    loading: false
})

onMounted(() => {
    data.loading = true
    api.get('/favorite-posts').then(res => {
        console.log(res)
        data.posts = res.data
        data.loading = false

    }).catch(err => {
        data.loading = false

        alert("error fetching favorite posts!")
    }

    )
})

const favoriteCount = computed(() => data.posts.length);

const filteredPosts = computed(() => {
    if (activeCategory.value === 'all') {
        return data.posts;
    } else {
        return data.posts.filter(post => post.category === activeCategory.value);
    }
});

const removeFromFavorites = (id) => {
    data.posts = data.posts.filter(post => post.id !== id);
};

const searchFavorites = () => {
    console.log(`Searching for: ${searchQuery.value}`);
};

const changePage = (direction) => {
    if (direction === 'next' && currentPage.value < 3) {
        currentPage.value++;
    } else if (direction === 'prev' && currentPage.value > 1) {
        currentPage.value--;
    }
};
</script>
<template>
    <div class="min-h-screen bg-black relative overflow-hidden font-sans">
        <div class="absolute inset-0 overflow-hidden opacity-60 pointer-events-none">
            <div class="absolute -top-20 -left-20 w-96 h-96 bg-purple-900 rounded-full blur-4xl"></div>
            <div class="absolute top-1/3 -right-20 w-96 h-96 bg-indigo-900 rounded-full blur-4xl"></div>
            <div class="absolute bottom-0 left-1/3 w-96 h-96 bg-fuchsia-900 rounded-full blur-4xl"></div>

            <div
                class="absolute inset-0 bg-gradient-to-b from-transparent via-purple-800/5 to-transparent bg-grid-slate-800/5 bg-[length:50px_50px] backdrop-blur-3xl">
            </div>

            <div class="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <div class="absolute top-3/4 left-2/3 w-1 h-1 bg-purple-300 rounded-full animate-ping"></div>
            <div class="absolute top-1/2 left-1/5 w-1 h-1 bg-indigo-400 rounded-full animate-pulse"></div>
        </div>

        <main class="container mx-auto px-4 py-12 relative z-10">
            <header class="flex justify-between items-center mb-12">
                <div class="relative overflow-hidden h-12">
                    <div class="text-white font-bold text-2xl tracking-tighter flex items-center space-x-2">
                        <div
                            class="h-10 w-10 relative rounded-xl bg-gradient-to-tr from-purple-700 via-indigo-500 to-purple-400 flex items-center justify-center drop-shadow-glow">
                            <div
                                class="absolute inset-0 rounded-xl bg-gradient-to-tr from-purple-700 via-indigo-500 to-purple-400 opacity-75 animate-pulse">
                            </div>
                            <span class="text-white text-lg font-bold relative z-10">N</span>
                        </div>
                        <span
                            class="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-300 to-indigo-300 text-2xl">NEXUS</span>
                    </div>
                </div>
                <div class="flex space-x-3">
                    <button @click="toggleTheme"
                        class="btn btn-circle bg-gray-900 border-none text-white hover:bg-gray-800">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h12a2 2 0 012 2v12a4 4 0 01-4 4H7z" />
                        </svg>
                    </button>
                    <button class="btn btn-circle bg-gray-900 border-none text-white hover:bg-gray-800">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </button>
                    <div class="avatar online">
                        <div class="w-10 rounded-full ring ring-purple-500 ring-offset-base-100 ring-offset-2">
                            <!-- <img src="/api/placeholder/100/100" alt="Avatar" /> -->
                        </div>
                    </div>
                </div>
            </header>

            <div
                class="bg-gray-900 bg-opacity-80 rounded-2xl p-6 mb-10 backdrop-blur-md border border-gray-800 shadow-glow relative">
                <div class="absolute -top-3 -right-3">
                    <div
                        class="h-6 w-6 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-400 animate-ping opacity-75">
                    </div>
                </div>
                <div class="flex flex-wrap items-center justify-between gap-4">
                    <div class="flex items-center space-x-4">
                        <div
                            class="badge badge-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-none font-medium">
                            {{ favoriteCount }} Favorites
                        </div>
                        <div class="dropdown">
                            <div tabindex="0" class="btn btn-sm btn-ghost text-white glass flex items-center">
                                Sort By <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                            <ul tabindex="0"
                                class="dropdown-content menu p-3 shadow bg-gray-900 backdrop-blur-md rounded-box w-52 border border-gray-800">
                                <li><a class="text-purple-200 hover:bg-purple-900 rounded-lg">Recently Added</a></li>
                                <li><a class="text-purple-200 hover:bg-purple-900 rounded-lg">Most Popular</a></li>
                                <li><a class="text-purple-200 hover:bg-purple-900 rounded-lg">Alphabetical</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="w-full sm:w-auto">
                        <div class="join relative w-full sm:w-auto">
                            <input v-model="searchQuery" type="text"
                                class="input join-item bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 w-full sm:w-64 border-gray-700 placeholder-gray-500"
                                placeholder="Search favorites..." />
                            <button
                                class="btn join-item bg-gradient-to-r from-purple-600 to-indigo-600 border-none text-white hover:from-purple-700 hover:to-indigo-700"
                                @click="searchFavorites">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                            <div
                                class="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 via-indigo-400 to-pink-500 w-full">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mb-12 flex flex-wrap gap-2">
                <button class="px-6 py-3 rounded-xl relative group text-center"
                    :class="activeCategory === 'all' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white' : 'bg-gray-900 text-gray-400 hover:text-white'"
                    @click="activeCategory = 'all'">
                    <span class="relative z-10">All</span>
                    <span v-if="activeCategory === 'all'"
                        class="absolute bottom-0 left-0 w-full h-full rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 blur-md opacity-50"></span>
                </button>
                <button class="px-6 py-3 rounded-xl relative group text-center"
                    :class="activeCategory === 'articles' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white' : 'bg-gray-900 text-gray-400 hover:text-white'"
                    @click="activeCategory = 'articles'">
                    <span class="relative z-10">Articles</span>
                    <span v-if="activeCategory === 'articles'"
                        class="absolute bottom-0 left-0 w-full h-full rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 blur-md opacity-50"></span>
                </button>
                <button class="px-6 py-3 rounded-xl relative group text-center"
                    :class="activeCategory === 'tutorials' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white' : 'bg-gray-900 text-gray-400 hover:text-white'"
                    @click="activeCategory = 'tutorials'">
                    <span class="relative z-10">Tutorials</span>
                    <span v-if="activeCategory === 'tutorials'"
                        class="absolute bottom-0 left-0 w-full h-full rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 blur-md opacity-50"></span>
                </button>
                <button class="px-6 py-3 rounded-xl relative group text-center"
                    :class="activeCategory === 'news' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white' : 'bg-gray-900 text-gray-400 hover:text-white'"
                    @click="activeCategory = 'news'">
                    <span class="relative z-10">News</span>
                    <span v-if="activeCategory === 'news'"
                        class="absolute bottom-0 left-0 w-full h-full rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 blur-md opacity-50"></span>
                </button>
                <button class="px-6 py-3 rounded-xl relative group text-center"
                    :class="activeCategory === 'resources' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white' : 'bg-gray-900 text-gray-400 hover:text-white'"
                    @click="activeCategory = 'resources'">
                    <span class="relative z-10">Resources</span>
                    <span v-if="activeCategory === 'resources'"
                        class="absolute bottom-0 left-0 w-full h-full rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 blur-md opacity-50"></span>
                </button>
            </div>

            <div v-if="data.loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div v-for="i in 6" :key="i"
                    class="card bg-gray-900 bg-opacity-70 backdrop-blur-md rounded-2xl overflow-hidden animate-pulse">
                    <div class="h-48 bg-gray-800"></div>
                    <div class="card-body">
                        <div class="h-6 bg-gray-800 rounded-md w-3/4 mb-4"></div>
                        <div class="h-4 bg-gray-800 rounded-md w-full mb-2"></div>
                        <div class="h-4 bg-gray-800 rounded-md w-5/6 mb-2"></div>
                        <div class="h-4 bg-gray-800 rounded-md w-4/6 mb-6"></div>
                        <div class="flex justify-between items-center">
                            <div class="h-8 bg-gray-800 rounded-full w-24"></div>
                            <div class="h-8 bg-gray-800 rounded-md w-20"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div v-for="post in filteredPosts" :key="post.id"
                    class="card overflow-hidden group relative hover:scale-102 transition-all duration-300">
                    <div
                        class="absolute -inset-0.5 bg-gradient-to-r from-purple-600/30 to-indigo-600/30 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-300">
                    </div>

                    <div class="card relative bg-gray-900 rounded-2xl overflow-hidden border border-gray-800">
                        <figure class="relative">

                            <div
                                class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80">
                            </div>

                            <button
                                class="absolute top-3 right-3 btn btn-circle btn-sm bg-black bg-opacity-50 border border-gray-700 hover:bg-purple-800 hover:border-purple-600 z-20"
                                @click="removeFromFavorites(post.id)">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-300"
                                    fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                </svg>
                            </button>

                            <!-- <div class="absolute top-3 left-3 flex gap-2">
                <div v-if="post.isHot" class="badge badge-sm bg-gradient-to-r from-orange-500 to-red-500 border-none text-white">
                  🔥 HOT
                </div>
                <div v-if="post.isNew" class="badge badge-sm bg-gradient-to-r from-emerald-500 to-teal-500 border-none text-white">
                  NEW
                </div>
              </div> -->

                            <div class="absolute bottom-3 left-3 flex space-x-2">
                                <div
                                    class="badge badge-sm bg-purple-600 bg-opacity-80 backdrop-blur-sm text-white border-none">
                                    <!-- {{ post.category }} -->
                                    cat
                                </div>
                                <div
                                    class="badge badge-sm bg-gray-800 bg-opacity-80 backdrop-blur-sm text-gray-200 border-none">
                                    50 min read
                                </div>
                            </div>
                        </figure>

                        <div class="card-body p-6">
                            <h2 class="card-title text-white text-xl mb-2 line-clamp-2">{{ post.title }}</h2>
                            <p class="text-gray-300 text-sm mb-4 line-clamp-2">{{ post.excerpt }}</p>

                            <!-- Progress bar (simulated reading progress) -->
                            <div class="w-full h-1 bg-gray-800 rounded-full mb-4 overflow-hidden">
                                <div class="h-full bg-gradient-to-r from-purple-500 to-indigo-500"
                                    :style="`width: ${Math.floor(Math.random() * 100)}%`"></div>
                            </div>

                            <div class="flex items-center justify-between mt-auto">
                                <div class="flex items-center space-x-2">
                                    <div class="avatar">
                                        <div
                                            class="w-8 h-8 rounded-full ring ring-purple-500 ring-offset-black ring-offset-2">
                                            <!-- <img :src="post.author.avatar" :alt="post.author.name" /> -->
                                        </div>
                                    </div>
                                    <!-- <span class="text-xs text-gray-400">{{ post.author.name }}</span> -->
                                </div>
                                <span class="text-xs text-gray-400">{{ post.created_at }}</span>
                            </div>

                            <div class="card-actions justify-end mt-4 gap-3">
                                <button
                                    class="btn btn-sm bg-transparent border border-gray-700 text-purple-300 hover:bg-purple-900 hover:text-purple-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                    </svg>
                                    Share
                                </button>
                                <button
                                    class="btn btn-sm bg-gradient-to-r from-purple-600 to-indigo-600 border-none text-white hover:from-purple-700 hover:to-indigo-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    Read Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="filteredPosts.length === 0 && !data.loading"
                class="flex flex-col items-center justify-center py-20 px-4">
                <div class="w-24 h-24 relative mb-6">
                    <div class="absolute inset-0 bg-purple-600 rounded-full opacity-20 animate-ping"></div>
                    <div class="absolute inset-0 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-purple-500" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                    </div>
                </div>
                <h3 class="text-2xl font-bold text-white mb-3 text-center">No favorites found</h3>
                <p class="text-purple-200 text-center max-w-md mb-8">Looks like you haven't added any favorites in this
                    category yet. Explore more content and mark your favorites!</p>
                <button
                    class="btn btn-lg bg-gradient-to-r from-purple-600 to-indigo-600 border-none text-white hover:opacity-90">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                    Explore Content
                </button>

            </div>
        </main>

    </div>
</template>
