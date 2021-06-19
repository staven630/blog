# 五个方面

![五个方面](./img/lighthouse_score.png)

- Performance：性能
- Accessibility：辅助功能
- Best Practices：最佳实践
- SEO：搜索引擎优化
- Progressive Web：PWA

# 性能

### 影响性能的关键因素

| 因素                                                                                                                                                      | 说明                                 |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------- |
| [Properly size images](https://web.dev/uses-responsive-images/?utm_source=lighthouse&utm_medium=devtools)                                                 | 适当大小的图像                       |
| [Use HTTP\/2](https://web.dev/uses-http2/?utm_source=lighthouse&utm_medium=devtools)                                                                      | 使用 HTTP\/2                         |
| [Eliminate render-blocking resources](https://web.dev/render-blocking-resources/?utm_source=lighthouse&utm_medium=devtools)                               | 消除渲染阻塞资源                     |
| [Avoid enormous network payloads ](https://web.dev/total-byte-weight/?utm_source=lighthouse&utm_medium=devtools)                                          | 避免巨大的网络负载                   |
| [Serve static assets with an efficient cache policy](https://web.dev/uses-long-cache-ttl/?utm_source=lighthouse&utm_medium=devtools)                      | 使用高效的缓存策略为静态资产提供服务 |
|                                                                                                                                                           |
| [Ensure text remains visible during webfont load](https://web.dev/font-display/?utm_source=lighthouse&utm_medium=devtools)                                | 确保文本在 webfont 加载期间保持可见  |
| [Does not use passive listeners to improve scrolling performance](https://web.dev/uses-passive-event-listeners/)                                          | 使用被动侦听器提高滚动性能           |
| [Image elements do not have explicit width and height](https://web.dev/optimize-cls/?utm_source=lighthouse&utm_medium=devtools#images-without-dimensions) | 图像元素没有明确的宽度和高度         |
| [Minimize main-thread work](https://web.dev/mainthread-work-breakdown/?utm_source=lighthouse&utm_medium=devtools)                                         | 最小化主线程工作                     |
| [Avoid chaining critical requests](https://web.dev/critical-request-chains/?utm_source=lighthouse&utm_medium=devtools)                                    | 避免关键链请求                       |
| [Keep request counts low and transfer sizes small ](https://web.dev/resource-summary/)                                                                    | 保持较低的请求数量和较小的传输大小   |
| [Largest Contentful Paint element](https://web.dev/lighthouse-largest-contentful-paint/?utm_source=lighthouse&utm_medium=devtools)                        | 最大的渲染元素                       |
| [Avoid large layout shifts]()                                                                                                                             | 避免大的布局变化                     |
| [Avoid non-composited animations](https://web.dev/non-composited-animations/?utm_source=lighthouse&utm_medium=devtools)                                   | Avoid non-composited animations      |
| [Defer offscreen images](https://web.dev/offscreen-images/?utm_source=lighthouse&utm_medium=devtools)                                                     | 迟迟屏幕外图像                       |
| [Minify CSS](https://web.dev/unminified-css/?utm_source=lighthouse&utm_medium=devtools)                                                                   | 压缩 CSS                             |
| [Minify JavaScript](https://web.dev/unminified-javascript/?utm_source=lighthouse&utm_medium=devtools)                                                     | 压缩 JavaScript                      |
| [Remove unused CSS](https://web.dev/unused-css-rules/?utm_source=lighthouse&utm_medium=devtools)                                                          | 移除无效的 CSS                       |
| [Remove unused JavaScript](https://web.dev/unused-javascript/?utm_source=lighthouse&utm_medium=devtools)                                                  | 移除无效的 JavaScript                |
| [Efficiently encode images](https://web.dev/uses-optimized-images/?utm_source=lighthouse&utm_medium=devtools)                                             | 有效地图像编码                       |
| [Serve images in next-gen formats](https://web.dev/uses-webp-images/?utm_source=lighthouse&utm_medium=devtools)                                           | 提供下一代格式的图像                 |
| [Enable text compression]()                                                                                                                               | 启用文本压缩                         |
| [Preconnect to required origins]()                                                                                                                        | 预连接到所需的源                     |
| [Initial server response time was short]()                                                                                                                | 初始服务器响应时间短                 |
| [Avoid multiple page redirects]()                                                                                                                         | 避免多页重定向                       |
| [Preload key requests]()                                                                                                                                  | 预加载请求                           |
|                                                                                                                                                           |
| [Use video formats for animated content]()                                                                                                                | 对动画内容使用视频格式               |
| [Remove duplicate modules in JavaScript bundles]()                                                                                                        | 删除 JavaScript 包中的重复模块       |
| [Avoid serving legacy JavaScript to modern browsers]()                                                                                                    | 避免为现代浏览器提供遗留 JavaScript  |
| [Preload Largest Contentful Paint image]()                                                                                                                | 预加载最大内容绘制图像               |
| [Avoids an excessive DOM size]()                                                                                                                          | 避免过大的 DOM 大小                  |
| [User Timing marks and measures]()                                                                                                                        | 用户计时标记和度量                   |
| [JavaScript execution time]()                                                                                                                             | 用户计时标记和度量                   |
| [Minimize third-party usage]()                                                                                                                            | 用户计时标记和度量                   |
| [Lazy load third-party resources with facades](https://web.dev/third-party-facades/)                                                                      | 使用 Facade 延迟加载第三方资源       |
| [Avoids document.write()]()                                                                                                                               | 避免 document.write（）              |
| [Avoid long main-thread tasks]()                                                                                                                          | 避免长时间的主线程任务               |

### 六个指标

### First Contentful Paint(FCP)

&emsp;&emsp;首次内容绘制时间是指浏览器从响应用户输入网址地址，到浏览器开始显示内容的时间。FCP 应该在 1s 内发生。

&emsp;&emsp;这个过程包括 DNS 查询、建立 TCP 连接、发送首个 HTTP 请求（如果使用 HTTPS 还要介入 TLS 的验证时间）、返回 HTML 文档、HTML 文档 head 解析完毕。FCP = TTFB + 内容加载时间 + 渲染时间

&emsp;&emsp;影响 FCP 的因素：网络、服务端性能、前端页面结构设计。

##### FCP 分数

| FCP 时间 | 颜色编码   | FCP 分数 |
| :------- | :--------- | :------- |
| 0 ~ 2s   | 绿色(快速) | 75 ~ 100 |
| 2 ~ 4s   | 橙色(中等) | 50 ~ 74  |
| 超过 4s  | 红色(慢)   | 75 ~ 100 |

### Speed Index

&emsp;&emsp;Lighthouse 以秒为单位显示速度指数。

##### 速度分数

| 速度指数(以秒为单位) | 颜色编码   | 速度指数分数 |
| :------------------- | :--------- | :----------- |
| 0 ~ 4.3              | 绿色(快速) | 75 ~ 100     |
| 4.4 ~ 5.8            | 橙色(中等) | 50 ~ 74      |
| 5.8 ~                | 红色(慢)   | 0 ~ 49       |

##### 提高速度指数

- 最小化主线程工作
- 减少 JavaScript 执行时间
- 确保文本在 webfont 加载期间保持可见

### Largest Contentful Paint (LCP)

&emsp;&emsp;最大内容绘制(LCP)是一个重要的、以用户为中心的衡量感知加载速度的指标。用于衡量视口中最大内容元素何时可见。

##### 什么是 LCP

&emsp;&emsp;LCP 指标报告视口内可见的最大图像或文本块的渲染时间，相对于页面首次加载的时间。为了提供良好的用户体验，网站应努力将最大内容绘制时间设为 2.5 秒或更短。

![lcp](./img/lcp.png)

##### LCP 低效的常见原因

- 服务器响应素的慢
- 阻塞渲染的 JavaScript 和 CSS
- 缓慢的资源加载时间
- 客户端渲染

##### 需要考虑的元素

- \<img>元素
- \<image>元素内的\<svg>预算
- \<video>元素
- 具有通过该 url()函数加载的背景图像的元素
- 包含文本节点或其他内联级文本元素子级的块级元素

##### 改进 LCP

- 使用 PRPL 模式应用即时加载
- 优化关键渲染路径
- 优化 css
- 优化图像
- 优化 webfont
- 优化 JavaScript

### Time to Interactive(TTI)

&emsp;&emsp;交互时间(TTI)衡量一个页面需要多长时间才能完全交互。页面被认为是完全交互的：

- 页面显示有用的内容，这是有 FCP 衡量的
- 为大多数可见的页面元素注册了事件处理程序
- 该页面在 50ms 内响应用户交互

##### TTI 等级

| TTI 指标(ms) | 颜色编码   |
| :----------- | :--------- |
| 0 ~ 3.8      | 绿色(快速) |
| 3.9 ~ 7.3    | 橙色(中等) |
| 7.3 ~        | 红色(慢)   |

##### 改进 TTI

- 推迟或删除不必要的 JavaScript 工作
- 通过代码拆分和应用 PRPL 模式来减少 JavaScript 负载
- 优化第三方 JavaScript
- 最小化主线程工作
- 减少 JavaScript 执行时间

### Total Blocking Time(TBT)

&emsp;&emsp;总阻塞时间(TBT)衡量页面被阻止响应用户输入的总时间。总时间是通过在 FCP 和 TTI 之间添加所有长任务的阻塞部分来计算的。

##### TBT 等级

| TBT 时间(ms) | 颜色编码   |
| :----------- | :--------- |
| 0 ~ 300      | 绿色(快速) |
| 300 ~ 600    | 橙色(中等) |
| 600 ~        | 红色(慢)   |

##### 长任务

&emsp;&emsp;任何执行时间超过 50ms 的任务都是长任务。50ms 后的事件量是阻塞部分。一个长期的任务是 JavaScript 代码为垄断长时间主线程，导致用户界面“冻结”。

![Long Tasks](./img/long_tasks.png)

##### 造成长任务的原因

- 不必要的加载、解析或执行。
- 低效的 JavaScript 语句。

##### 改进 TBT

- 通过代码拆分减少 JavaScript 负载、删除未使用的代码或有效加载第三方 JavaScript。

### Cumulative Layout Shift(CLS)

&emsp;&emsp;[Cumulative Layout Shift](https://web.dev/cls/)，即累积布局偏移。是衡量<b>视觉稳定性</b>的一个重要的、以用户为中心的指标。可以帮助我们定量计算出用户遇到意料之外的布局偏移的频率，CLS 小可以确保我们的页面有一个良好的用户体验。

<video autoplay="" class="w-screenshot" controls="" loop="" muted="" height="510" poster="https://storage.googleapis.com/web-dev-assets/layout-instability-api/layout-instability-poster.png" width="658"><source src="https://storage.googleapis.com/web-dev-assets/layout-instability-api/layout-instability2.webm" type="video/webm; codecs=vp8"><source src="https://storage.googleapis.com/web-dev-assets/layout-instability-api/layout-instability2.mp4" type="video/mp4; codecs=h264"></video>

&emsp;&emsp;网页中内容经常出现预料之外的移动，大多数是由于一些异步资源的加载或者是动态添加 DOM 元素到当前页面上造成的。其主要原因是：

1. 尺寸未知的图片或视频
2. 尺寸未知的广告、嵌入元素 iframe
3. 动态插入内容
4. 导致 [FOIT/FOUT](https://www.zachleat.com/web/fout-vs-foit/) 的 webfont
5. 在更新 DOM 之前等待网络响应的操作

##### 什么是 CLS

&emsp;&emsp;CLS 会计算出页面整个生命周期中所有发生的预料之外的布局偏移的得分的总和。一个拥有良好用户体验的网站的 CLS 得分应该尽可能的小于 0.1。

![CLS](./img/cls.png)

&emsp;&emsp;只有在可视元素改变自身的最初位置才表示发生了布局偏移。如果一个新元素被添加至 DOM 上或者可视元素更改了自身的尺寸大小，都不会作为布局偏移。只要更改不会导致其他可见元素更改其起始位置。

##### 动画和过渡

&emsp;&emsp;动画和过渡如果用的好，就可以做到在用户不感到突兀的情况下更新页面内容。

- 使用 transform: scale()代替宽、高来改变元素尺寸大小。
- 移动元素时，避免修改 top、right、bottom 和 left 属性，而是使用 transform: translate()

##### 改进 CLS

- 始终在图像和视频元素上设置尺寸相关属性，或者通过[CSS aspect ratio boxes](https://css-tricks.com/aspect-ratio-boxes/)等方式保留所需的空间。还可以使用 unsized-media 功能策略在支持功能策略的浏览器中强制执行此行为。
- 切勿在现有内容之上插入内容，除非响应用户交互。
- 优先使用变换动画属性而不是触发布局更改的属性。
- web 字体尽可能早的加载，避免产生 FOIT 和 FOUT
