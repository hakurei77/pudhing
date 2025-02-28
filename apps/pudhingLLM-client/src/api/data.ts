import { sendFormData, getAssistantList , getAssistantHistory,createAssistant } from "@/utils/request";
const api= import.meta.env.VITE_APP_API_URL;
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
    assistantId: string;
    data: TextItem[] | ImageItem[]  
};
const getAssistantListApi = async () => {
    return await getAssistantList(`${api}/getAssistantList`);
};
const sendFormDataApi = async (data: DataFormat) => {
    return await sendFormData(`${api}/sendFormData`, data);
};
const getAssistantHistoryApi = async (data: string) => {
    return await getAssistantHistory(`${api}/getAssistantHistoryData`, data);
};
const createAssistantApi = async (data: string) => {
    return await createAssistant(`${api}/createAssistant`, data);
};


export { 
    sendFormDataApi,
    getAssistantListApi,
    getAssistantHistoryApi,
    createAssistantApi
};