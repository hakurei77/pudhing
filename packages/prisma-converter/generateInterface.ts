// generateInterface.ts
import { typeMapping } from './typeMapping';

export function generateInterface(model: any): string {
    console.log(model.fields)
    const fields = model.fields
        .filter((field: any) => field.kind === 'scalar') // 只处理标量字段
        .map((field: any) => {
            const tsType = typeMapping[field.type] || 'unknown';
            return `${field.name}${field.isRequired ? '' : '?'}: ${tsType};`;
        })
        .join('\n  ');

    return `interface ${model.name} {
  ${fields}
}`;
}