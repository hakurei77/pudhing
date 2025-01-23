import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import HelloWorld from './../HelloWorld.vue';

describe('HelloWorld.vue', () => {
    it('renders props.msg when passed', () => {
        const msg = 'Hello Vitest!';
        const wrapper = mount(HelloWorld, {
            props: { msg },
        });
        expect(wrapper.find('h1').text()).toBe(msg);
    });

    it('increments count when button is clicked', async () => {
        const wrapper = mount(HelloWorld, {
            props: { msg: 'Test Message' },
        });

        const button = wrapper.find('button');
        expect(button.text()).toContain('count is 0');

        await button.trigger('click');
        expect(button.text()).toContain('count is 1');

        await button.trigger('click');
        expect(button.text()).toContain('count is 2');
    });

    it('renders the correct structure', () => {
        const wrapper = mount(HelloWorld, {
            props: { msg: 'Test Message' },
        });

        // Check if specific elements are rendered
        expect(wrapper.find('h1').exists()).toBe(true);
        expect(wrapper.find('.card').exists()).toBe(true);
        expect(wrapper.find('button').exists()).toBe(true);
        expect(wrapper.find('p.read-the-docs').exists()).toBe(true);

        // Check if the links exist and have correct attributes
        const links = wrapper.findAll('a');
        expect(links.length).toBe(2);
        expect(links[0].attributes('href')).toBe(
            'https://vuejs.org/guide/quick-start.html#local'
        );
        expect(links[1].attributes('href')).toBe(
            'https://vuejs.org/guide/scaling-up/tooling.html#ide-support'
        );
    });
});