<template>
    <div class="flex flex-col h-screen flex-1 items-center justify-center">
        <SvgIcon name="list" :scale="1.5" class="ml-5 mt-5 cursor-pointer absolute left-0 top-0 lg:hidden" @click="openSidebar" />
        <div class="flex items-center justify-center">
            <pd-imgBox :scale="10" :src="pudhing" />
            <span class="ml-2 font-bold text-6xl">Pudhing</span>
        </div>
        <div class="flex">
            <template v-for="item in assistantDataStore.data.slice(0,3)" :key="item.id">
                <MainChatAssistantSelect :text="item.name" :id="item.id" :img="item.image" @click="selectItem(item.id)"  />
            </template>
            <div class="flex items-center cursor-pointer border-transparent hover:border-[var(--primary-color)] border-solid border-[2px] transition-colors rounded-lg p-1">
                <SvgIcon name="box" class="mr-1"/>
                <span class="text-sm">更多</span>
            </div>
        </div>
        <pd-button @click="handleSubmit"/>
    </div>
</template>

<script setup lang="ts">
import pudhing from "@/assets/imgs/pudhing.png";
import MainChatAssistantSelect from "@/components/MainChatAssistantSelect.vue";
import { useAssistantDataStore } from "@/store/assistantData";
import { useSidebarStateStore } from '@/store/sidebarState';
import { SubmitFunc } from '@/utils/submit';
import type { SubmitData } from '@/utils/submit';
const assistantDataStore = useAssistantDataStore();
const SidebarState = useSidebarStateStore();
/**
 * 选择当前对话assistant/
*/
const selectItem = (id: string) => {
    assistantDataStore.changeCurrentAssistant(id);
};
const handleSubmit = async ({ text, attachments }: SubmitData) => {
    await SubmitFunc(text,attachments,assistantDataStore.currentId);
};

const openSidebar = () => {
    SidebarState.value = true;
};
</script>

<style scoped>

</style>