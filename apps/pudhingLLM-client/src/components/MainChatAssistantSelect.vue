<template>
    <div :class="activeClass" class="flex items-center justify-center border-solid border-1 border-[var(--divided-line)] pt-1 pb-1 pl-2 pr-2 rounded-lg mr-2 cursor-pointer">
        <template v-if="img === ''">
            <pd-imgBox :scale="2" :src="imgScr"/>
        </template>
        <template v-else>
            <pd-imgBox :scale="2" :src="getImageSrc"/>
        </template>
        <span class="ml-2">{{ text }}</span>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import imgScr from "@/assets/imgs/pudhing.png";
import { useAssistantDataStore } from "@/store/assistantData";
import { processImg } from "@/utils/processImg";
const assistantDataStore = useAssistantDataStore();
const props = withDefaults(defineProps<{
    id?: string,
    text: string,
    img?: string
}>(), {
    img: ''
});
/**
 * 处理激活样式
*/
const activeClass = computed(() => {
    return {
        'border-solid border-2': true,
        'border-[var(--primary-color)]': props.id === assistantDataStore.currentId,
        'border-[var(--divided-line)]': props.id !== assistantDataStore.currentId  
    };
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