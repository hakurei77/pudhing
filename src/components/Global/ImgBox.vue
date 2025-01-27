<template>
    <div :style="{ width: scaledSize + 'px', height: scaledSize + 'px' }" class="overflow-hidden rounded-[30%]">
        <img :src="src" alt="大模型头像" :style="{ width: '100%', height: '100%' }">
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
    scale: number;
    src: string;
}>(),{});

const scaledSize = computed(() => {
    const baseSize = 10; // 基础大小
    return baseSize * props.scale;
});
</script>

<style scoped></style>