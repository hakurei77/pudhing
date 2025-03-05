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

const API_ROUTES = {
    GET_ASSISTANT_LIST: `${api}/getAssistantList`,
    SEND_FORM_DATA: `${api}/sendFormData`,
    GET_ASSISTANT_HISTORY: `${api}/getAssistantHistoryData`,
    CREATE_ASSISTANT: `${api}/createAssistant`,
} as const;

const getAssistantListApi = async () => {
    return await getAssistantList(API_ROUTES.GET_ASSISTANT_LIST);
};
const sendFormDataApi = async (data: DataFormat) => {
    return await sendFormData(API_ROUTES.SEND_FORM_DATA, data);
};
const getAssistantHistoryApi = async (data: string) => {
    return await getAssistantHistory(API_ROUTES.GET_ASSISTANT_HISTORY, data);
};
const createAssistantApi = async (data: string) => {
    return await createAssistant(API_ROUTES.CREATE_ASSISTANT, data);
};


export { 
    sendFormDataApi,
    getAssistantListApi,
    getAssistantHistoryApi,
    createAssistantApi
};