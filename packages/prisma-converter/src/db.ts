import Dexie, { type Table } from 'dexie';

// Generated Interfaces
interface Assistant {
  id: string;
  isDelete: boolean;
  type: string;
  prompt: string;
  name: string;
  description: string;
  image: string;
}

interface History {
  id: number;
  isDelete: boolean;
  assistantId: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Memory {
  id: number;
  isDelete: boolean;
  assistantId: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

interface HistoryContent {
  id: number;
  data: JSON;
  historyId: number;
  createdAt: Date;
  updatedAt: Date;
}

interface MemoryContent {
  id: number;
  data: JSON;
  memoryId: number;
  createdAt: Date;
  updatedAt: Date;
}

// Database Class
class AppDB extends Dexie {
  assistants!: Table<Assistant, string>;
  historys!: Table<History, string>;
  memorys!: Table<Memory, string>;
  historycontents!: Table<HistoryContent, string>;
  memorycontents!: Table<MemoryContent, string>;

  constructor() {
    super('AppDB');
    this.version(1).stores({
      'assistants': '&id, isDelete, type, prompt, memories, name, description, image, histories',
      'historys': '++id, isDelete, assistant, assistantId, role, historyContents, createdAt, updatedAt',
      'memorys': '++id, isDelete, assistant, assistantId, role, memoryContents, createdAt, updatedAt',
      'historycontents': '++id, data, history, historyId, createdAt, updatedAt',
      'memorycontents': '++id, data, memory, memoryId, createdAt, updatedAt'
    });
  }
}

const db = new AppDB();

// Export the database instance and types
export default db;
export type { Assistant, History, Memory, HistoryContent, MemoryContent };
