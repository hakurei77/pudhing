import { Controller, Get , Post , Body , HttpCode , Sse } from '@nestjs/common';
import { LLMService } from './llm.service';
import { SendFormDataDto } from './dto/data';

@Controller()
export class LLMController {
    constructor(private readonly llmService: LLMService) {}

    @Get("/api/getAssistantList")
    getAssistantList() {
        return this.llmService.getAssistantList();
    }

    @Post("/api/getAssistantHistoryData")
    @HttpCode(200)
    getAssistantHistoryData(@Body() body: { id: string }) {
        return this.llmService.getAssistantHistoryData(body.id);
    }

    @Post("/api/sendFormData")
    @Sse()
    sendFormData(@Body() body: SendFormDataDto) {
        return this.llmService.sendFormData(body.assistantId, body.data)
    }
}
