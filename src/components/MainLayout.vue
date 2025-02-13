<template>
    <div class="flex flex-col h-screen flex-1">
        <LLMHeader class="flex-shrink-0" :name="currentAssistantData.assistantData.name"  @update-data="handleUpdate"/>
        <div class="flex overflow-auto overflow-x-hidden flex-col items-center w-full p-6 flex-1" ref="scrollContainer">
            <CharacterIntroduction :name="currentAssistantData.assistantData.name" :description="currentAssistantData.assistantData.description" class="max-w-[800px]" />
            <DialogBox class="max-w-[800px]" />
        </div>
        <SubmitButton :sendScrollToBottom="ScrollToBottom"/>
    </div>
</template>

<script setup lang="ts">
import { ref , nextTick , onMounted } from 'vue';
import LLMHeader from './LLMHeader.vue';
import CharacterIntroduction from './MainCharacterIntroduction.vue';
import DialogBox from './MainDialogBox.vue';
import SubmitButton from './SubmitButton.vue';
import { useSidebarStateStore } from '@/store/sidebarState';
import { useCurrentAssistantDataStore } from '@/store/currentAssistantData';
const SidebarState = useSidebarStateStore();
const currentAssistantData = useCurrentAssistantDataStore();
/**
 * 此函数用于接收LLMHeader的侧边栏状态
*/
const handleUpdate = (payload: boolean) => {
    SidebarState.value = payload;
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