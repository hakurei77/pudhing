/**
 * 这是一段简易的 Node.js 服务器代码，用于处理用户消息并发送请求到 AI大模型。
*/
//请将下面的数据换成自己的
const TOKEN = "3905579d-60fd-43e1-8e8f-c5fb4cf7d96d";
const MODEL = "ep-20250119003355-gqxxh";
const API_URL = "https://ark.cn-beijing.volces.com/api/v3/chat/completions";

//这些是一些引入
import express from 'express';
import axios from 'axios';
import cors from 'cors';
import 'dotenv/config';
//调用
const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());
/*——————————————————————————————————————————————————————————————————————*/

//用户历史信息
let messageHistory = [];
// 记录用户消息
const logUserMessage = (userMessage) => {
    messageHistory.push({ role: 'user', content: userMessage });
};
// 生成聊天请求数据
const createChatRequestData = (userMessage) => {
    logUserMessage(userMessage);
    return {
        model: MODEL, // 使用环境变量
        messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            ...messageHistory
        ],
        stream: true
    };
};
//创建接口并调用
app.post('/api/chat', async (req, res) => {
    const { userMessage } = req.body; // 从请求体中获取用户消息
    const data = createChatRequestData(userMessage);        // 创建请求数据
    try {
        const response = await axios.post(API_URL, data, {  //向api发送请求
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TOKEN}`, 
            },
            responseType: 'stream'
        });
        // 设置头信息
        res.set({
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        });
        // 处理流数据
        // 处理流数据
        response.data.on('data', (chunk) => {
            const dataString = chunk.toString();
            if (dataString) {
                // 将接收到的数据分割成多个事件
                const events = dataString.split('\n\n');
                events.forEach(event => {
                    if (event.trim().startsWith('data: ')) {
                        const jsonDataString = event.trim().substring(6); // 去掉 'data: ' 前缀

                        // 检查是否为 '[DONE]' 字符串
                        if (jsonDataString === '[DONE]') {
                            res.end(); // 结束响应
                            return;    // 退出当前循环
                        }

                        if (jsonDataString) {
                            try {
                                const jsonData = JSON.parse(jsonDataString);
                                // 只传递 content 字段
                                if (jsonData.choices && jsonData.choices[0] && jsonData.choices[0].delta) {
                                    const content = jsonData.choices[0].delta.content;
                                    res.write(`data: ${JSON.stringify({ content })}\n\n`);
                                }
                            } catch (e) {
                                //console.error('JSON parse error:', e);
                                return e;
                            }
                        }
                    }
                });
            }
        });
        //
        response.data.on('end', () => {
            res.end();
        });
    } catch (error) {
        const status = error.response ? error.response.status : 500;
        const errorMessage = error.response ? error.response.data : 'Internal Server Error';
        res.status(status).json({ error: errorMessage });
    }
});
//监听端口
app.listen(PORT, () => {
    //console.log(`server is running on http://localhost:${PORT}`);
});