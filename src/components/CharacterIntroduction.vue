<template>
    <div class="w-[100%] rounded-[8px] bg-[#f7f7f7] p-4">
        <div class="flex items-center w-full">
            <ImgBox :src="imgSrc" :scale="5"/>
            <span class="ml-2 font-bold text-xl">小黑塔</span>
        </div>
        <div class="mt-2 w-full text-justify text-sm">
            <span class="text-sm mt-2 text-justify">我是通用型助手小黑塔，可以写作、编程，有什么不懂或不会的问题都可以来问我 (ᗜ▵ᗜ)</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import imgSrc from "@/assets/imgs/xiaoheita.png";
</script>

<style scoped>

</style>