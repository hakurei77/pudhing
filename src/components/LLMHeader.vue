<template>
    <div class="fixed flex bg-[#f7f7f7] w-full h-[50px] items-center border-b-[1px] border-solid border-[#e4e7e7]">
        <SvgIcon name="list" width="1.5em" height="1.5em" class="ml-5" />
        <ImgBox :scale="3.5" :src="imgScr" class="ml-5"/>
        <span class="ml-2 font-bold">小黑塔助手</span>
    </div>
</template>

<script setup lang="ts">
import imgScr from "@/assets/imgs/xiaoheita.png";

</script>

<style scoped></style>