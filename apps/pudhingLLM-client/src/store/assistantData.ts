import { defineStore } from 'pinia';
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
export const useAssistantDataStore = defineStore('assistantData', {
    state: () => ({
        currentId: "" as string,
        data: [] as AssistantDataType[]
    }),
    actions: {
        async getCurrentData() {
            this.data = await getAssistantListApi();
        },
        async getCurrentAssistantHistory(id: string) {
            const datalist = this.data.find(item => item.id === id)?.histories;
            if (datalist?.length === 0) {
                const history = await getAssistantHistoryApi(id);
                if (history.history.length != 0) {
                    history.history.forEach((element: HistoryData) => {
                        datalist.push(element);
                    });
                }
            }
        },
        changeCurrentAssistant(id: string) {
            this.currentId = id;
        },
        getCurrentAssistant(id: string) {
            return this.data.find(item => item.id === id);
        },
        selectFirstAssistant() {
            if (this.data.length != 0) {
                this.currentId = this.data[0].id;
            }
        },
        addUserData(id: string, data: ContentList[]) {
            const datalist = this.data.find(item => item.id === id)?.histories;
            datalist?.push({
                id: datalist.length,
                role: "user",
                contentList: data
            });
        },
        addAssistantList(id: string) {
            const datalist = this.data.find(item => item.id === id)?.histories;
            datalist?.push({
                id: datalist.length,
                role: "assistant",
                contentList: [
                    {
                        type: "text",
                        text: ""
                    }
                ]
            });
        },
        addDataToAssistantList(id: string, data: string) {
            const datalist = this.data.find(item => item.id === id)?.histories;
            if (datalist) {
                const lastElement = datalist[datalist.length - 1].contentList[0];
                if (lastElement.type === 'text') {
                    lastElement.text += data;
                } else {
                    // 处理lastElement不是User类型的情况
                }
            } else {
                // 处理datalist为undefined的情况
            }
        },
    }
});