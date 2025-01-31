<template>
    <div class="w-full p-2.5 cursor-text" @click="focusTextarea">
        <div class="bg-[var(--background-gray)] rounded-xl p-3 shadow-sm transition-all duration-300 
                    focus-within:ring-2 focus-within:ring-[var(--primary-color)]">
            <div class="pl-1.5 pr-1.5">
                <textarea ref="textarea" rows="1" placeholder="输入信息..." class="w-full mt-[4px] max-h-[350px] overflow-y-auto resize-none bg-transparent outline-none placeholder-[var(--background-text-gray)] text-sm"
                          oninput="this.style.height = 'auto'; this.style.height = Math.min(this.scrollHeight, 350) + 'px'" v-model="textareaContent"/>
                <div v-if="attachments.length > 0" class="flex pt-[16px] overflow-x-auto scroll-smooth"
                     @wheel="handleHorizontalScroll">
                    <template v-for="(attachment, index) in attachments" :key="index">
                        <div v-if="attachment.type === 'image'"
                             class="w-[64px] h-[64px] relative rounded-xl mr-2 flex-shrink-0">
                            <img :src="attachment.preview" class="w-full h-full object-cover rounded-xl">
                            <div class="w-[24px] h-[24px] rounded-full absolute top-[-12px] right-[-12px] bg-white flex items-center justify-center cursor-pointer"
                                 @click="removeAttachment(index)">
                                <SvgIcon name="x" />
                            </div>
                        </div>
                        <div v-else
                             class="h-[64px] relative mr-2 p-3 rounded-xl flex items-center border-solid border-[1px] border-[var(--divided-line)] flex-shrink-0">
                            <div class="w-[24px] h-[24px] mr-2 flex items-center justify-center">
                                <SvgIcon name="file" :scale="1.5" />
                            </div>
                            <div class="flex flex-col">
                                <span>{{ attachment.name }}</span>
                                <span class="text-sm text-[var(--background-text-gray)]">文件 · {{ attachment.size }}</span>
                            </div>
                            <div class="w-[24px] h-[24px] rounded-full absolute top-[-12px] right-[-12px] bg-white flex items-center justify-center cursor-pointer"
                                 @click="removeAttachment(index)">
                                <SvgIcon name="x" />
                            </div>
                        </div>
                    </template>
                </div>
            </div>
            <div class="flex relative mt-[4px]">
                <div class="group relative">
                    <div class="w-[30px] h-[30px] rounded-full flex items-center justify-center hover:bg-[var(--hover-gray)] cursor-pointer"
                         @click="openFilePicker">
                        <SvgIcon name="plus" :scale="1.5" />
                    </div>
                    <span
                        class="absolute bottom-[120%] left-1/2 -translate-x-1/2 mb-1 px-3 py-2 text-xs text-white bg-black rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap
                                 after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-8 after:border-t-black after:border-x-transparent after:border-b-transparent">
                        选择附件
                    </span>
                    <input ref="fileInput" type="file" hidden multiple accept="image/*, 
                                                                .pdf, application/pdf, 
                                                                .doc, .docx, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document,
                                                                .xls, .xlsx, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,
                                                                .md, text/markdown, text/plain" @change="handleFileSelect">
                </div>
                <div class="flex items-center absolute right-0">
                    <span class="text-xs text-[var(--background-text-gray)] mr-2">Enter 发送 · Ctrl+Enter 换行</span>
                    <template v-if="isLoading">
                        <div class="w-[30px] h-[30px] flex items-center justify-center">
                            <div class="w-[70%] h-[70%] border-2 border-[var(--primary-color)] border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    </template>
                    <template v-else>
                        <div v-if="textareaContent.trim() !== '' || attachments.length > 0" class="w-[30px] h-[30px] rounded-full flex items-center justify-center bg-[var(--primary-color)] cursor-pointer" @click="handleSubmit">
                            <SvgIcon name="arrow-right" color="white" :scale="1.5" />
                        </div>
                        <div v-else class="w-[30px] h-[30px] rounded-full flex items-center justify-center cursor-not-allowed">
                            <SvgIcon name="arrow-right" color="var(--background-text-gray)" :scale="1.5" />
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue';
import { useFormDataStore } from "@/store/useFormDataStore";
const formDataStore = useFormDataStore(); 
interface Attachment {  // 附件类型
    file: File;
    type: 'image' | 'file';
    name: string;
    size: string;
    preview?: string;
}
const attachments = ref<Attachment[]>([]);  // 附件列表
const textareaContent = ref('');        //文本信息
// ======================
// 页面交互
// ======================
//控制滚动条横向滑动
const handleHorizontalScroll = (e: WheelEvent) => {
    e.preventDefault();
    const container = e.currentTarget as HTMLElement;
    if (!(container instanceof HTMLElement)) return;
    container.scrollLeft += e.deltaY;
};
//文本聚焦
const textarea = ref<HTMLTextAreaElement | null>(null); //文本域，用来控制输入框聚焦
const focusTextarea = () => {
    textarea.value?.focus();
};
// 打开文件
const fileInput = ref<HTMLInputElement | null>(null);   //文件选择器（支持多选）
const openFilePicker = () => {
    fileInput.value?.click(); 
};
// ======================
// 主要逻辑
// ======================
// 选择文件
const handleFileSelect = (e: Event) => {
    const MAX_FILE_SIZE = 5 * 1024 * 1024;  //最大文件大小
    const files = (e.target as HTMLInputElement).files;
    if (!files) return;
    Array.from(files).forEach(file => {
        if (file.size  > MAX_FILE_SIZE) {
            alert(`文件 ${file.name}  太大了，最大支持 ${formatFileSize(MAX_FILE_SIZE)}!`);
            return;
        }
        const type = file.type.startsWith('image/') ? 'image' : 'file';
        const attachment: Attachment = {
            file,
            type,
            name: file.name,
            size: formatFileSize(file.size)
        };
        if (type === 'image') {
            attachment.preview = URL.createObjectURL(file);
        }
        attachments.value.push(attachment);
    });
};
// 格式化文件大小
const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};
// 删除附件
const removeAttachment = (index: number) => {
    const [removed] = attachments.value.splice(index, 1);
    if (removed.preview) {
        URL.revokeObjectURL(removed.preview);
    }
};
// 清理预览URL
onBeforeUnmount(() => {
    attachments.value.forEach(attachment => {
        if (attachment.preview) {
            URL.revokeObjectURL(attachment.preview);
        }
    });
});
// 修改后的提交处理
const isLoading = ref(false); // 加载状态
const handleSubmit = () => {
    isLoading.value = true;
    formDataStore.value = {
        text: textareaContent.value,
        file: attachments.value
    };
    isLoading.value = false;
    dataInit();
    //console.log(formDataStore.value);
};
const dataInit = () => {
    textareaContent.value = '';
    attachments.value = [];
};
</script>
<style scoped></style>