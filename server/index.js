import express from 'express';
import cors from 'cors';
const app = express();
const PORT = 3000;
app.use(express.json({  limit: '100mb' }));
app.use(express.urlencoded({  limit: '100mb', extended: true }));
app.use(cors()); 
app.use(express.json()); 
const TOKEN = "3905579d-60fd-43e1-8e8f-c5fb4cf7d96d";
const MODEL = "ep-20250119003355-gqxxh";
const API_URL = "https://ark.cn-beijing.volces.com/api/v3/chat/completions"; 
// 用户历史信息
let messageHistory = [];
// 记录用户消息
const logUserMessage = (userMessage) => {
    messageHistory = [];
    messageHistory.push({  role: 'user', content: userMessage });
};
// 生成聊天请求数据
const createChatRequestData = (userMessage) => {
    logUserMessage(userMessage);
    return {
        model: MODEL,
        messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            ...messageHistory
        ],
        stream: true
    };
};
// 定义 API 路由
app.post('/api/getFormData',  async (req, res) => {
    const userMessage = req.body; 
    const data = createChatRequestData(userMessage);
    try {
        console.log(messageHistory);
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
                                    const content = jsonData.choices[0].delta.content;
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
});

// 启动服务器
app.listen(PORT,  () => {
    console.log(` 服务器运行在 http://localhost:${PORT}`);
});