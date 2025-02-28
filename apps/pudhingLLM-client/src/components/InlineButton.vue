<template>
    <div>
        <div class="w-[100px] h-full flex items-center justify-center cursor-pointer" @click="showDialog = true">
            <input type="text" placeholder="请输入消息..." readonly
                   class="flex-1 px-4 py-2 text-sm border border-gray-200 rounded-md focus:outline-none cursor-pointer">
        </div>

        <!-- 调整后的对话框 -->
        <div v-if="showDialog" class="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
             @click.self="showDialog = false">
            <div class="bg-white w-[90%] md:w-[60%] max-w-[600px] max-h-[80vh] rounded-lg shadow-lg flex flex-col">
                <!-- 输入框 -->
                <div class="border-b p-3">
                    <div class="flex gap-2">
                        <input ref="inputRef" type="text" v-model="inputMessage" @keyup.enter="sendMessage"
                               placeholder="请输入消息..."
                               class="flex-1 px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500">
                        <button @click="sendMessage"
                                class="px-3 py-1.5 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600">
                            发送
                        </button>
                    </div>
                </div>

                <!-- 消息内容区域 -->
                <div ref="messagesContainer" class="flex-1 p-4 overflow-y-auto">
                    <div class="space-y-3">
                        <div v-for="(msg, index) in messages" :key="index" :class="[
                            'p-2 rounded-lg max-w-[80%] break-words',
                            msg.type === 'user'
                                ? 'ml-auto bg-blue-100 text-right'
                                : 'bg-gray-100'
                        ]">
                            {{ msg.content }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, nextTick, watch } from 'vue';

const showDialog = ref(false);
const inputMessage = ref('');
const messages = ref<Array<{ type: 'user' | 'bot', content: string }>>([]);
const messagesContainer = ref<HTMLElement | null>(null);
const inputRef = ref<HTMLInputElement | null>(null);

// 自动聚焦输入框
watch(showDialog, (visible) => {
    if (visible) {
        nextTick(() => inputRef.value?.focus());
    }
});

const sendMessage = () => {
    const content = inputMessage.value.trim();
    if (!content) return;

    // 添加用户消息
    messages.value.push({ type: 'user', content });

    // 模拟机器人回复
    setTimeout(() => {
        messages.value.push({ type: 'bot', content: '我是pudhing-ai，一个ai小助手' });
        scrollToBottom();
    }, 500);

    inputMessage.value = '';
    scrollToBottom();
};

// 滚动到底部
const scrollToBottom = () => {
    nextTick(() => {
        if (messagesContainer.value) {
            messagesContainer.value.scrollTo({
                top: messagesContainer.value.scrollHeight,
                behavior: 'smooth'
            });
        }
    });
};
</script>