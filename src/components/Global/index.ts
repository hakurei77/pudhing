import type { App , Component } from 'vue';
import SvgIcon from './SvgIcon.vue';
import ImgBox from './ImgBox.vue';
//全局对象  //流水线注册全局组件
const allGlobalComponents: { [key: string]: Component } = { 
    SvgIcon,
    ImgBox
};
export default {
    install(app : App){
        Object.keys(allGlobalComponents).forEach(key => {
            app.component(key, allGlobalComponents[key]);
        });
    }
};