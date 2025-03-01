// 定义文本类型的类型别名
type TextItem = {
    type: 'text';
    text: string;
};
// 定义图片URL类型的类型别名
type ImageItem = {
    type: 'image_url';
    image_url: {
        url: string;
    };
};
// 定义整个数据格式的类型别名/
type DataFormat = {
    assistantId: string;
    data: TextItem[] | ImageItem[]
};
/**
 * 获取assistant基础数据/
*/
const getAssistantList = async (url: string) => {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`); }
        const responseData = await response.json();
        return responseData.data;
    } catch (error) {
        alert('请求失败，请稍后再试' + error);
        return [];
    }
};
import { useAssistantDataStore } from "@/store/assistantData";
const sendFormData = async (url: string, data: DataFormat) => {
    try {
        const assistantDataStore = useAssistantDataStore();
        assistantDataStore.addUserData(data.assistantId, data.data);
        assistantDataStore.addAssistantList(data.assistantId);
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
            // const response = textDecoder.decode(value);
            // assistantDataStore.addDataToAssistantList(data.assistantId , response);
            const chunk = textDecoder.decode(value);
            // 解析 SSE 格式，提取 data 字段的值
            const lines = chunk.split('\n');
            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    let response = line.slice(6); // 去掉 'data: ' 前缀
                    if (response === '') {
                        response = "\n";
                    }
                    assistantDataStore.addDataToAssistantList(data.assistantId, response);

                }
            }
        }

    } catch (error) {
        alert('提交失败，请稍后再试' + error);
    }
};

const getAssistantHistory = async (url: string, data: string) => {
    try {
        const response = await fetch(url, {
            method: 'POST', // 使用 POST 请求
            headers: {
                'Content-Type': 'application/json', // 设置请求头
            },
            body: JSON.stringify({ id: data }), // 将输入数据转换为 JSON 字符串
        });
        if (!response.ok) { throw new Error(`Error: ${response.status} ${response.statusText}`); }
        const result = await response.json(); // 解析 JSON 响应
        return result;
    } catch (error) {
        alert(error); // 重新抛出错误以供进一步处理
    }
};

const createAssistant = async (url: string, data: string) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data
        });
        
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        
        const result = await response.json();
        return result;
    } catch (error) {
        alert('创建助手失败：' + error);
        throw error;
    }
};


export {
    sendFormData,
    getAssistantList,
    getAssistantHistory,
    createAssistant
};