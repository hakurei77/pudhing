<template>
    <div class="w-[100%] rounded-[8px] bg-[var(--background-gray)] p-4">
        <div class="flex items-center w-full">
            <template v-if="img === ''">
                <pd-imgBox :scale="5" :src="imgSrc"/>
            </template>
            <template v-else>
                <pd-imgBox class="mr-2 flex-shrink-0" :scale="4" :src="getImageSrc"/>
            </template>
            <span class="ml-2 font-bold text-xl">{{ name }}</span>
        </div>
        <div class="mt-2 w-full text-sm text-justify">
            <span class="mt-2 break-words">{{ description }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import imgSrc from "@/assets/imgs/pudhing.png";
import { processImg } from "@/utils/processImg";
const props = withDefaults(defineProps<{
    name: string,
    description: string,
    img?: string
}>(), {
    img: ''
});
/**
 * 处理图片
*/
const getImageSrc = computed(() => {
    return processImg(props.img);
});
</script>

<style scoped>

</style>