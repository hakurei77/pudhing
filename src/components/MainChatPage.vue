<template>
    <div class="flex flex-col h-screen flex-1 items-center justify-center">
        <div class="flex items-center justify-center">
            <ImgBox :scale="10" :src="pudhing" />
            <span class="ml-2 font-bold text-6xl">Pudhing</span>
        </div>
        <div class="flex">
            <template v-for="item in localhostData.value.slice(0,3)" :key="item.id">
                <MainChatAssistantSelect :text="item.name" :id="item.id" @click="selectItem(item.id)"  />
            </template>
            <div class="flex items-center cursor-pointer border-transparent hover:border-[var(--primary-color)] border-solid border-[2px] transition-colors rounded-lg p-1">
                <SvgIcon name="box" class="mr-1"/>
                <span class="text-sm">更多</span>
            </div>
        </div>
        <SubmitButton />
    </div>
</template>

<script setup lang="ts">
import pudhing from "@/assets/imgs/pudhing.png";
import SubmitButton from "@/components/SubmitButton.vue";
import MainChatAssistantSelect from "@/components/MainChatAssistantSelect.vue";
import { useLocalhostDataeStore } from "@/store/localhostData";
import { useCurrentAssistantDataStore } from "@/store/currentAssistantData";
const localhostData = useLocalhostDataeStore();
const dataListStore = useCurrentAssistantDataStore();
/**
 * 选择当前对话assistant
*/
const selectItem = (id: string) => {
    dataListStore.addAssistantData(id);
};
</script>

<style scoped>

</style>