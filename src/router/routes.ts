//对外暴露配置路由（常量路由）
export const constantRoute = [
    {
        path:'/',
        component:() => import('@/components/LLMLayout.vue'),
        name:'layout',
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