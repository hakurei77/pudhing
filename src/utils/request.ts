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
type DataFormat = TextItem | ImageItem ;
const sendFormData = async (url: string , data: DataFormat) => {
    try {
        // 发送 POST 请求到后端
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data) 
        });
        if (!response.ok)  {
            throw new Error('提交失败');
        }
        const reader = response.body?.getReader();
        const textDecoder = new TextDecoder();
        while (true) {
            const { done, value } = await reader!.read();
            if (done) {
                break;
            }
            const a = textDecoder.decode(value);
            alert(a);
        }
    } catch (error) {
        alert('提交失败，请稍后再试' + error);
    }
};

export {
    sendFormData
};