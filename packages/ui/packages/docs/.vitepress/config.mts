import { defineConfig } from 'vitepress'
import {
  containerPreview,
  componentPreview,
} from "@vitepress-demo-preview/plugin";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Pudhing-ui",
  description: "pudhing-llm大模型平台配套ui组件",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: '组件', link: '/pudhing-ui/pd-ui' },
      { text: 'Pudhing-llm-client', link: '/pudhing-client/pudhing-llm-client' },
      { text: 'Pudhing-llm-server', link: '/pudhing-server/pudhing-llm-server' }
    ],

    sidebar: [
      {
        text: '组件文档',
        items: [
          { text: '项目介绍', link: '/pudhing-ui/pd-ui' },
          { text: 'pd-imgBox 圆角图片盒', link: '/pudhing-ui/pd-imgBox' }
        ]
      },
      {
        text: 'PudhingLLM-client',
        items: [
          { text: '项目介绍', link: '/pudhing-client/pudhing-llm-client' },
        ]
      },
      {
        text: 'PudhingLLM-server',
        items: [
          { text: '项目介绍', link: '/pudhing-server/pudhing-llm-server' },
          { text: 'api文档', link: '/pudhing-server/pudhing-llm-api' }
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/hakurei77/pudhing' }
    ]
  },
  markdown: {
    config(md) {
      md.use(containerPreview);
      md.use(componentPreview);
    },
  },
})
