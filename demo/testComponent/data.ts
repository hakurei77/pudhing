const testData = `
# 一级标题 ✨
## 二级标题 📚
### 三级标题 💡
#### 四级标题 🎯
##### 五级标题 🌟
###### 六级标题 💫

---

**粗体文本**  
*斜体文本*  
***粗斜体文本***  
~~删除线文本~~  
\`行内代码\`

---

## 列表类型

### 无序列表
- 项目一
- 项目二
  - 子项目一
  - 子项目二

### 有序列表
1. 第一项
2. 第二项
   1. 子项一
   2. 子项二

### 任务列表
- [x] 已完成任务
- [ ] 未完成任务

---

## 链接与图片
[普通链接](https://example.com)  
![图片描述](/vite.svg)  
[引用式链接][1]

[1]: https://example.com

---

# 代码块与公式示例

---

## 代码块

### 基础代码块
\`\`\`typescript
export const useDataListStore = defineStore('data-list', {
    state: () => ({
        dataList: [] as DataList[],
    }),
    actions: {
        addUserData(data: List[]) {
            this.dataList.push({
                role: "user",
                content: data
            });
        },
        addSystemList() {
            this.dataList.push({
                role: "assistant",
                content: [
                    {
                        type: "text",
                        text: ''
                    }
                ]
            });
        },
        addSystemData(data: string){
            this.dataList[this.dataList.length - 1].content.forEach((item)=>{
                if(item.type === 'text'){
                    item.text += data;
                }
            });
        }
    },
});

\`\`\`

### 指定语言高亮
\`\`\`javascript
const num = 42;
console.log(\`The answer is \${num}\`);
\`\`\`

### 多行高亮代码
\`\`\`python
def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b
\`\`\`

---

## 数学公式

### 行内公式
勾股定理：\\$a^2 + b^2 = c^2\\$

### 块级公式
\\$\\$
\\begin{cases}
x = r \\cos\\theta \\\\
y = r \\sin\\theta
\\end{cases}
\\$\\$

### 矩阵与积分
\\$\\$
\\begin{bmatrix}
1 & 2 \\\\
3 & 4
\\end{bmatrix}
\\quad
\\int_{0}^{\\infty} e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}
\\$\\$

### 化学公式
\\$\\$
\\ce{2H2 + O2 ->[\\text{点燃}] 2H2O}
\\$\\$

\\$\\$
\\ce{CH3CH2OH ->[H2SO4][Δ] CH2=CH2 ^ + H2O}
\\$\\$

---

## 混合示例

### 代码与公式结合
计算圆的面积：
\`\`\`python
import math
radius = 5
area = math.pi * radius**2
\`\`\`

对应的数学公式：
\\$\\$
A = \\pi r^2
\\$\\$

### 化学反应解释
乙醇脱水反应：
\`\`\`
\\ce{CH3CH2OH ->[浓H2SO4][170°C] CH2=CH2 ^ + H2O}
\`\`\`
`;

export {
    testData
};