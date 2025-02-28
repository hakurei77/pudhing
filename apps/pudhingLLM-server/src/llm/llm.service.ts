import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MessageDataDto } from './dto/data';
import { Observable , map } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class LLMService {
    constructor(private prisma: PrismaService) { }

    async getAssistantList() {
        const assistants = await this.prisma.assistant.findMany({
            where: {
                isDelete: false
            },
            select: {
                id: true,
                type: true,
                name: true,
                description: true,
                image: true,
            }
        });

        return {
            data: assistants.map(assistant => ({
                ...assistant,
                histories: []
            }))
        };
    }
    async getAssistantHistoryData(assistantId: string) {
        const histories = await this.prisma.history.findMany({
            where: {
                assistantId,
                isDelete: false,
            },
            include: {
                historyContents: {
                    select: {
                        data: true,
                    }
                }
            },
            orderBy: {
                createdAt: 'asc'
            }
        });

        return {
            history: histories.map(history => ({
                id: history.id,
                isDelete: history.isDelete,
                role: history.role,
                contentList: history.historyContents.map(content => {
                    // 如果数据是字符串，尝试解析它
                    if (typeof content.data === 'string') {
                        try {
                            return JSON.parse(content.data) as object;
                        } catch {
                            return content.data;
                        }
                    }
                    return content.data;
                }).flat()  // 展平数组
            }))
        };
    }
    modelSelect = (type: string) => {
        let TOKEN = '';
        let MODEL = '';
        let API_URL = '';
        if (type === "Doubao-DeepSeek-R1") {
            TOKEN = process.env.Doubao_DeepSeek_R1_TOKEN as string;
            //MODEL = "ep-20250205141832-bfs5p";
            MODEL = process.env.Doubao_DeepSeek_R1_MODEL as string;
            API_URL = process.env.Doubao_DeepSeek_R1_API_URL as string;
        }
        if (type === "DeepSeek-R1") {
            TOKEN = process.env.DeepSeek_R1_TOKEN as string
            MODEL = process.env.DeepSeek_R1_API_URL as string; //deepseek-chat //deepseek-reasoner 
            API_URL = process.env.DeepSeek_R1_MODEL as string;
        }
        return {
            TOKEN,
            MODEL,
            API_URL
        }
    }
    private messageHistory: Array<{ role: string; content: any }> = [];
    createChatRequestData = (MODEL: string, prompt: string, formData: MessageDataDto[]) => {
        const textContent = formData
            .filter(item => item.type === 'text')
            .map(item => (item as any).text)
            .join('');
            
        if (textContent.length <= 100) {
            this.messageHistory.push({ role: 'user', content: formData });
        }
        
        if (this.messageHistory.length > 10) {
            this.messageHistory = this.messageHistory.slice(-10);
        }
        return {
            model: MODEL,
            messages: [
                { role: 'system', content: prompt },
                ...this.messageHistory
            ],
            stream: true
        };
    };
    createChatCompletion = (data: any , API_URL:string , TOKEN: string , assistantId: string): Observable<any> => {
        let fullContent = ''; 
        return new Observable(subscriber => {
            fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${TOKEN}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
                .then(async response => {
                    if (!response.ok || !response.body) {
                        subscriber.error(await response.text());
                        return;
                    }
                    const reader = response.body.getReader();
                    const decoder = new TextDecoder();
                    let buffer = '';
                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) {
                            subscriber.complete();
                            break;
                        }
                        buffer += decoder.decode(value, { stream: true });
                        const lines = buffer.split('\n');
                        // 保留未完成的行在缓冲区
                        buffer = lines.pop() || '';
                        for (const line of lines) {
                            if (!line.startsWith('data: ')) continue;
                            const data = line.slice(6).trim();
                            if (data === '[DONE]') {
                                subscriber.complete();
                                return;
                            }
                            try {
                                const jsonData = JSON.parse(data) as { choices: { delta: { reasoning_content?: string, content?: string } }[] };;
                                if (jsonData.choices?.[0]?.delta) {
                                    let content = jsonData.choices[0].delta.content;
                                    if (content === '' || null) {
                                        content = jsonData.choices[0].delta.reasoning_content;
                                    }
                                    if (content) {
                                        fullContent += content;  // 累积内容
                                        subscriber.next(content);
                                    } 
                                }
                            } catch (e) {
                                subscriber.error(e);
                            }
                        }
                    }
                })
                .catch(err => subscriber.error(err))
                .finally(() => {
                    if (fullContent) {
                        // 使用立即执行的异步函数处理Promise，避免返回Promise
                        (async () => {
                            try {
                                await this.prisma.history.create({
                                    data: {
                                        assistantId,
                                        role: 'assistant',
                                        historyContents: {
                                            create: {
                                                data: [{
                                                    type: 'text',
                                                    text: fullContent
                                                }]
                                            }
                                        }
                                    }
                                });
                            } catch (error) {
                                // 处理或记录错误
                                console.error("Failed to create history:", error);
                            }
                        })();
                    }
                    // 显式返回undefined以满足void类型要求
                    return;
                });
        }).pipe(
            map(content => content)
        );
    }
    async sendFormData(assistantId: string, formData: MessageDataDto[]) {
        await this.prisma.history.create({
            data: {
                assistantId,
                role: 'user',
                historyContents: {
                    create: {
                        data: JSON.stringify(formData)
                    }
                }
            }
        });
        const assistant = await this.prisma.assistant.findUnique({
            where: {
                id: assistantId,
                isDelete: false
            },
            select: {
                type: true,
                prompt: true,
            }
        });
        const { TOKEN, MODEL, API_URL } = this.modelSelect(assistant?.type as string)
        const requestData = this.createChatRequestData(MODEL, assistant?.prompt as string, formData)
        return this.createChatCompletion(requestData, API_URL, TOKEN , assistantId);
    }
    async createAssistant(data: {
        type: string;
        name: string;
        prompt: string;
        description: string;
        image: string;
    }) {
        try {
            console.log('创建助手的数据:', data);
            const assistant = await this.prisma.assistant.create({
                data: {
                    id: uuidv4(), // 生成唯一ID
                    type: data.type,
                    name: data.name,
                    prompt: data.prompt,
                    description: data.description,
                    image: data.image,
                    isDelete: false
                }
            });
            return {
                message: '创建成功',
                data: assistant
            };
        } catch (error) {
            console.error('创建助手失败:', error);
            throw new Error('创建助手失败: ' + error.message);
        }
    }
}