import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
/*========================================================================================*/
const app = express();
const PORT = 3000;
/*========================================================================================*/
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(cors());
/*========================================================================================*/
//当前支持模型：Doubao-DeepSeek-R1,DeepSeek-R1
let TOKEN = '';
let MODEL = '';
let API_URL = '';
let messageHistory = [];
let responseData = '';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataFilePath = path.join(__dirname, '../database', 'datatest.json');//这里可以将路径修改为自己的json路径
/**
 * 根据传入的type参数，选择不同的模型
 */ 
const modelSelect = (type) => {
    if(type === "Doubao-DeepSeek-R1"){
        TOKEN = "3905579d-60fd-43e1-8e8f-c5fb4cf7d96d";
        MODEL = "ep-20250205141832-bfs5p";
        API_URL = "https://ark.cn-beijing.volces.com/api/v3/chat/completions";
    }
    if(type === "DeepSeek-R1"){
        TOKEN = "sk-631249bdf22f48a5a4c3efb9664bddfc"
        MODEL = "deepseek-chat"; //deepseek-chat //deepseek-reasoner
        API_URL = "https://api.deepseek.com/v1/chat/completions";
    }
}
/**
 * 定义一个函数logUserMessage，用于记录用户的消息
 */
const logUserMessage = (userMessage) => {
    messageHistory = [];
    messageHistory.push({ role: 'user', content: userMessage });
};
/**
 * 生成聊天请求数据
 */ 
const createChatRequestData = (userMessage, assistantData) => {
    logUserMessage(userMessage);
    return {
        model: MODEL,
        messages: [
            { role: 'system', content: assistantData.prompt },
            ...messageHistory
        ],
        stream: true
    };
};
/**
 * 向API发送数据
*/
const sendDataToAPI = async (res , data) => {
    responseData = '';
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TOKEN}`,
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // 设置 SSE 头信息
        res.set({
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        });
        // 使用读取器处理流数据
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                res.end();
                return;
            }
            const dataString = decoder.decode(value);
            if (dataString) {
                // 处理数据块的逻辑保持不变
                const events = dataString.split('\n\n');
                events.forEach(event => {
                    if (event.trim().startsWith('data: ')) {
                        const jsonDataString = event.trim().substring(6);
                        if (jsonDataString === '[DONE]') {
                            res.end();
                            return;
                        }
                        if (jsonDataString) {
                            try {
                                const jsonData = JSON.parse(jsonDataString);
                                if (jsonData.choices?.[0]?.delta) {
                                    let content = jsonData.choices[0].delta.content;
                                    if (content === '' || null) {
                                        content = jsonData.choices[0].delta.reasoning_content;
                                    }
                                    if (content){
                                        responseData += content;
                                    }
                                    res.write(content);
                                }
                            } catch (e) {
                                console.error('JSON parse error:', e);
                            }
                        }
                    }
                });
            }
        }
    } catch (error) {
        console.error('Fetch error:', error);
        res.status(500).json({ error: error.message });
    } 
}
/**
 * 该函数用于处理用户的请求，并流式返回api生成的内容（已完成）
*/ 
app.post('/api/sendFormData', async (req, res) => {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    const jsonData = JSON.parse(data);
    const userMessage = req.body;
    const assistantData = jsonData.assistant.find(item => item.id === userMessage.assistantId);
    console.log(assistantData)
    assistantData.history.push({
        id: assistantData.history.length,
        isDelete: false,
        role:"user",
        contentList:userMessage.data
    });
    fs.writeFileSync(dataFilePath, JSON.stringify(jsonData, null, 2), 'utf8');
    if (assistantData.type === "Doubao-DeepSeek-R1") {
        modelSelect(assistantData.type);
        const data = createChatRequestData(userMessage.data,assistantData);
        await sendDataToAPI(res,data)
    }
    if (assistantData.type === "DeepSeek-R1") {
        modelSelect(assistantData.type);
        const data = createChatRequestData(userMessage.data,assistantData);
        await sendDataToAPI(res,data)
    }
    assistantData.history.push({ 
        id: assistantData.history.length,
        isDelete: false,
        role:"assistant",
        contentList:[
            {
                type: "text",
                text: responseData
            }
        ]
    });
    fs.writeFileSync(dataFilePath, JSON.stringify(jsonData, null, 2), 'utf8');
});
/**
 * 获取assistant基础数据[id,type,prompt,name,description,image,history:[]]（已完成）
*/
app.get('/api/getAssistantList', async (req, res) => {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    const jsonData = JSON.parse(data);
    const filteredData = jsonData.assistant.filter(assistant => !assistant.isDelete).map(assistant => {
        const { prompt,memory, isDelete, ...rest } = assistant; 
        return {
            ...rest,
            history: []
        };
    });
    res.status(200).json({
        data: filteredData
    });
});
/**
 * 获取对应assistant历史记录数据
*/
app.post('/api/getAssistantHistoryData', async (req, res) => {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    const jsonData = JSON.parse(data);
    const { id } = req.body;
    const assistantData = jsonData.assistant.find(assistant => assistant.id === id);
    if (!assistantData || assistantData.isDelete) {
        return res.status(404).json({ message: 'Assistant not found or deleted' });
    }
    const filteredHistory = assistantData.history.filter(item => !item.isDelete);
    res.status(200).json({
        history: filteredHistory
    });
});

// 启动服务器
app.listen(PORT, () => {
    console.log(` 服务器运行在 http://localhost:${PORT}`);
});