import { useCurrentAssistantDataStore } from "@/store/currentAssistantData";
import { useLocalhostDataeStore } from "@/store/localhostData";
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

const getUserData = async (url: string) => {
    try {
        const localhostDataStore = useLocalhostDataeStore();
        const currentAssistantDataStore = useCurrentAssistantDataStore();
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`);}
        const responseData = await response.json();
        localhostDataStore.addLocalhostData(responseData.data);
        currentAssistantDataStore.addFirstAssistantData();
    } catch (error) {
        alert('请求失败，请稍后再试' + error);
    }
};

const sendFormData = async (url: string, data: DataFormat) => {
    try {
        const dataListStore = useCurrentAssistantDataStore();
        //当数据发送时(将数据存入dataListStore)
        dataListStore.addUserData(data.data);
        dataListStore.addSystemList();
        // 发送 POST 请求到后端
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) { throw new Error('提交失败'); }
        const reader = response.body?.getReader();
        const textDecoder = new TextDecoder();
        while (true) {
            const { done, value } = await reader!.read();
            if (done) {
                break;
            }
            const response = textDecoder.decode(value);
            dataListStore.addSystemData(response);
        }
    } catch (error) {
        alert('提交失败，请稍后再试' + error);
    }
};

export {
    sendFormData,
    getUserData
};