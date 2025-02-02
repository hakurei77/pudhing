<template>
    <div class="w-full flex flex-col">
        <div class="relative w-[90%] border-[3px] border-[#6db5c1] rounded-xl p-1 mt-2 text-justify text-sm self-end min-h-[70px]">
            <img :src="mikulogo" class="absolute w-[80px] top-[-19px] left-[-28px] opacity-80 rotate-350">
            <img :src="miku" class="absolute w-[70px] right-0 bottom-0 z-[-1] opacity-80">
            <div class="p-3 w-full border-[2px] border-[#6db5c1] border-dotted rounded-xl min-h-[70px]">
                <span class="break-words">你可以给我讲一个故事吗</span>
            </div>
        </div>
        <div class="w-[90%] bg-[var(--background-gray)] rounded-xl p-4 mt-2 self-start text-justify text-sm">
            <p>这是ai框还没有做完</p>
            <span class="break-words">我刚满十二岁，今天是生日。阳光透过窗户洒进来，照在地板上形成一片温暖的光斑。我蹦蹦跳跳地跑过去，接过那个散发着淡淡松香的木盒。</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import miku from "@/assets/imgs/miku.png";
import mikulogo from "@/assets/imgs/mikulogo.png";
</script>

<style scoped></style>