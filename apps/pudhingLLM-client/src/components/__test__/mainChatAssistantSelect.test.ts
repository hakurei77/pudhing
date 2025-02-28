import { mount } from '@vue/test-utils';
import MyComponent from '../MainChatAssistantSelect.vue'; // 替换为你的组件路径
import { useAssistantDataStore } from '@/store/assistantData'; // 替换为你的 store 路径
import { createPinia, setActivePinia, type Store } from 'pinia';
import { describe, it, expect, beforeEach } from 'vitest';

describe('MyComponent', () => {
  let wrapper;
  let assistantDataStore: Store<"assistantData", { currentId: string; data: { id: string; type: string; name: string; description: string; image: string; histories: { id: number; role: string; contentList: ({ type: "text"; text: string; } | { type: "image_url"; image_url: { url: string; }; })[]; }[]; }[]; }, {}, { getCurrentData(): Promise<void>; getCurrentAssistantHistory(id: string): Promise<void>; changeCurrentAssistant(id: string): void; getCurrentAssistant(id: string): { id: string; type: string; name: string; description: string; image: string; histories: { id: number; role: string; contentList: ({ type: "text"; text: string; } | { type: "image_url"; image_url: { url: string; }; })[]; }[]; } | undefined; selectFirstAssistant(): void; addUserData(id: string, data: ({ type: "text"; text: string; } | { type: "image_url"; image_url: { url: string; }; })[]): void; addAssistantList(id: string): void; addDataToAssistantList(id: string, data: string): void; }>;

  beforeEach(() => {
    setActivePinia(createPinia());
    assistantDataStore = useAssistantDataStore();
  });

  it('renders correctly with default props', () => {
    wrapper = mount(MyComponent, {
      props: {
        text: 'Test Text',
      },
    });

    expect(wrapper.text()).toContain('Test Text');
    expect(wrapper.find('img').exists()).toBe(false);
  });

  it('renders correctly with custom img prop', () => {
    wrapper = mount(MyComponent, {
      props: {
        text: 'Test Text',
        img: 'custom-image.png',
      },
    });

    expect(wrapper.text()).toContain('Test Text');

  });

  it('applies active class when id matches currentId', () => {
    assistantDataStore.currentId = '123';
    wrapper = mount(MyComponent, {
      props: {
        id: '123',
        text: 'Test Text',
      },
    });

    expect(wrapper.classes()).toContain('border-[var(--primary-color)]');
  });

  it('applies inactive class when id does not match currentId', () => {
    assistantDataStore.currentId = '456';
    wrapper = mount(MyComponent, {
      props: {
        id: '123',
        text: 'Test Text',
      },
    });

    expect(wrapper.classes()).toContain('border-[var(--divided-line)]');
  });
});