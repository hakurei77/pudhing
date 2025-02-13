import { defineStore } from 'pinia';

type DataList = {
    id: string,
    isDelete: false,
    type: string,
    prompt: string,
    "name": string,
    description: string,
    image: string,
    historics?: [],
}
/**
 * 用来处理全部用户信息
*/
export const useLocalhostDataeStore = defineStore('localhost-data', {
    state: () => ({
        value: [] as DataList[]
    }),
    actions: {
        addLocalhostData(data: DataList[]) {
            this.value = data;
        },
    },
});
