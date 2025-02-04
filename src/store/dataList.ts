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
export const useDataListStore = defineStore('data-list', {
    state: () => ({
        dataList: [] as DataList[],
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
        }
    },
});
