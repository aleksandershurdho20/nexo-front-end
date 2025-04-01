<script setup lang="ts">
import { reactive } from 'vue';
import type { LoginData } from '@/types/Auth';
import Input from '@/common/Input.vue';
import api from '@/utils/api';

const authData = reactive<LoginData>({
    email: '',
    password: ''
});

const handleLogin = async () => {

    try {
        await api.get("/sanctum/csrf-cookie", {
            baseURL: 'http://localhost:8000'
        })
        const response = await api.post('/login', authData);

        console.log(response.data);
    } catch (error) {
        console.error('Registration failed:', error);
        alert('Registration failed. Please try again.');
    }
};
</script>

<template>
    <section class="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto sm:max-w-md">
            <a href="#"
                class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white tracking-tighter">
                <h2 class="text-blue-600 font-bold">N</h2>
                <span>EXTO</span>
            </a>

            <div class="w-full bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold text-gray-900 md:text-2xl dark:text-white">
                        Login to your account
                    </h1>

                    <!-- Login Form -->
                    <form @submit.prevent="handleLogin" class="space-y-4">
                        <Input v-model="authData.email" id="email" type="email" label="Your email"
                            placeholder="name@company.com" />
                        <Input v-model="authData.password" id="password" type="password" label="Password"
                            placeholder="••••••••" />
                        <button type="submit"
                            class=" cursor-pointer w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>
