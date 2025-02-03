# api文档
## http://localhost:3000/api/getFormData （POST）
### 作用
向后端传输用户发送给llm的数据，并返回llm的流式回复
### 数据格式
```
[
    {
        "type": "text",
        "text": ""      //string
    },
    {
        "type": "image_url",
        "image_url": {
            "url": "",  //base64编码的图片
        },
    },
    {
        "type": "image_url",
        "image_url": {
            "url": "",  
        },
    }
]
```
### 如何使用
```
sendFormDataApi(data)
```
### 返回值
流式字符