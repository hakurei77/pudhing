import { db } from "./createDatabase";
import { getAssistantListApi, getAssistantHistoryApi } from '@/api/data';
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
type ContentList = User | Assistant;
type HistoryData = {
    id: number,
    role: string,
    contentList: ContentList[]
};
type AssistantDataType = {
    id: string,
    type: string,
    name: string,
    description: string,
    image: string,
    histories: HistoryData[]
};
const addAssistants = async (assistants: AssistantDataType[]) => {
    try {
        // eslint-disable-next-line
        const assistantsData = assistants.map(({ histories, ...assistant }) => assistant);
        await db.assistants.bulkPut(assistantsData);
    } catch (error) {
        alert(error);
    }
};
const getAllAssistants = async () => {
    try {
        const count = await db.assistants.count();
        if (count === 0) {
            const apiData = await getAssistantListApi();
            await addAssistants(apiData);
        }
        const assistants = await db.assistants.toArray();
        return assistants.map(assistant => ({
            ...assistant,
            histories: []
        }));
    } catch (error) {
        alert('获取助手失败:' + error);
        return [];
    }
};
const saveAssistantHistory = async (id: string, data: HistoryData[]) => {
    try {
        await db.transaction('rw', db.histories, db.historyContents, async () => {
            for (const item of data) {
                const historyId = await db.histories.add({
                    assistantId: id,
                    role: item.role,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
                await db.historyContents.add({
                    historyId: historyId,
                    data: item.contentList as unknown as JSON,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
            }
        });
    } catch (error) {
        alert('保存历史记录失败:' + error);
    }
};
const addCurrentAssistantHistoryById = async (id: string) => {
    try {
        const histories = await db.histories.where('assistantId').equals(id).count();
        if (histories === 0) {
            const apiData = await getAssistantHistoryApi(id);
            if (apiData.history.length != 0) {
                await saveAssistantHistory(id, apiData.history);
            }
        }
    } catch (error) {
        alert('添加历史记录失败:' + error);
    }
};
const getAssistantDataById = async (id: string) => {
    try {
        // 获取助手基本信息
        const assistant = await db.assistants.get(id);
        if (!assistant) {
            throw new Error('助手不存在');
        }
        // 获取历史记录
        const histories = await db.histories.where('assistantId').equals(id).toArray();
        const historiesWithContent = await Promise.all(
            histories.map(async (history) => {
                const content = await db.historyContents
                    .where('historyId')
                    .equals(history.id!)
                    .first();
                
                return {
                    id: history.id,
                    isDelete: false,
                    role: history.role,
                    contentList: content?.data as unknown as ContentList[]
                };
            })
        );
        // 组装最终数据
        const result: AssistantDataType = {
            id: assistant.id,
            type: assistant.type,
            name: assistant.name,
            description: assistant.description,
            image: assistant.image,
            histories: historiesWithContent as unknown as HistoryData[]
        };
        return result;
    } catch (error) {
        alert('获取助手数据失败:' + error);
        return null;
    }
};
export {
    addAssistants,
    getAllAssistants,
    addCurrentAssistantHistoryById,
    getAssistantDataById
};