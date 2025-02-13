<template>
    <div :class="activeClass" class="w-full h-[80px] border-b border-[var(--divided-line)] cursor-pointer hover:bg-[var(--background-gray)] flex items-center pr-4 pl-4 pt-2 pb-2 transition-colors">
        <template v-if="img === ''">
            <ImgBox class="mr-2 flex-shrink-0" :scale="4" :src="imgScr"/>
        </template>
        <div class="flex flex-col overflow-hidden text-ellipsis">
            <span class="text-xs truncate text-[var(--background-text-gray)]">{{ type }}</span>
            <span class="truncate mt-2 mb-1">{{ name }}</span>
            <span class="text-xs truncate text-[var(--background-text-gray)]">{{ description }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from 'vue-router';
import imgScr from "@/assets/imgs/pudhing.png";
import { useCurrentAssistantDataStore } from "@/store/currentAssistantData";
const dataListStore = useCurrentAssistantDataStore();
const route = useRoute();
const props = withDefaults(defineProps<{
    id?: string,
    img?: string
    type: string,
    name: string,
    description: string
}>(), {
    img: ''
});
/**
 * 提取路由中的 id
*/ 
const routeId = computed(() => {
    const pathSegments = route.path.split('/');
    return pathSegments[pathSegments.length - 1]; // 获取最后一个路径段
});
/**
 * 处理激活样式
*/
const activeClass = computed(() => {
    return {
        'bg-[var(--background-gray)]': props.id === dataListStore.assistantData.id && props.id === routeId.value,
    };
});
</script>

<style scoped>

</style>