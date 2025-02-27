const data: string = `
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
*斜体文本*
_斜体文本_
**粗体文本**
__粗体文本__
***粗斜体文本***
___粗斜体文本___
* * *

*****

- - -

----------
~~BAIDU.COM~~

<u>带下划线文本</u>

茅盾[^1]

[^1]: 我国著名的文学作家
$$ \\frac{7x+5}{1+y^2} $$
$$z=z_l$$
$$\\cdots$$
$$\\frac{d}{dx}e^{ax}=ae^{ax}\\quad \\sum_{i=1}^{n}{(X_i -\\overline{X})^2}$$
$$\\sqrt{2};\\sqrt[n]{3}$$
$$\\vec{a} \\cdot \\vec{b}=0$$
$$\\int ^2_3 x^2 {\\rm d}x$$
$$\\iint$$
$$\\iiint$$
$$\\oint$$
$$\\mathrm{d}$$
$$\\prime$$
$$\\lim$$
$$\\infty$$
$$\\partial$$
$$\\left.\\frac{\\partial f(x,y)}{\\partial x}\\right\\lvert_{x=0}$$
$$
\\begin{Bmatrix}
1 & 2 & 3 \\
\\end{Bmatrix} \\tag{5}
$$
* 第一项
* 第二项
* 第三项

+ 第一项
+ 第二项
+ 第三项


- 第一项
- 第二项
- 第三项
> 区块引用
> 
> 菜鸟教程

> 学的不仅是技术更是梦想
> 最外层
> > 第一层嵌套
> > > 第二层嵌套
> 区块中使用列表
> 1. 第一项
> 2. 第二项
> + 第一项
> + 第二项
> + 第三项
* 第一项
    > 菜鸟教程
    > 学的不仅是技术更是梦想
* 第二项
\`printf()\` 函数
\`\`\`javascript
$(document).ready(function () {
    alert('RUNOOB');
});
\`\`\`
这是一个链接 [菜鸟教程](https://www.runoob.com)
|  表头   | 表头  |
|  ----  | ----  |
| 单元格  | 单元格 |
| 单元格  | 单元格 |
![Alt text](图片链接 "optional title")
![avatar](/home/picture/1.png)
`
export {
    data
}