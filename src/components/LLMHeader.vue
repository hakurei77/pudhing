<template>
    <template v-if="type === 'header'">
        <div v-bind="$attrs" class="flex bg-[var(--background-gray)] w-full h-[50px] items-center border-b-[1px] border-solid border-[var(--divided-line)]">
            <SvgIcon name="list" :scale="1.5" class="ml-5 cursor-pointer lg:hidden" @click="sendData" />
            <ImgBox :scale="3.5" :src="imgScr" class="ml-5" />
            <span class="ml-2 font-bold">小黑塔助手</span>
        </div>
    </template>
    <template v-if="type === 'sidebar'">
        <div v-bind="$attrs" class="flex bg-[var(--background-gray)] w-full h-[50px] items-center border-b-[1px] border-solid border-[var(--divided-line)]">
            <ImgBox :scale="3.5" :src="pudhing" class="ml-5" />
            <span class="ml-2 font-bold">Pudhing</span>
        </div>
    </template>

</template>

<script setup lang="ts">
import imgScr from "@/assets/imgs/xiaoheita.png";
import pudhing from "@/assets/imgs/pudhing.png";
withDefaults(defineProps<{
    type?: string
}>(), {
    type: "header"
});

const emit = defineEmits(['updateData']);
const sendData = () => {
    emit('updateData', true);
};

</script>

<style scoped></style>