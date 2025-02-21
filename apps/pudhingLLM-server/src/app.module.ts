import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { LLMModule } from './llm/llm.module';
import { PrismaModule } from "./prisma/prisma.module"

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.env.${process.env.NODE_ENV}`,
        }),
        LLMModule,
        PrismaModule,
    ],
})
export class AppModule { }
