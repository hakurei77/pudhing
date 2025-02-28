<template>
    <!-- 新增外层flex布局容器 -->
    <div class="flex flex-col h-screen flex-1 items-center justify-center">
        <div class="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
            <form @submit.prevent="handleSubmit" class="space-y-6">
                <!-- 类型选择 -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">类型</label>
                    <select v-model="formData.type" 
                            class="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] rounded-md cursor-pointer">
                        <option v-for="option in typeOptions" :value="option" :key="option">
                            {{ option }}
                        </option>
                    </select>
                </div>
                <!-- 名称 -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">名称</label>
                    <input v-model="formData.name" 
                           type="text" 
                           placeholder="请输入名称" 
                           class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)]"
                           required>
                </div>
                <!-- 提示语 -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">提示语</label>
                    <input v-model="formData.prompt" 
                           type="text" 
                           placeholder="请输入提示语" 
                           class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)]"
                           required>
                </div>
                <!-- 描述 -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">描述</label>
                    <textarea v-model="formData.description" 
                              placeholder="请输入描述" 
                              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] h-32"
                              required></textarea>
                </div>
                <!-- 图片上传 -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">图片</label>
                    <div class="relative">
                        <input type="file" 
                               accept="image/*" 
                               @change="handleImageUpload"
                               ref="fileInput"
                               class="opacity-0 absolute inset-0 w-full h-full z-20 cursor-pointer">
                        <div class="w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center">
                            <span class="text-gray-500">{{ formData.image ? '已选择文件' : '点击上传图片' }}</span>
                            <span v-if="formData.image" class="text-sm text-gray-400 mt-1">
                                {{ fileName }}
                            </span>
                        </div>
                    </div>
                    <img v-if="previewImage" :src="previewImage" class="mt-3 w-32 h-32 object-cover rounded border">
                    <!-- 错误提示 -->
                    <p v-if="errorMessage" class="mt-2 text-sm text-red-600">{{ errorMessage }}</p>
                </div>
                <button type="submit" 
                        class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary-color)] transition-colors cursor-pointer">
                    提交
                </button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
// 保持原来的script部分不变
import { ref } from 'vue';
import { createAssistantApi } from "@/api/data";
import { useRouter } from 'vue-router';  // 添加路由导入

const router = useRouter();  // 获取路由实例
interface FormData {
    type: string;
    prompt: string;
    name: string;
    description: string;
    image: string | null; // 修改为存储base64字符串
}

const typeOptions = ['Doubao-DeepSeek-R1', 'DeepSeek-R1'];
const formData = ref<FormData>({
    type: 'Doubao-DeepSeek-R1',
    prompt: '',
    name: '',
    description: '',
    image: null
});
const previewImage = ref<string | null>(null);
const errorMessage = ref<string>('');
const fileName = ref<string>('');
const fileInput = ref<HTMLInputElement | null>(null);

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 5MB

const handleImageUpload = (event: Event) => {
    errorMessage.value = '';
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    // 检查文件大小
    if (file.size > MAX_FILE_SIZE) {
        errorMessage.value = '文件大小不能超过1MB';
        formData.value.image = null;
        previewImage.value = null;
        fileName.value = '';
        if (fileInput.value) fileInput.value.value = ''; // 清空文件输入
        return;
    }

    // 转换为Base64
    const reader = new FileReader();
    reader.onload = (e) => {
        if (e.target?.result) {
            formData.value.image = e.target.result as string;
            previewImage.value = formData.value.image;
            fileName.value = file.name;
        }
    };
    reader.onerror = () => {
        errorMessage.value = '文件读取失败';
        formData.value.image = null;
        previewImage.value = null;
    };
    reader.readAsDataURL(file);
};

const handleSubmit = async () => {
    try {
        const requestData = {
            type: formData.value.type,
            name: formData.value.name,
            prompt: formData.value.prompt,
            description: formData.value.description,
            image: formData.value.image ? formData.value.image.split(',')[1] : '' // 移除 base64 的前缀
        };
        await createAssistantApi(JSON.stringify(requestData));
        formData.value = {
            type: 'Doubao-DeepSeek-R1',
            prompt: '',
            name: '',
            description: '',
            image: null
        };
        // 清空相关状态
        previewImage.value = null;
        fileName.value = '';
        if (fileInput.value) fileInput.value.value = '';
        router.go(0); 
    } catch (error) {
        alert('创建失败:' + error);
    }
};
</script>