//通过vue-router插件实现模板路由配置
import { createRouter, createWebHistory } from 'vue-router';
import { constantRoute } from './routes';
import { useCurrentAssistantDataStore } from '@/store/currentAssistantData';

//创建路由器
const router = createRouter({
    history: createWebHistory(),
    routes: constantRoute,
    //滚动行为
    scrollBehavior() {
        return {
            left: 0,
            top: 0
        };
    }
});
let isFirstVisit = true;

router.beforeEach((to, _ , next) => {
    if (to.path === '/chat') {
        if (!isFirstVisit) {
            const dataListStore = useCurrentAssistantDataStore();
            dataListStore.addFirstAssistantData();
        } else {
            // 第一次访问时，将 isFirstVisit 设置为 false
            isFirstVisit = false;
        }
    }
    next(); // 确保要调用 next() 来继续导航
});


export default router;



