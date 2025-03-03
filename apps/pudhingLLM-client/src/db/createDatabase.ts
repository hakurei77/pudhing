import Dexie, { type Table } from 'dexie';

// 定义接口以匹配Prisma模型
interface Assistant {
    id: string;
    type: string;
    name: string;
    description: string;
    image: string;
}

interface History {
    id?: number;
    assistantId: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}

interface Memory {
    id?: number;
    assistantId: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}

interface HistoryContent {
    id?: number;
    data: JSON;
    historyId: number;
    createdAt: Date;
    updatedAt: Date;
}

interface MemoryContent {
    id?: number;
    data: JSON;
    memoryId: number;
    createdAt: Date;
    updatedAt: Date;
}

// 创建Dexie数据库类
class AssistantDatabase extends Dexie {
    assistants!: Table<Assistant>;
    histories!: Table<History>;
    memories!: Table<Memory>;
    historyContents!: Table<HistoryContent>;
    memoryContents!: Table<MemoryContent>;
    constructor() {
        super('AssistantDatabase');
        this.version(1).stores({
            assistants: 'id, type, name,description,image',
            histories: '++id, assistantId, role, createdAt, updatedAt',
            memories: '++id, assistantId, role, createdAt, updatedAt',
            historyContents: '++id, historyId, createdAt, updatedAt',
            memoryContents: '++id, memoryId, createdAt, updatedAt'
        });
    }
}

// 创建数据库实例
export const db = new AssistantDatabase();

// 导出类型
export type {
    Assistant,
    History,
    Memory,
    HistoryContent,
    MemoryContent
};