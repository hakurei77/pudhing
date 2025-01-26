# 全局组件及使用方法

## SvgIcon（svg组件）

### 配置

在 `vite.config.ts` 中引入 SVG 需要用到的插件：

```typescript
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';

export default {
    plugins: [
        createSvgIconsPlugin({
            iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')], // 这里为调用 SVG 的路径
            symbolId: 'icon-[dir]-[name]'
        }),
    ],
};
```

### 引用

在 index.ts 中引入并注册全局组件：

```typescript
import type { App, Component } from 'vue';
import SvgIcon from './SvgIcon.vue';

// 全局对象
const allGlobalComponents: { [key: string]: Component } = { SvgIcon };

export default {
    install(app: App) {
        Object.keys(allGlobalComponents).forEach(key => {
            app.component(key, allGlobalComponents[key]);
        });
    }
};
```

### 挂载

在 main.ts 中挂载组件：

```typescript
import 'virtual:svg-icons-register';
import { createApp } from 'vue';
import App from './App.vue';
import globalComponent from './index';

createApp(App).use(globalComponent).mount('#app');
```

### 使用

使用示例：

```html
<SvgIcon name="article"/>  <!-- 只需写一个名称即可，名称就是 SVG 文件名 -->
```

### 拓展
可以扩展以下属性：
- width
- height
- color