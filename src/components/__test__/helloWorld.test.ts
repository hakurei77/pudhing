import { mount } from '@vue/test-utils';
import { describe, test, expect } from 'vitest';
import HelloWorld from './../HelloWorld.vue';

describe('HelloWorld.vue', () => {
    test('renders "你好" when mounted', () => {
        const wrapper = mount(HelloWorld);
        expect(wrapper.text()).toBe('你好');
    });
});