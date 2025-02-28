<template>
    <div class="flex flex-col h-screen flex-1">
        <LLMHeader class="flex-shrink-0"
                   :name="assistantDataStore.getCurrentAssistant(assistantDataStore.currentId)!.name"
                   :img="assistantDataStore.getCurrentAssistant(assistantDataStore.currentId)!.image" @click="openSidebar" />
        <div class="flex overflow-auto overflow-x-hidden flex-col items-center w-full p-6 flex-1" ref="scrollContainer">
            <MainCharacterIntroduction
                :name="assistantDataStore.getCurrentAssistant(assistantDataStore.currentId)!.name"
                :description="assistantDataStore.getCurrentAssistant(assistantDataStore.currentId)!.description"
                :img="assistantDataStore.getCurrentAssistant(assistantDataStore.currentId)!.image"
                class="max-w-[800px]" />
            <MainDialogBox class="max-w-[800px]"
                           :historyDataList="assistantDataStore.getCurrentAssistant(assistantDataStore.currentId)!.histories"
                           :name="assistantDataStore.getCurrentAssistant(assistantDataStore.currentId)!.name"
                           :img="assistantDataStore.getCurrentAssistant(assistantDataStore.currentId)!.image" />
        </div>
        <pd-button @click="handleSubmit" :isLoading="isLoading" />
    </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue';
import LLMHeader from '@/components/LLMHeader.vue';
import MainCharacterIntroduction from '@/components/MainCharacterIntroduction.vue';
import MainDialogBox from '@/components/MainDialogBox.vue';
import { useSidebarStateStore } from '@/store/sidebarState';
import { useAssistantDataStore } from "@/store/assistantData";

import { SubmitFunc } from '@/utils/submit';
import type { SubmitData } from '@/utils/submit';
const assistantDataStore = useAssistantDataStore();
const SidebarState = useSidebarStateStore();
/**
 * 此函数用于修改侧边栏状态/
*/
const openSidebar = () => {
    SidebarState.value = true;
};
const scrollContainer = ref<HTMLElement>();
/**
 * 此函数用于控制对话框滚动到底部
 */
const ScrollToBottom = () => {
    nextTick(() => {
        scrollContainer.value?.scrollTo({
            top: scrollContainer.value.scrollHeight,
        });
    });
};
const isLoading = ref(false);
const handleSubmit = async ({ text, attachments }: SubmitData) => {
    isLoading.value = true;
    ScrollToBottom();
    isLoading.value = await SubmitFunc(text, attachments, assistantDataStore.currentId);
};
onMounted(() => {
    ScrollToBottom();
});
</script>

<style scoped></style>