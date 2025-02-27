import { useFormDataStore } from "@/store/useFormDataStore";
const formDataStore = useFormDataStore();
import { sendFormDataApi } from '@/api/data';
import router from '@/router';
interface Attachment {
    file: File;
    type: 'image' | 'file';
    name: string;
    size: string;
    base64: string;
    preview?: string;
}
interface SubmitData {
    text: string;
    attachments: Attachment[];
}
const SubmitFunc = async (text:string, attachments: Attachment[], assistantId: string) => {
    if (text.trim() === '' && attachments.length === 0) {
        alert('不可提交空内容');
        return false;
    }
    formDataStore.value = {
        text: text,
        file: attachments
    };
    formDataStore.changeDataFormat();
    const sendData = JSON.parse(JSON.stringify(formDataStore.submitData));
    router.push('/chat/' + assistantId);
    await sendFormDataApi({
        assistantId: assistantId,
        data: sendData
    });
    return false;
};

export {
    SubmitFunc
};
export type {
    Attachment,
    SubmitData
};
