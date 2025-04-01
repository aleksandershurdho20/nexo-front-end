<script setup lang="ts">
import { authStore } from '@/store/auth';
import { onMounted } from 'vue';


const { user,getUser,logout,isLoggedIn } = authStore()


getUser()

onMounted(() =>{
    if(!isLoggedIn){
        getUser()
    }
})
</script>


<template>
   <div class="bg-white">
    <h1 class="text-3xl text-gray-800">Dashboard</h1>
    <div class="flex justify-between items-center">
        <p class="text-lg text-gray-600"> Welcome Back , {{ user?.name }}</p>
        <p class="text-lg text-gray-600"> {{ user?.email }}</p>
    </div>
    <button class="btn cursor-pointer" @click="logout">Logout</button>
   </div>
</template>