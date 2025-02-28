import { mount } from '@vue/test-utils';
import MyComponent from '@/components/LLMHeader.vue'; // 替换为你的组件路径
import { describe, it, expect } from 'vitest';
import SvgIcon from '../Global/SvgIcon.vue'; // 替换为你的SvgIcon组件路径
import InlineButton from '@/components/InlineButton.vue'; // 替换为你的InlineButton组件路径

describe('MyComponent', () => {
  it('renders header type correctly', () => {
    const wrapper = mount(MyComponent, {
      props: {
        type: 'header',
        name: 'Test Name',
        img: 'test-image.png',
      },
      global: {
        components: {
          SvgIcon,
          InlineButton,
        },
      },
    });

    expect(wrapper.find('.flex').exists()).toBe(true);
    expect(wrapper.find('span').text()).toBe('Test Name');
    expect(wrapper.findComponent(SvgIcon).exists()).toBe(true);
    expect(wrapper.findComponent(InlineButton).exists()).toBe(true);
  });

  it('renders sidebar type correctly', () => {
    const wrapper = mount(MyComponent, {
      props: {
        type: 'sidebar',
      },
      global: {
        components: {
          SvgIcon,
        },
      },
    });

    expect(wrapper.find('.flex').exists()).toBe(true);
    expect(wrapper.find('span').text()).toBe('Pudhing');
  });

  it('emits click event when SvgIcon is clicked', async () => {
    const wrapper = mount(MyComponent, {
      props: {
        type: 'header',
      },
      global: {
        components: {
          SvgIcon,
          InlineButton,
        },
      },
    });

    await wrapper.findComponent(SvgIcon).trigger('click');
    expect(wrapper.emitted('click')).toBeTruthy();
  });

  it('computes image src correctly', () => {


  });
});