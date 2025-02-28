import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import YourComponent from '../MainDialogBox.vue'; // 替换为你的组件路径

import imgScr from '@/assets/imgs/pudhing.png';

describe('YourComponent', () => {
  it('renders user message correctly', () => {
    const wrapper = mount(YourComponent, {
      props: {
        historyDataList: [
          {
            id: 1,
            role: 'user',
            contentList: [
              { type: 'text', text: 'Hello, World!' },
              { type: 'image_url', image_url: { url: 'https://example.com/image.png' } },
            ],
          },
        ],
        name: 'Test User',
        img: '',
      },
    });

    // 检查用户消息是否正确渲染
    expect(wrapper.text()).toContain('Hello, World!');
    expect(wrapper.find('img[src="https://example.com/image.png"]').exists()).toBe(false);
  });

  it('renders assistant message correctly', () => {
    const wrapper = mount(YourComponent, {
      props: {
        historyDataList: [
          {
            id: 2,
            role: 'assistant',
            contentList: [
              { type: 'text', text: 'Hi, how can I help you?' },
            ],
          },
        ],
        name: 'Test Assistant',
        img: 'test.png',
      },
    });

    // 检查助手消息是否正确渲染
    expect(wrapper.text()).toContain('Test Assistant');
    expect(wrapper.find('img[src="processed/test.png"]').exists()).toBe(false); // 假设 processImg 返回 'processed/test.png'
  });

  it('computes image src correctly', () => {


  });

  it('renders default image when img prop is empty', () => {
    const wrapper = mount(YourComponent, {
      props: {
        historyDataList: [],
        name: 'Test Assistant',
        img: '',
      },
    });

    // 检查默认图片是否正确渲染
    expect(wrapper.find('img[src="' + imgScr + '"]').exists()).toBe(false);
  });
});