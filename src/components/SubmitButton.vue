<template>
    <!-- <div class="fixed flex items-center justify-center bottom-0 w-full h-[70px] bg-red-300 border-t-[1px] border-solid border-[#e4e7e7] p-2.5 cursor-text">
        <div class="relative w-full h-full bg-[#f7f7f7] rounded-full flex items-center p-3">
            <div class="w-[30px] h-[30px] rounded-full flex items-center justify-center hover:bg-[#f1f2f2] cursor-pointer">
                <SvgIcon name="plus" :scale="1.5" />
            </div>
            <span class="text-[#8d9696] ml-4">输入信息...</span>
            <div class="absolute right-0 mr-3 w-[30px] h-[30px] rounded-full flex items-center justify-center">
                <SvgIcon name="arrow-right" color="#8d9696" :scale="1.5" />
            </div>
        </div>
    </div> -->
    <div class="fixed bottom-0 w-full border-t-[1px] border-[var(--divided-line)] p-2.5">
        <div class="bg-[var(--background-gray)] rounded-xl p-3 shadow-sm transition-all duration-300  focus-within:ring-2 focus-within:ring-[var(--primary-color)]">
            <div class="pl-1.5 pr-1.5">
                <textarea rows="1" placeholder="输入信息..."
                          class="w-full resize-none bg-transparent outline-none placeholder-[var(--background-text-gray)] text-sm overflow-hidden"
                          style="max-height: 400px; overflow-y: auto;"
                          oninput="this.style.height = 'auto'; this.style.height = Math.min(this.scrollHeight, 400) + 'px'" />
                <div v-if="attachments.length > 0" class="flex pt-[16px] overflow-x-auto">
                    <template v-for="(attachment, index) in attachments" :key="index">
                        <div v-if="attachment.type === 'image'" class="w-[64px] h-[64px] relative rounded-xl mr-2 flex-shrink-0">
                            <img :src="attachment.preview" class="w-full h-full object-cover rounded-xl" alt="Preview" >
                            <div class="w-[24px] h-[24px] rounded-full absolute top-[-12px] right-[-12px] bg-white flex items-center justify-center cursor-pointer"
                                 @click="removeAttachment(index)">
                                <SvgIcon name="x" />
                            </div>
                        </div>
                        <div v-else class="h-[64px] border-solid border-[1px] border-[var(--divided-line)] relative rounded-xl mr-2 flex items-center p-3 flex-shrink-0">
                            <div class="w-[24px] h-[24px] flex items-center justify-center mr-2">
                                <SvgIcon name="file" :scale="1.5" />
                            </div>
                            <div class="flex flex-col">
                                <span>{{ attachment.name }}</span>
                                <span class="text-sm text-[var(--background-text-gray)]">文件 · {{ attachment.name }}</span>
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
                    <div
                        class="w-[30px] h-[30px] rounded-full flex items-center justify-center hover:bg-[var(--hover-gray)] cursor-pointer"
                        @click="openFilePicker">
                        <SvgIcon name="plus" :scale="1.5" />
                    </div>
                    <span class="absolute bottom-[120%] left-1/2 -translate-x-1/2 mb-1 px-3 py-2 text-xs text-white bg-black rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap
                                 after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-8 after:border-t-black after:border-x-transparent after:border-b-transparent">
                        选择附件
                    </span>
                </div>
                <div class="flex items-center absolute right-0">
                    <span class="text-xs text-[var(--background-text-gray)] mr-2">Enter 发送 · Ctrl+Enter 换行</span>
                    <div class="w-[30px] h-[30px] rounded-full flex items-center justify-center">
                        <SvgIcon name="arrow-right" color="#8d9696" :scale="1.5" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <input 
        type="file"
        ref="fileInput"
        multiple
        class="hidden"
        @change="handleFileSelect">
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue';

interface Attachment {
  file: File;
  type: 'image' | 'file';
  preview?: string;
  name: string;
  size: string;
}

const attachments = ref<Attachment[]>([]);
const fileInput = ref<HTMLInputElement | null>(null);

// 打开文件选择
const openFilePicker = () => {
    fileInput.value?.click();
};

// 处理文件选择
const handleFileSelect = (e: Event) => {
    const files = (e.target as HTMLInputElement).files;
    if (!files) return;

    Array.from(files).forEach(file => {
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

// 删除附件
const removeAttachment = (index: number) => {
    const [removed] = attachments.value.splice(index, 1);
    if (removed.preview) {
        URL.revokeObjectURL(removed.preview);
    }
};

// 格式化文件大小
const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

// 清理预览URL
onBeforeUnmount(() => {
    attachments.value.forEach(attachment => {
        if (attachment.preview) {
            URL.revokeObjectURL(attachment.preview);
        }
    });
});

</script>

<style scoped></style>