import globals from "globals"; // 导入全局变量定义
import pluginJs from "@eslint/js"; // 导入 ESLint 的 JavaScript 插件
import tseslint from "typescript-eslint"; // 导入 TypeScript ESLint 插件
import pluginVue from "eslint-plugin-vue"; // 导入 Vue ESLint 插件

/** @type {import('eslint').Linter.Config[]} */
export const config = [
    {
        ignores: ["**/*.test.ts"],
        // 适用于所有 JavaScript、TypeScript 和 Vue 文件
        files: ["**/*.{ts,vue}"],
        rules: { 
            indent: ["error", 4], // 全局缩进设置为 4 个空格
            "no-console": ["error"], // 禁止使用 console 语句
            "semi": ["error", "always"], // 强制语句结尾使用分号
        } 
    },
    {
        // 适用于所有 JavaScript、TypeScript 和 Vue 文件
        files: ["**/*.{js}"],
        rules: { 
            indent: ["error", 4], // 全局缩进设置为 4 个空格
            "semi": ["error", "always"], // 强制语句结尾使用分号
        } 
    },
    {   
        // 配置语言选项，定义全局变量
        languageOptions: { 
            globals: globals.browser // 允许使用浏览器环境的全局变量
        }
    },
    pluginJs.configs.recommended, // 使用 JavaScript 插件的推荐配置
    ...tseslint.configs.recommended, // 使用 TypeScript 插件的推荐配置
    ...pluginVue.configs["flat/essential"], // 使用 Vue 插件的基本配置
    {
        // 针对 Vue 文件的特定配置
        files: ["**/*.vue"], 
        languageOptions: {
            parserOptions: {
                parser: tseslint.parser // 使用 TypeScript 解析器解析 Vue 文件
            }
        },
        rules: {
            // 确保 Vue 文件中的缩进规则生效
            "vue/html-indent": ["error", 4], // 设置 <template> 部分的缩进为 4 个空格
            "indent": ["error", 4],         // 设置 <script> 和 <style> 部分的缩进为 4 个空格
            "semi": ["error", "always"],    // 设置必须在语句结尾使用分号
        }
    }
];