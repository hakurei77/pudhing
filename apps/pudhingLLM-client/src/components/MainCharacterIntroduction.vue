<template>
    <div class="w-[100%] rounded-[8px] bg-[var(--background-gray)] p-4">
        <div class="flex items-center w-full">
            <template v-if="img === ''">
                <ImgBox :scale="5" :src="imgSrc"/>
            </template>
            <span class="ml-2 font-bold text-xl">{{ name }}</span>
        </div>
        <div class="mt-2 w-full text-sm text-justify">
            <span class="mt-2 break-words">{{ description }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import imgSrc from "@/assets/imgs/pudhing.png";
withDefaults(defineProps<{
    name: string,
    description: string,
    img?: string
}>(), {
    img: ''
});
</script>

<style scoped>

</style>