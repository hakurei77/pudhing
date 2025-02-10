<template>
    <div v-html="htmlContent" @click="handleCopy"></div>
</template>

<script setup lang="ts">
// 未实现
// 数学及化学公式
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
    breaks: true,
    highlight: function (str: string, lang: string): string {
        const trimmedStr = str.trim(); // 清除首尾空白
        if (lang && hljs.getLanguage(lang)) {
            try {
                return `<div class="hljs flex justify-between  p-2 border-b-[1px] rounded-t-md text-xs">`+
                            `${lang}`+
                            `<div class="copy-area text-xs flex items-center cursor-pointer">`+
                                `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">`+
                                    `<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">`+
                                        `<rect width="13" height="13" x="9" y="9" rx="2" ry="2"/>`+
                                        `<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>`+
                                    `</g>`+
                                `</svg>`+
                                `<span class="copy ml-1">复制</span>`+
                            `</div>`+
                        `</div>`+
                        `<pre class="hljs rounded-b-md mb-2 p-3">`+
                            `<code>${hljs.highlight(trimmedStr , { language: lang, ignoreIllegals: true }).value}</code>`+
                        `</pre>`;
            } catch (e) { alert("Highlight error:" + e); }
        }
        // 如果没有指定语言或者出错，使用普通代码块
        return `<pre class="hljs rounded-md p-3 mb-2">`+`<code>${md.utils.escapeHtml(str)}</code>`+`</pre>`;
    }
});
md.renderer.rules.strong_open = () => {
    return '<strong>▼//';
};
const htmlContent = computed(() => md.render(props.data));
const handleCopy = async (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.parentElement?.classList.contains('copy-area')) {
        const codeBlock = target.parentElement.parentElement?.nextElementSibling?.querySelector('pre code') as HTMLElement | null;
        const codeContent = codeBlock?.textContent || '';
        try {
            await navigator.clipboard.writeText(codeContent);
            target.innerHTML = '复制成功';
            target.parentElement.style.color = 'var(--succeed-color)';
            setTimeout(() => {
                target.innerHTML = '复制';
                target.parentElement!.style.color = 'var(--primary-color)';
            }, 3000);
        } catch (err) {
            alert('复制失败:' + err);
            target.innerHTML = '复制失败';
            target.parentElement.style.color = 'var(--error-color)';
        }
    }
};
</script>

<style scoped>
:deep(h1) {
    font-size: 2em;
    border-bottom: 1px solid #caced5;
    padding-bottom: 10px;
    font-weight: 600;
    margin-bottom: 6px;
    margin-top: 6px;
}
:deep(h2) {
    font-size: 1.5em;
    border-bottom: 1px solid #caced5;
    padding-bottom: 10px;
    font-weight: 600;
    margin-bottom: 6px;
    margin-top: 6px;
}
:deep(h3) {
    font-size: 1.25em;
    border-bottom: 1px solid #caced5;
    padding-bottom: 10px;
    font-weight: 600;
    margin-bottom: 6px;
    margin-top: 6px;
}
:deep(ul) {
    list-style-type: disc; /* 显示圆点 */
    padding-left: 2em;     /* 增加缩进 */
    margin: 0.5em 0;
}
:deep(ol) {
    list-style-type: decimal; /* 有序列表数字 */
    padding-left: 2em;
    margin: 0.5em 0;
}
:deep(a) {
    color: #1a73e8;
    text-decoration: none;
    transition: color 0.3s ease; /* 添加颜色过渡动画 */
}
:deep(a):hover {
    color: #1557b0;
    text-decoration: underline;
}
:deep(a):active {
    color: #0f3d7a;
}
:deep(p) {
    margin-bottom: 8px;
}
:deep(code){
    white-space: pre-wrap; /* 允许文本换行 */
    overflow-wrap: break-word; /* 兼容性设置 */
}
:deep(.copy-area):hover {
    color: var(--primary-color);
}
</style>
