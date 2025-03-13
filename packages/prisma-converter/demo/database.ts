import Dexie, { type Table } from 'dexie';

// 定义 TypeScript 接口（可选但推荐）
interface IAssistant {
  id: string;
  isDelete: boolean;
  type: string;
  prompt: string;
  name: string;
  description: string;
  image: string;
}

class AppDB extends Dexie {
  assistants!: Table<IAssistant, string>;
  constructor() {
    super('DemoDB');
    this.version(1).stores({
      assistants: '&id, type, name' 
    });
  }
}

const db = new AppDB();

export default db;