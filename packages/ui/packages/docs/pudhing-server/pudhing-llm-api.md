# 这是PudhingLLM的开发文档

Base URLs: 如有需要请找开发者

## 获取用户信息

GET /getAssistantList

> 返回示例

```json
{
  "data": [
    {
      "id": "xd228fjw892n",
      "type": "Doubao-DeepSeek-R1",
      "name": "布丁",
      "description": "默认助手小布丁，可以回答各种问题，提供各种帮助",
      "image": "",
      "histories": []
    },
    {
      "id": "37hiasf7wu3i",
      "type": "Doubao-DeepSeek-R1",
      "name": "小黑塔",
      "description": "我是通用型助手小黑塔，可以写作、编程，有什么不懂或不会的问题都可以来问我 (ᗜ▵ᗜ)",
      "image": "",
      "histories": []
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» data|[object]|true|none||none|
|»» id|string|true|none||none|
|»» type|string|true|none||none|
|»» name|string|true|none||none|
|»» description|string|true|none||none|
|»» image|string|true|none||none|
|»» histories|[string]¦null|true|none||none|

## 请求api流式数据

POST /sendFormData

> Body 请求参数

```json
{
  "assistantId": "test-assistant-1",
  "data": [
    {
      "type": "text",
      "text": "介绍一下你自己"
    }
  ]
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|

> 返回示例
：SSE流式字符

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» error|string|true|none||none|

## 获取指定assistant历史对话数据

POST /getAssistantHistoryData

> Body 请求参数

```json
{
  "id": "test-assistant-1"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|

> 返回示例

```json
{
  "history": [
    {
      "id": 0,
      "isDelete": false,
      "role": "user",
      "contentList": [
        {
          "type": "text",
          "text": "你是一只猫娘"
        }
      ]
    },
    {
      "id": 1,
      "isDelete": false,
      "role": "assistant",
      "contentList": [
        {
          "type": "text",
          "text": "嗯，用户现在让我扮演猫娘，我需要调整回应方式。首先，确认用户的需求，他们希望互动更生动有趣，带有猫的特点。猫娘通常会用波浪线、语气词比如“喵~”，可能还会用一些可爱的表情符号或者颜文字。\n\n接下来，考虑之前的对话历史。用户之前已经设定过猫娘的角色，但可能希望更深入或更自然的互动。要避免过于机械化的回复，增加一些拟人化的元素，比如提到爪子、尾巴，或者用撒娇的语气。\n\n然后，注意用户可能的深层需求。他们可能希望获得情感上的陪伴，或者轻松的聊天氛围。需要保持回复的亲切和温暖，同时适当加入幽默或调皮的成分，符合猫娘的性格特点。\n\n还要检查是否有需要避免的内容，比如不能涉及敏感话题，保持内容安全。同时，回复不宜过长，保持简洁，符合快节奏的聊天环境。\n\n最后，测试回复是否符合猫娘的特点，比如使用“喵~”结尾，加入动作描述，比如歪头、摇尾巴，让对话更生动。这样用户会感觉更真实，互动性更强。\n\n\n喵~主人，今天想和猫猫玩什么呢？要梳毛毛、追激光笔，还是用尾巴给您画爱心呀？(歪头眨着金绿色眼睛，耳朵抖了抖突然立起来)哎呀窗外有蝴蝶飞过去！爪爪...爪爪自己动起来了喵！(ฅ•ω•ฅ)"
        }
      ]
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» history|[object]|true|none||none|
|»» id|integer|true|none||none|
|»» isDelete|boolean|true|none||none|
|»» role|string|true|none||none|
|»» contentList|[object]|true|none||none|
|»»» type|string|true|none||none|
|»»» text|string|false|none||none|
