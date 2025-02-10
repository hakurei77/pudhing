import express from 'express';
import cors from 'cors';
const app = express();
const PORT = 3000;
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(cors());
app.use(express.json());
//豆包api
let TOKEN = '';
let MODEL = '';
let API_URL = '';
//1为豆包大模型 ， 2为deepseek
let modelChange = 1;
if(modelChange === 1){
    TOKEN = "3905579d-60fd-43e1-8e8f-c5fb4cf7d96d";
    MODEL = "ep-20250205141832-bfs5p";
    API_URL = "https://ark.cn-beijing.volces.com/api/v3/chat/completions";
}
if(modelChange === 2){
    TOKEN = "sk-631249bdf22f48a5a4c3efb9664bddfc"
    MODEL = "deepseek-reasoner"; //deepseek-chat //deepseek-reasoner
    API_URL = "https://api.deepseek.com";
}
// 用户历史信息
let messageHistory = [];
// 记录用户消息
const logUserMessage = (userMessage) => {
    messageHistory = [];
    messageHistory.push({ role: 'user', content: userMessage });
};
// 生成聊天请求数据
const createChatRequestData = (userMessage) => {
    logUserMessage(userMessage);
    return {
        model: MODEL,
        messages: [
            {
                role: 'system', content: `
                你是一位经验丰富的项目经理，对于用户每一次提出的问题，都不急于编写代码，更多是通过深思熟虑、结构化的推理以产生高质量的回答，探索更多的可能方案，并从中寻找最佳方你具备以下能力：
                ## 需求澄清
                1.能用自己的话清晰的复述用户提出的问题
                2.与用户建立高层级需求沟通
                3. 提供类比案例帮助用户启发思考
                4.使用问题链追问来深入用户潜在需求
                5. 解释主要挑战和限制条件
                6. 整个思考过程，你可以用提问的方式，补全你需要的资料和信息
                #＃ 方案探索
                1. 基于已有技术，探索多种可行的技术选型方
                2. 列出每种技术选型方案的优点、缺点、适用场景及成本
                3.优先考虑网络中已有的技术解决方案，避免重复造轮子
                4. 根据需求提供最优推荐，说明推荐理由及后续改进方向
                ##执行计划
                1. 基于推荐方案，制定系统架构、数据流及交
                2.使用敏捷方式管理，制定迭代计划
                3.明确每次迭代的目标及任务明细
                ` },
            ...messageHistory
        ],
        stream: true
    };
};
// 定义 API 路由
app.post('/api/getFormData', async (req, res) => {
    const userMessage = req.body;
    if (modelChange === 1) {
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
                                    console.log(jsonData.choices?.[0]?.delta);
                                    if (jsonData.choices?.[0]?.delta) {
                                        let content = jsonData.choices[0].delta.content;
                                        if (content === '') {
                                            content = jsonData.choices[0].delta.reasoning_content;
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
    if (modelChange === 2) {
        const data = createChatRequestData(userMessage);
        try {
            console.log(messageHistory);
            const response = await fetch(API_URL + '/v1/chat/completions', {
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
                                    console.log(jsonData.choices?.[0]?.delta);
                                    if (jsonData.choices?.[0]?.delta) {
                                        let content = jsonData.choices[0].delta.content;
                                        if (content === null) {
                                            content = jsonData.choices[0].delta.reasoning_content;
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

});

// 启动服务器
app.listen(PORT, () => {
    console.log(` 服务器运行在 http://localhost:${PORT}`);
});