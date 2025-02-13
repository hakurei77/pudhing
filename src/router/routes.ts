//对外暴露配置路由（常量路由）
export const constantRoute = [
    {
        path:'/',
        component:() => import('@/components/LLMLayout.vue'),
        children: [
            {
                path: '',
                redirect: 'chat', // 默认重定向到 main
            },
            {
                path: 'chat',
                component: () => import('@/components/MainChatPage.vue'),
            },
            {
                path: "chat/:assistantId",
                component: () => import('@/components/MainLayout.vue'),
            },
            {
                path: 'create',
                component: () => import('@/components/MainCreateAssistantPage.vue'),
            },
        ],
    },
    {
        path:'/404',
        component:() => import('@/components/404Page.vue'),
        name:'404',
    },
    {
        path:'/:pathMatch(.*)*',
        redirect:'/404',
        name:'Any',
    }
];