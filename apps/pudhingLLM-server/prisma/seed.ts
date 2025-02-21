import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
    // 创建助手数据
    const assistant1 = await prisma.assistant.create({
        data: {
            id: "test-assistant-1",
            isDelete: false,
            type: "Doubao-DeepSeek-R1",
            prompt: "you are a helpful assistant",
            name: "布丁",
            description: "默认助手小布丁，可以回答各种问题，提供各种帮助",
            image: "",
            histories: {
                create: [
                    {
                        role: "user",
                        historyContents: {
                            create: [
                                {
                                    data: {
                                        type: "text",
                                        text: "你好"
                                    }
                                }
                            ]
                        }
                    },
                    {
                        role: "assistant",
                        historyContents: {
                            create: [
                                {
                                    data: {
                                        type: "text",
                                        text: "你好！我是测试助手1，很高兴见到你！"
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    });

    const assistant2 = await prisma.assistant.create({
        data: {
            id: "test-assistant-2",
            isDelete: false,
            type: "Doubao-DeepSeek-R1",
            prompt: "你是一个专业的编程助手",
            name: "编程助手",
            description: "专门解答编程相关问题的助手",
            image: "",
            histories: {
                create: [
                    {
                        role: "user",
                        historyContents: {
                            create: [
                                {
                                    data: {
                                        type: "text",
                                        text: "如何使用 JavaScript?"
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    });
    console.log({ assistant1, assistant2 });
}
main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });
