<template>
    <div class="flex flex-col h-screen flex-1 items-center justify-center">
        <div class="flex items-center justify-center">
            <ImgBox :scale="10" :src="pudhing" />
            <span class="ml-2 font-bold text-6xl">Pudhing</span>
        </div>
        <SubmitButton />
    </div>
</template>

<script setup lang="ts">
import pudhing from "@/assets/imgs/pudhing.png";
import SubmitButton from "@/components/SubmitButton.vue";
</script>

<style scoped>

</style>