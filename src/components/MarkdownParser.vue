<template>
    <div v-html="htmlContent"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
const props = withDefaults(defineProps<{
    data: string;
}>(),{});
// 初始化 markdown-it 实例
const md = new MarkdownIt({
    linkify: true,    // 自动识别 URL 为链接
    typographer: true, // 启用一些语言中立的替换和引号美化
    highlight: function (str: string, lang: string): string {
        const trimmedStr = str.trim(); // 清除首尾空白
        if (lang && hljs.getLanguage(lang)) {
            try {
                return `<pre class="hljs"><code>${hljs.highlight(trimmedStr , { language: lang, ignoreIllegals: true }).value}</code></pre>`;
            } catch (e) {
                alert("Highlight error:" + e);
            }
        }
        // 如果没有指定语言或者出错，使用普通代码块
        return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`;
    }
});
const htmlContent = computed(() => md.render(props.data))
;
</script>

<style scoped></style>