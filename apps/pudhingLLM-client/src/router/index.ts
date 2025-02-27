//通过vue-router插件实现模板路由配置
import { createRouter, createWebHistory } from 'vue-router';
import { constantRoute } from './routes';

//创建路由器
const router = createRouter({
    history: createWebHistory(),
    routes: constantRoute,
    //滚动行为/
    scrollBehavior() {
        return {
            left: 0,
            top: 0
        };
    }
});
import { useAssistantDataStore } from "@/store/assistantData";
let isFirstVisit = true;
router.beforeEach(async (to, _, next) => {
    const assistantDataStore = useAssistantDataStore();
    if (to.path.startsWith('/')) {
        if (!isFirstVisit) {
            assistantDataStore.selectFirstAssistant();
        } else {
            await assistantDataStore.getCurrentData();
            assistantDataStore.selectFirstAssistant();
            isFirstVisit = false;
        }
        if (to.path.startsWith('/chat/')) { 
            const contentAfterChat = to.path.split('/chat/')[1];
            await assistantDataStore.getCurrentAssistantHistory(contentAfterChat);
            assistantDataStore.changeCurrentAssistant(contentAfterChat);
        }
    }
    next(); 
});


export default router;



