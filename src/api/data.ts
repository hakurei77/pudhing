import { sendFormData, getUserData } from "@/utils/request";

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
type DataFormat = {
    assistant: string;
    data: TextItem[] | ImageItem[]  
};
const sendFormDataApi = async (data: DataFormat) => {
    return await sendFormData("http://localhost:3000/api/sendFormData", data);
};
const getUserDataApi = async () => {
    return await getUserData("http://localhost:3000/api/getUserData");
};

export { 
    sendFormDataApi,
    getUserDataApi 
};