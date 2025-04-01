<script setup lang="ts">
import api from '@/utils/api';
import { ref } from 'vue';


const user = ref(null)
const getUser = async () => {
    try {

        const {data} = await api.get("/user")
        console.log(data)
        user.value = data
    } catch (error) {
        console.log(error)
    }
}
getUser()

const logout = async() =>{
    try {
        await api.post("/logout")
    } catch (error) {
        
    }
}
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