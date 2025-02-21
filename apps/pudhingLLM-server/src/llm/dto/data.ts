interface MessageDataDto {
    type: string;
    text: string;
}

interface SendFormDataDto {
    assistantId: string;
    data: MessageDataDto[];
}

export { SendFormDataDto , MessageDataDto }