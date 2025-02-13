import { defineStore } from 'pinia';
type User = {
    type: 'text';
    text: string;
};
type Assistant = {
    type: 'image_url';
    image_url: {
        url: string;
    };
};
type List = User | Assistant ;
type DataList = {
    role: string;
    content: List[];
}
type AssistantData = {
    id: string,
    isDelete: false,
    type: string,
    prompt: string,
    "name": string,
    description: string,
    image: string,
    historics?: [],
}
//数据格式
// [
//     {
//         role:"user",
//         content:[
//             {
//                 "type": "text",
//                 "text": ""      //string
//             },
//             {
//                 "type": "image_url",
//                 "image_url": {
//                     "url": "",  //base64编码的图片
//                 },
//             }
//         ]
//     }
//     {
//         role:"system"
//         content:[
//             {
//                 "type": "text",
//                 "text": ""      //string
//             },
//             {
//                 "type": "image_url",
//                 "image_url": {
//                     "url": "",  //base64编码的图片
//                 },
//             },
//         ]
//     }
// ]
import { useLocalhostDataeStore } from './localhostData';
/**
 * 用来处理对话框区域渲染数据
*/
export const useCurrentAssistantDataStore = defineStore('current-assistant-data', {
    state: () => ({
        dataList: [] as DataList[],
        assistantData: {} as AssistantData
    }),
    actions: {
        addUserData(data: List[]) {
            this.dataList.push({
                role: "user",
                content: data
            });
        },
        addSystemList() {
            this.dataList.push({
                role: "assistant",
                content: [
                    {
                        type: "text",
                        text: ''
                    }
                ]
            });
        },
        addSystemData(data: string){
            this.dataList[this.dataList.length - 1].content.forEach((item)=>{
                if(item.type === 'text'){
                    item.text += data;
                }
            });
        },
        addAssistantData(id: string){
            const localhostDataStore = useLocalhostDataeStore();
            this.assistantData = localhostDataStore.value.find((item)=>item.id === id) as AssistantData;
        },
        addFirstAssistantData(){
            const localhostDataStore = useLocalhostDataeStore();
            this.assistantData = localhostDataStore.value[0];
        }
    },
});
