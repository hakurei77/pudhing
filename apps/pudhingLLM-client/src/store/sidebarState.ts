import { defineStore } from 'pinia';

/**
 * 此函数用于控制侧边栏的显示与隐藏
*/
export const useSidebarStateStore = defineStore('sidebar-state', {
    state: () => ({
        value: false
    }),
    actions: {

    },
});
