<script setup lang="ts">
import { reactive, ref } from 'vue';
import { authStore } from '@/store/auth';


interface RegistrationForm {
    name: string;
    email: string;
    password: string;
    password_confirmation:string
}

const form = reactive<RegistrationForm>({
    name:"",
    email:"",
    password:"",
    password_confirmation:""
})

const termsAccepted = ref(false);
const { register } = authStore()
</script>

<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white tracking-tighter">
        <h2 class="text-blue-600 font-bold">N</h2>
        <span>EXTO</span>
      </a>
      <div class="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Create an account
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="register(form)">
            <div>
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
              <input v-model="form.name" type="text" id="name" class="input-field" placeholder="enter name" required>
            </div>
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
              <input v-model="form.email" type="email" id="email" class="input-field" placeholder="name@company.com" required>
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input v-model="form.password" type="password" id="password" class="input-field" placeholder="••••••••" required>
            </div>
            <div>
              <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
              <input v-model="form.password_confirmation" type="password" id="confirm-password" class="input-field" placeholder="••••••••" required>
            </div>
            <div class="flex items-start">
              <input v-model="termsAccepted" id="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600">
              <label for="terms" class="ml-3 text-sm font-light text-gray-500 dark:text-gray-300">
                I accept the <a href="#" class="font-medium text-blue-600 hover:underline dark:text-blue-500">Terms and Conditions</a>
              </label>
            </div>
            <button type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Create an account
            </button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account? <a href="#" class="font-medium text-blue-600 hover:underline dark:text-blue-500">Login here</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>


