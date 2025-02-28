<template>
    <transition name="slide">
        <div v-if="sidebarState.value" class="w-[75%] h-screen bg-white fixed z-3">
            <LLMHeader type="sidebar" />
            <div class="w-full p-3 border-solid border-b border-[var(--divided-line)] flex">
                <div class="w-[50%] h-[70px] bg-[var(--background-gray)] mr-2 rounded-md flex flex-col p-2.5 justify-between">
                    <SvgIcon name="message-circle" :scale="1.5" />
                    <div class="flex justify-between items-center">
                        <span class="font-bold text-sm">开始聊天</span>
                        <SvgIcon name="chevron-right" :scale="1.5" />
                    </div>
                </div>
                <div class="w-[50%] h-[70px] bg-[var(--background-gray)] rounded-md flex flex-col p-2.5 justify-between">
                    <SvgIcon name="robot-plus" :scale="1.5" />
                    <div class="flex justify-between items-center">
                        <span class="font-bold text-sm">创建机器人</span>
                        <SvgIcon name="plus" :scale="1.5" />
                    </div>
                </div>
            </div>
        </div>
    </transition>
    <transition name="overlay">
        <div v-if="sidebarState.value" class="fixed inset-0 bg-black/50 z-2" @click="cancelOpen"></div>
    </transition>
    <div class="w-[300px] h-screen bg-white hidden lg:block border-solid border-r border-[var(--divided-line)]">
        <LLMHeader type="sidebar" />
        <div class="w-full p-3 border-solid border-b border-[var(--divided-line)] flex">
            <RouterLink to="/chat" class="w-[50%] h-[70px] bg-[var(--background-gray)] border-transparent hover:border-[var(--primary-color)] border-solid border-[2px] transition-colors cursor-pointer mr-2 rounded-md flex flex-col p-2.5 justify-between">
                <SvgIcon name="message-circle" :scale="1.5" />
                <div class="flex justify-between items-center">
                    <span class="font-bold text-sm">开始聊天</span>
                    <SvgIcon name="chevron-right" :scale="1.5" />
                </div>
            </RouterLink>
            <RouterLink to="/create" class="w-[50%] h-[70px] bg-[var(--background-gray)] border-transparent hover:border-[var(--primary-color)] border-solid border-[2px] transition-colors cursor-pointer rounded-md flex flex-col p-2.5 justify-between">
                <SvgIcon name="robot-plus" :scale="1.5" />
                <div class="flex justify-between items-center">
                    <span class="font-bold text-sm">创建机器人</span>
                    <SvgIcon name="plus" :scale="1.5" />
                </div>
            </RouterLink>
        </div>
        <template v-for="item in assistantDataStore.data" :key="item.id">
            <RouterLink :to="`/chat/${item.id}`" @click="changeAssistant(item.id)">
                <SidebarAssistantIntroduction :type="item.type" :description="item.description" :name="item.name" :id="item.id" :img="item.image" />
            </RouterLink>
        </template>
    </div>
</template>

<script setup lang="ts">
import SvgIcon from './Global/SvgIcon.vue';
import LLMHeader from './LLMHeader.vue';
import SidebarAssistantIntroduction from './SidebarAssistantIntroduction.vue';
import { useSidebarStateStore } from '@/store/sidebarState';
import { useAssistantDataStore } from "@/store/assistantData";
const assistantDataStore = useAssistantDataStore();
const sidebarState = useSidebarStateStore();
/**
 * 此函数用于关闭侧边栏
*/
const cancelOpen = () => {
    sidebarState.value = false;
};
/**
 * 此函数用于切换侧边栏中的assistant
*/
const changeAssistant = (id: string) => {
    assistantDataStore.changeCurrentAssistant(id);
};

</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s ease-in-out;
    will-change: transform;
}

.slide-enter-from,
.slide-leave-to {
    transform: translateX(-100%);
}
.overlay-enter-active,
.overlay-leave-active {
    transition: all 0.3s ease-in-out;
    opacity: 1;
}

.overlay-enter-from,
.overlay-leave-to {
    opacity: 0;
}
</style>