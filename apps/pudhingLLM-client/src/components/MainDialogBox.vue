<template>
    <div class="w-full flex flex-col">
        <template v-for="(item, index) in historyDataList" :key="index">
            <template v-if="item.role === 'user'">
                <div class="relative w-[90%] border-[3px] border-[#6db5c1] rounded-xl p-1 mt-2 text-justify text-sm self-end min-h-[70px]">
                    <img :src="mikulogo" class="absolute w-[80px] top-[-19px] left-[-28px] opacity-80 rotate-350">
                    <img :src="miku" class="absolute w-[70px] right-0 bottom-0 z-[-1] opacity-80">
                    <div class="p-3 w-full border-[2px] border-[#6db5c1] border-dotted rounded-xl min-h-[70px]">
                        <template v-for="(i, _) in item.contentList" :key="_">
                            <template v-if="i.type === 'text'">
                                <span class="break-all whitespace-break-spaces">{{ i.text }}</span>
                            </template>
                            <template v-if="i.type === 'image_url'">
                                <pd-imgBox :scale="8" :src="i.image_url.url"/>
                            </template>
                        </template>
                    </div>
                </div>
            </template>
            <template v-if="item.role === 'assistant'">
                <div class="w-[90%] mt-2 self-start text-justify text-sm">
                    <div class="flex items-center">
                        <template v-if="img === ''">
                            <pd-imgBox :scale="2" :src="imgScr"/>
                        </template>
                        <template v-else>
                            <pd-imgBox :scale="2" :src="getImageSrc"/>
                        </template>
                        <span class="ml-2">{{ name }}</span>
                        <SvgIcon class="ml-2 cursor-pointer" name="more" />
                    </div>
                    <div class="bg-[var(--background-gray)] rounded-xl p-4 mt-2">
                        <template v-for="(i, _) in item.contentList" :key="_">
                            <template v-if="i.type === 'text'">
                                <PdMarkdownParser class="break-all" :data="i.text" />
                            </template>
                        </template>
                    </div>
                </div>
            </template>
        </template>
    </div>
</template>

<script setup lang="ts">
import miku from "@/assets/imgs/miku.png";
import mikulogo from "@/assets/imgs/mikulogo.png";
import imgScr from "@/assets/imgs/pudhing.png";
import { computed } from "vue";
import { processImg } from "@/utils/processImg";
type User = {
    type: 'text';
    text: string;
};
type Assistant = {
    type: 'image_url';
    image_url: {
        url: string;
    };
};
type ContentList = User | Assistant ;
type HistoryData = {
    id: number,
    role: string,
    contentList: ContentList[]
};
const props = withDefaults(defineProps<{
    historyDataList: HistoryData[];
    name: string;
    img: string;
}>(), {
    img: ''
});
/**
 * 处理图片
*/
const getImageSrc = computed(() => {
    return processImg(props.img);
});
</script>

<style scoped></style>