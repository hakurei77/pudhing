<template>
    <div class="w-full h-screen flex flex-col items-center">
        <div class="w-[300px] mt-[300px]">
            <img class="w-full h-full" src="@/assets/imgs/404.png">
        </div>
        <div class="mt-[20px] mb-[20px] text-[20px] font-[600]">狗修金sama，您访问的页面不存在呢QAQ</div>
        <router-link to="/">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
                返回主页
            </button>
        </router-link>
    </div>
</template>

<script setup lang='ts'>

</script>

<style scoped>

</style>