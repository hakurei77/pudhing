<template>  
    <RouterView />
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { getUserDataApi } from "@/api/data";
onBeforeMount(() =>{
    getUserDataApi();
});
</script>

<style scoped>

</style>