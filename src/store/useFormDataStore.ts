import { defineStore } from 'pinia';

export const useFormDataStore = defineStore('form-data', {
    state: () => ({
        value: {
            text:"",
            file:{}
        }
    }),
    actions: {
       
    },
});
