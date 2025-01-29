有款技术越学越年轻，就是学习前端工程
这里没有人叫你大佬，因为都叫你切图仔
我想问问你有什么实力，居然能写一辈子前端
你说你就是前端大牛，却不会字体居中对齐
半夜不睡觉，打开调试窗
控制台飘红像大烟花
需求改三遍，甲方就是王
每天需求变个不停

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

### 可传参数

- name[必传]:    svg 文件名
- scale:    number
- color:    #000...
- prefix:    前缀，默认为 `#icon-`，可自定义

## ImgBox（大模型头像组件）

### 引用&挂载

同 SvgIcon

### 使用

使用示例：

```html
<ImgBox scale="3.5" :src="imgScr"/>
```

### 可传参数

- scale:    number
- src:    图片地址