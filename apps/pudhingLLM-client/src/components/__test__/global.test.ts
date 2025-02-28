import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { createApp } from 'vue';
import globalComponents from '../Global/index'; // 替换为你的全局组件注册文件路径
import SvgIcon from '../Global/SvgIcon.vue'; // 替换为你的 SvgIcon 组件路径

describe('globalComponents plugin', () => {
    it('should register SvgIcon globally', () => {
        const app = createApp({});
        app.use(globalComponents);

        const wrapper = mount(app, {
            global: {
                components: {
                    SvgIcon,
                },
            },
        });

        // 检查 SvgIcon 是否被注册为全局组件
        expect(wrapper.findComponent(SvgIcon).exists()).toBe(false);
    });
});