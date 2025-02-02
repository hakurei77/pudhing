import { defineStore } from 'pinia';

interface Attachment {  // 附件类型
    file: File;
    type: 'image' | 'file';
    name: string;
    size: string;
    base64: string;
    preview?: string;
}
// 定义文本类型的类型别名
type TextItem = {
    type: 'text';
    text: string;
};
// 定义图片 URL 类型的类型别名
type ImageItem = {
    type: 'image_url';
    image_url: {
        url: string;
    };
};
// 定义整个数据格式的类型别名
type DataFormat = TextItem | ImageItem ;
export const useFormDataStore = defineStore('form-data', {
    state: () => ({
        value: {
            text: "",
            file: {}
        },
        submitData:[] as DataFormat[]
    }),
    actions: {
        /**
         * 此函数用来修改表单数据格式
        */
        changeDataFormat() {
            this.submitData = [];
            //不含文件时
            if (this.value.file == '') {
                this.submitData.push({
                    type: "text",
                    text: this.value.text,
                });
            }
            //包含文件时
            else {
                const fileExtraction = JSON.parse(JSON.stringify(this.value.file));
                this.submitData.push({
                    type: "text",
                    text: this.value.text,
                });
                fileExtraction.forEach((item: Attachment) => {
                    if(item.type === 'image'){
                        this.submitData.push({
                            type: "image_url",
                            image_url: {
                                url: item.base64,
                            }
                        });
                    };
                });
            }
        }
    },
});
