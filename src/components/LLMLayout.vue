<template>
    <div class="flex">
        <SidebarLayout :is-open="SidebarIsOpen" @close="handleSidebarClose"/>
        <div class="flex flex-col h-screen flex-1">
            <LLMHeader class="flex-shrink-0" @update-data="handleUpdate"/>
            <div class="flex overflow-auto overflow-x-hidden flex-col items-center w-full p-6 flex-1" ref="scrollContainer">
                <CharacterIntroduction class="max-w-[800px]" />
                <DialogBox class="max-w-[800px]" />
            </div>
            <SubmitButton :sendScrollToBottom="ScrollToBottom"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref , nextTick , onMounted } from 'vue';
import LLMHeader from './LLMHeader.vue';
import CharacterIntroduction from './CharacterIntroduction.vue';
import DialogBox from './DialogBox.vue';
import SubmitButton from './SubmitButton.vue';
import SidebarLayout from './SidebarLayout.vue';
const SidebarIsOpen = ref(false);
const handleSidebarClose = () => {
    SidebarIsOpen.value = false;
};

// 修改原有的handleUpdate方法（移除自动关闭逻辑）
const handleUpdate = (payload: boolean) => {
    SidebarIsOpen.value = payload;
};
//控制滚动条到底部
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