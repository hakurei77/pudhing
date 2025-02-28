import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ChatDialog from '@/components/InlineButton.vue'; // 请根据你的文件路径调整

describe('ChatDialog.vue', () => {
    it('should open and close the dialog', async () => {
        const wrapper = mount(ChatDialog);

        // 初始状态下对话框应该是关闭的
        expect(wrapper.find('.fixed').exists()).toBe(false);

        // 点击输入框，对话框应该打开
        await wrapper.find('.cursor-pointer').trigger('click');
        expect(wrapper.find('.fixed').exists()).toBe(true);

        // 点击对话框外部，对话框应该关闭
        await wrapper.find('.fixed').trigger('click.self');
        expect(wrapper.find('.fixed').exists()).toBe(false);
    });

    it('should send a user message and receive a bot reply', async () => {
        const wrapper = mount(ChatDialog);

        // 打开对话框
        await wrapper.find('.cursor-pointer').trigger('click');

        // 输入消息并发送
        const input = wrapper.find('input[type="text"]');
        await input.setValue('Hello, bot!');
        await wrapper.find('button').trigger('click');
    });

    it('should scroll to the bottom when a new message is added', async () => {
        const wrapper = mount(ChatDialog);

        // 打开对话框
        await wrapper.find('.cursor-pointer').trigger('click');

        // 输入消息并发送
        const input = wrapper.find('input[type="text"]');
        await input.setValue('Hello, bot!');
        await wrapper.find('button').trigger('click');

        // 检查是否滚动到底部
        const messagesContainer = wrapper.find('.overflow-y-auto');
        expect(messagesContainer.element.scrollTop).toBe(messagesContainer.element.scrollHeight);
    });
});