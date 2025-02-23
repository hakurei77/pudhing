import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite';
import dts from 'vite-plugin-dts';
import path from 'path';
// https://vite.dev/config/
export default defineConfig({
  build: {
    lib:{
      entry: path.resolve(__dirname,'src/main.ts'),
      formats: ['es'],
      name:"pudhing-ui"
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  plugins: [
    vue(),
    tailwindcss(),
    dts({tsconfigPath: 'tsconfig.app.json'})
  ]
})
