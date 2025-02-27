<template>
    <div class="w-full flex flex-col p-3">
        <span class="mb-2">pd-imgBox</span>
        <div class="flex">
            <pd-imgBox class="w-[50px] h-[50px] mr-2" :src="imgSrc"></pd-imgBox>
            <pd-imgBox class="w-[50px] h-[50px]" :scale="6" :src="imgSrc"></pd-imgBox>
        </div>      
        <span class="mb-2">pd-markdownParser</span>
        <div class="flex">
            <PdMarkdownParser :data="text"></PdMarkdownParser>
        </div>    
        <span class="mb-2">pd-button</span>
        <div class="flex">
            <pd-button @click="handleSubmit"></pd-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import imgSrc from "./assets/imgs/abc.png";
import {data} from "./assets/data/data.js";
interface Attachment {
  file: File;
  type: 'image' | 'file';
  name: string;
  size: string;
  base64: string;
  preview?: string;
}
interface SubmitData {
  text: string;
  attachments: Attachment[];
}
const text = data
const handleSubmit = ({ text, attachments }: SubmitData) => {
    console.log('提交的文本:', text);
    console.log('提交的附件:', attachments);
};
</script>

<style scoped>

</style>: 