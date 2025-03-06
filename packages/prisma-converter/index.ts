import * as path from 'path';
import { generateDexieCode } from './generateDexieCode';

const schemaPath = path.join(__dirname, 'prisma', 'schema.prisma');
const outputPath = path.join(__dirname, 'src', 'db.ts');

generateDexieCode(schemaPath, outputPath).catch(console.error);
