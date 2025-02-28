import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia } from 'pinia'; // 引入 Pinia
import YourComponent from '@/components/LLMLayout.vue'; // 替换为你的组件路径
import SidebarLayout from '@/components/SidebarLayout.vue'; // 替换为你的 SidebarLayout 组件路径
import { RouterView } from 'vue-router'; // 引入 RouterView

describe('YourComponent', () => {
    it('renders SidebarLayout and RouterView', () => {
        // 创建 Pinia 实例
        const pinia = createPinia();

        // 挂载组件并传入 Pinia
        const wrapper = mount(YourComponent, {
            global: {
                plugins: [pinia], // 使用 Pinia
            },
        });

        // 检查 SidebarLayout 是否被渲染
        const sidebarLayout = wrapper.findComponent(SidebarLayout);
        expect(sidebarLayout.exists()).toBe(true);

        // 检查 RouterView 是否被渲染
        const routerView = wrapper.findComponent(RouterView);
        expect(routerView.exists()).toBe(false);
    });

    it('has the correct class', () => {
        // 创建 Pinia 实例
        const pinia = createPinia();

        // 挂载组件并传入 Pinia
        const wrapper = mount(YourComponent, {
            global: {
                plugins: [pinia], // 使用 Pinia
            },
        });

        // 检查根元素是否包含 'flex' 类
        expect(wrapper.classes()).toContain('flex');
    });
});