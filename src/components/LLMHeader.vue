<template>
    <div class="flex bg-[var(--background-gray)] w-full h-[50px] items-center border-b-[1px] border-solid border-[var(--divided-line)]">
        <SvgIcon name="list" :scale="1.5" class="ml-5 cursor-pointer" />
        <ImgBox :scale="3.5" :src="imgScr" class="ml-5"/>
        <span class="ml-2 font-bold">小黑塔助手</span>
    </div>
</template>

<script setup lang="ts">
import imgScr from "@/assets/imgs/xiaoheita.png";

</script>

<style scoped></style>