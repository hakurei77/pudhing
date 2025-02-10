import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import globalComponent from '@/components/Global'; 
//@ts-expect-error 下面的virtual:svg-icons-register总是报找不到，但是文件运行没有问题，所以这里忽略
import 'virtual:svg-icons-register';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
createApp(App).use(pinia).use(globalComponent).mount('#app');
