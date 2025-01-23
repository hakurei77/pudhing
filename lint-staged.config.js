/** @type {import('lint-staged').Config}  */
export default {
    '*.{js,ts,jsx,tsx,vue}': [
        'eslint --fix',
    ],
};