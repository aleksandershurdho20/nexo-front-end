<script setup lang="ts">
import api from '@/utils/api';

const getUser = async () => {
    try {

        const data = await api.get("/user")
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}
getUser()
</script>


<template>
    <div>
        Dashboard
    </div>
</template>