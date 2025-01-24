/// <reference types="vitest" />
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from "path";
//引入svg需要用到的插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
//引入tailwindcss
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(() => {
    return {
        plugins: [vue(),
            tailwindcss(),
            createSvgIconsPlugin({
                iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
                symbolId: 'icon-[dir]-[name]'
            }),
        ],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
            }
        },
        test: {
            environment: "jsdom"
        }
    };
});