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
                component: () => import('@/views/MainChatPage.vue'),
            },
            {
                path: "chat/:assistantId",
                component: () => import('@/views/MainDialogPage.vue'),
            },
            {
                path: 'create',
                component: () => import('@/views/MainCreateAssistantPage.vue'),
            },
            {
                path: '3d',
                component: () => import('@/views/ThreeTest.vue'),
            },
            {
                path: 'live2d',
                component: () => import('@/views/Live2dTest.vue'),
            },
        ],
    },
    {
        path:'/404',
        component:() => import('@/views/404Page.vue'),
        name:'404',
    },
    {
        path:'/:pathMatch(.*)*',
        redirect:'/404',
        name:'Any',
    }
];