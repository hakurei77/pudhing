import { getDMMF } from '@prisma/internals';
import * as fs from 'fs/promises';
import { generateInterface } from './generateInterface';
import { generateDexieClass } from './generateDexieClass';

export async function generateDexieCode(schemaPath: string, outputPath: string) {
    try {
        const schema = await fs.readFile(schemaPath, 'utf-8');
        const dmmf = await getDMMF({ datamodel: schema });
        // 生成各部分代码
        const interfaces = dmmf.datamodel.models
            .map(generateInterface)
            .join('\n\n');
        const dbClass = generateDexieClass(dmmf.datamodel.models as any[]);

        // 组合完整代码
        const fullCode = `import Dexie, { type Table } from 'dexie';

// Generated Interfaces
${interfaces}

// Database Class
${dbClass}

const db = new AppDB();

// Export the database instance and types
export default db;
export type { ${dmmf.datamodel.models.map(model => model.name).join(', ')} };
`;

        // 写入输出文件
        await fs.writeFile(outputPath, fullCode);
        console.log('Dexie code generated successfully!');
    } catch (error) {
        console.error('Error generating Dexie code:', error);
        throw error;
    }
}
