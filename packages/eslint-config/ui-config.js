import globals from "globals"; // 导入全局变量定义
import pluginJs from "@eslint/js"; // 导入 ESLint 的 JavaScript 插件
import tseslint from "typescript-eslint"; // 导入 TypeScript ESLint 插件
import pluginVue from "eslint-plugin-vue"; // 导入 Vue ESLint 插件

/** @type {import('eslint').Linter.Config[]} */
export const config = [
    {
        // 适用于所有 JavaScript、TypeScript 和 Vue 文件
        files: ["**/*.{ts,vue}"],
        rules: { 
            indent: ["error", 4],
            "no-console": ["error"],
            "semi": ["error", "always"],
        } 
    },
    {   
        // 配置语言选项，定义全局变量
        languageOptions: { 
            globals: globals.browser
        }
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    ...pluginVue.configs["flat/essential"],
    {
        // 针对 Vue 文件的特定配置
        files: ["**/*.vue"], 
        languageOptions: {
            parserOptions: {
                parser: tseslint.parser
            }
        },
        rules: {
            "vue/html-indent": ["error", 4],
            "indent": ["error", 4],
            "semi": ["error", "always"],
        }
    }
];