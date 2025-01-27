<template>
    <svg :style="{ width , height , color }">
        <use :xlink:href="prefix + name" :fill="color"></use>
    </svg>
</template>

<script setup lang='ts'>
withDefaults(defineProps<{
    name: string,
    width?: string,
    height?: string,
    color?: string,
    prefix?: string
}>(), {
    width: '1em',
    height: '1em',
    color: '#333',
    prefix: '#icon-'
});
</script>

