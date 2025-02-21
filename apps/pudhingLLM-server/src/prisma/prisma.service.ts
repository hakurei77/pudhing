import { PrismaClient } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
        super({
            log: ['query'],
            datasources: {
                db: {
                    url: process.env.DATABASE_URL
                }
            }
        });
        console.log(`当前数据库连接URL: ${process.env.DATABASE_URL}`);
    }
}
