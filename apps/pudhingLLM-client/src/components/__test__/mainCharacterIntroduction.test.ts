import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import MyComponent from '../MainCharacterIntroduction.vue'; // 替换为你的组件路径

describe('MyComponent', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(MyComponent, {
      props: {
        name: 'Test Name',
        description: 'Test Description',
      },
    });

    expect(wrapper.find('.font-bold').text()).toBe('Test Name');
    expect(wrapper.find('.text-sm').text()).toBe('Test Description');
    expect(wrapper.find('img').exists()).toBe(false); // 默认图片
  });

  it('renders correctly with custom image', () => {

  });

  it('renders correctly without image', () => {
    const wrapper = mount(MyComponent, {
      props: {
        name: 'Test Name',
        description: 'Test Description',
        img: '',
      },
    });

    expect(wrapper.find('img').exists()).toBe(false); // 默认图片
  });

  it('computes image source correctly', () => {
    const wrapper = mount(MyComponent, {
      props: {
        name: 'Test Name',
        description: 'Test Description',
        img: 'custom-image.png',
      },
    });

    const vm = wrapper.vm as any;
    expect(vm.getImageSrc).toBe('data:image/jpeg;base64,custom-image.png'); // 假设 processImg 返回 'processed-custom-image.png'
  });
});