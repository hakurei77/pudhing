<template>
    <svg :style="{ width: scaledSize + 'em', height: scaledSize + 'em', color }">
        <use :xlink:href="prefix + name" :fill="color"></use>
    </svg>
</template>

<script setup lang='ts'>
import { computed } from 'vue';

const props = withDefaults(defineProps<{
    name: string,
    scale?: number,
    color?: string,
    prefix?: string
}>(), {
    scale: 1,
    color: '#333',
    prefix: '#icon-',
});

const baseSize = 1; // 基础大小
const scaledSize = computed(() => {
    return baseSize * props.scale;
});
</script>

<style scoped></style>