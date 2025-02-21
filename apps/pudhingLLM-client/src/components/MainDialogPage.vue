<template>
    <div class="flex flex-col h-screen flex-1">
        <LLMHeader class="flex-shrink-0" :name="assistantDataStore.getCurrentAssistant(assistantDataStore.currentId)!.name"  @click="openSidebar"/>
        <div class="flex overflow-auto overflow-x-hidden flex-col items-center w-full p-6 flex-1" ref="scrollContainer">
            <MainCharacterIntroduction :name="assistantDataStore.getCurrentAssistant(assistantDataStore.currentId)!.name" 
                                       :description="assistantDataStore.getCurrentAssistant(assistantDataStore.currentId)!.description" class="max-w-[800px]" />
            <MainDialogBox class="max-w-[800px]" :historyDataList="assistantDataStore.getCurrentAssistant(assistantDataStore.currentId)!.histories" />
        </div>
        <SubmitButton :sendScrollToBottom="ScrollToBottom"/>
    </div>
</template>

<script setup lang="ts">
import { ref , nextTick , onMounted } from 'vue';
import LLMHeader from './LLMHeader.vue';
import MainCharacterIntroduction from './MainCharacterIntroduction.vue';
import MainDialogBox from './MainDialogBox.vue';
import SubmitButton from './SubmitButton.vue';
import { useSidebarStateStore } from '@/store/sidebarState';
import { useAssistantDataStore } from "@/store/assistantData";
const assistantDataStore = useAssistantDataStore();
const SidebarState = useSidebarStateStore();
/**
 * 此函数用于修改侧边栏状态
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
onMounted(() => {
    ScrollToBottom();
});
</script>

<style scoped>

</style>