<template>
    <div class="flex">
        <SidebarLayout :is-open="SidebarState.value" @close="handleSidebarClose"/>
        <RouterView />
    </div>
</template>

<script setup lang="ts">
import SidebarLayout from './SidebarLayout.vue';
import { useSidebarStateStore } from '@/store/SidebarState';
const SidebarState = useSidebarStateStore();
/**
 * 此函数用来关闭[竖屏状态]侧边栏
*/
const handleSidebarClose = () => {
    SidebarState.value = false;
};
</script>

<style scoped>

</style>