export function generateDexieClass(models: any[]): string {
    const tables = models
        .map(model => `${model.name.toLowerCase()}s!: Table<${model.name}, string>;`)
        .join('\n  ');

    const stores = models
        .map(model => {
            const primaryKey = model.fields.find((f: any) => f.isId);
            const allFields = model.fields.map((f: any) => f.name);

            let primaryKeyPart = '';
            if (primaryKey) {
                const isAutoIncrement = primaryKey.default?.name === 'autoincrement';
                const prefix = isAutoIncrement ? '++' : '&';
                primaryKeyPart = `${prefix}${primaryKey.name}`;
            }

            const indexParts = allFields
                .filter((name: string) => name !== primaryKey?.name)
                .map((name: string) => name);

            const allKeys = [primaryKeyPart, ...indexParts].filter(Boolean);

            return `'${model.name.toLowerCase()}s': '${allKeys.join(', ')}'`;
        })
        .join(',\n      ');

    return `class AppDB extends Dexie {
  ${tables}

  constructor() {
    super('AppDB');
    this.version(1).stores({
      ${stores}
    });
  }
}`;
}
