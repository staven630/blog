&emsp;&emsp;浏览器渲染页面前需要先构建 DOM 和 CSSOM 树。因此，需要确保尽快将 HTML 和 CSS 都提供给浏览器。

- 字节 → 字符 → 令牌 → 节点 → 对象模型
- HTML 标记 → DOM，CSS 标记 → CSSOM
- DOM 和 CSSOM 是独立的数据结构

### 文档对象模型（DOM）

&emsp;&emsp;DOM 包含所有内容。DOM 构建是增量的。单个 DOM 节点以 startTag 令牌开始，以 endTag 令牌结束。节点包含有关 HTML 元素的所有相关信息。该信息是使用令牌描述的。DOM 节点数量越多，关键渲染路径中的后续事件将花费的时间就越长。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <link href="style.css" rel="stylesheet" />
    <title>Critical Path</title>
  </head>
  <body>
    <p>Hello <span>web performance</span> students!</p>
    <div><img src="awesome-photo.jpg" /></div>
  </body>
</html>
```

![critical-rendering-path-1](./img/critical-rendering-path-1.png)

&emsp;&emsp;DOM 输出流程：

1. 转换：浏览器获取 HTML 原始字节，根据文件指定编码将它们转换成各个字符。
2. 令牌化：浏览器将字符串转换成 W3C HTML5 标准规定的各种令牌，eg："\<html>"、"\<body>"。每个令牌都具有特殊含义和一组规则。
3. 词法分析：发出的令牌转换成定义其属性和规则的对象。
4. DOM 构建

### CSS 对象模型（CSSOM）

&emsp;&emsp;CSSOM 包含页面的所有样式。CSSOM 不是增量构建的。CSS 是渲染阻塞的：浏览器会阻塞页面渲染直到它接收和执行了所有的 CSS。从选择器性能的角度，更少的特定选择器是比更多的要快。

```css
body {
  font-size: 16px;
}
p {
  font-weight: bold;
}
span {
  color: red;
}
p span {
  display: none;
}
img {
  float: right;
}
```

![cssom-tree](./img/cssom-tree.png)

&emsp;&emsp;浏览器都会先从适用于该节点的最通用规则开始，然后通过应用更具体的规则（即规则“向下级联”）以递归方式优化计算的样式。

&emsp;&emsp;以上并非完整 CSSOM 树，只显示了我们决定在样式表中替换的样式。每个浏览器都提供了一组默认样式。
