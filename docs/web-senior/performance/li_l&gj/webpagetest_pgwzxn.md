### [WebPageTest](https://www.webpagetest.org/)

&emsp;&emsp;WebPageTest 的核心是用于衡量和分析网页的性能。

&emsp;&emsp;WebPageTest 文档: [https://docs.webpagetest.org](https://docs.webpagetest.org/)

### 优化等级

![优化等级](./img/webpagetest_grade.png)

##### Security Score：安全性得分

- Strict-Transport-Security

&emsp;&emsp;强制要求客户端发送的请求要使用 https。通常设置为：

```
Strict-Transport-Security: max-age=31536000;includeSubDomains
```

&emsp;&emsp;意思是：接下来一年中，浏览器通过这个域传送 http 请求时必须使用 https，如果凭证无效，浏览器阻止警告继续访问网站的危险性。

- X-Content-Type-Options

&emsp;&emsp;禁止客户端进行 MIME.sniff，防止 content-type 被篡改。通常设置为：

```
x-content-type-options：nosniff
```

- X-Frame-Options

&emsp;&emsp;让该网站决定是能够被嵌入到 iframe 中。通常设置为：

```
X-Frame-Options: SAMEORIGIN
```

- Content-Security-Policy

&emsp;&emsp;避免跨 domain 的存取，CSP 可以设定到非常细，包括 image、script、style 存取 domain。通常设置为：

```
Content-Security-Policy: "default-src 'self' https://demo.com; frame-ancestors 'none'; style-src 'self' 'unsafe-inline';"
```

- X-XSS-Protection

&emsp;&emsp;启用 XSS 攻击检测，若监测到 XSS 攻击浏览器停止页面加载。通常设置为：

```
X-XSS-Protection：1; mode = block
```

##### First Byte Time；首字节时间

&emsp;&emsp;是从用户开始导航到页面到服务器响应，浏览器接收到 HTML 内容的第一个字节的时间。此时间也成为“后段时间”，是服务器为用户建立页面所花费的时间，包括 DNS 查找、TCP 连接、SSL 协商（如果是 HTTPS 请求）和 TTFB（Time To First Byte）。

##### Keep-alive Enabled: 长连接已启用

&emsp;&emsp;对页面上的内容（image、javascript、css、flash 等）的每个请求都需要通过与 Web 服务器的连接来进行。每次重新连接会耗费大量时间，最好能复用这些连接，keep-alive 是最好的方法。

&emsp;&emsp;默认情况下，它们在大多数配置中都是启用的，并且是 HTTP 1.1 标准的一部分，但是有时会被破坏（有时是无意间）。启用 KeepAlive 只需要修稿服务器上的配置，不需要对页面本身进行任何更改，通常可以将页面加载时间减少 40％至 50％。

##### Compress Transfer：压缩传输

&emsp;&emsp;页面上除了图片或视频，其他资源基本都是某种类型的文本（html、javascript、css）。HTTP 提供了一种以压缩形式传输文件的方法。

&emsp;&emsp;启用文本资源压缩只需要修改服务器配置，不需要对页面本身进行任何更改，并且可以提高性能降低服务内容的成本（通过减少传输的数据量）。

&emsp;&emsp;由于文本资源通常是在页面的开头（javascript 和 css）下载的，因此，与图像或其他内容上的过多字节相比，更快地传递文本资源对用户体验的影响要大得多。

##### Compress Images：压缩图片

&emsp;&emsp;图像压缩检查仅查看照片图像（JPEG 文件），并确保质量设置得不太高。JPEG 图像通常可以在不明显降低视觉质量的情况下进行相当大的压缩。在 Photoshop 的“另存为 Web”模式下，我们使用将图像压缩为“ 50”质量级别的标准，但是通常您应该尽可能地对其进行压缩，以免它们看起来不好。

&emsp;&emsp;将其他数据包含在照片中也很常见，尤其是如果这些数据来自数码相机（有关相机，镜头，位置，甚至缩略图的信息），并且其中的一些数据应在发布到网络之前从图像中删除（请小心 ​​ 保留所有版权信息）。

##### Cache Static content：缓存静态内容

&emsp;&emsp;静态内容是页面上不经常更改的内容（image、javascript、css）。可以对其进行配置，以便用户的浏览器将其存储在缓存中，这样，如果用户返回该页面（或访问使用相同文件的另一个页面），则他们可以仅使用其已有的副本来代替从文件中请求文件。

&emsp;&emsp;在用户的浏览器中成功缓存静态内容可以显着提高重复视图访问的性能（取决于页面，可达 80％以上），并减轻了 Web 服务器的负载。在不破坏页面的情况下实现缓存有时可能很棘手，所以不要盲目地启用它（您需要能够更改要更改的任何文件的文件名）。

##### Effective use of CDN：有效使用 CDN

&emsp;&emsp;每个内容的请求都是从用户的浏览器到 Web 服务器再返回。随着距离越来越远，这样一个往返可能消耗很多时间（页面上的请求越多，消耗的时间越多），把你的服务器建立在离用户比较近的地方就能解决这个问题，这正是内容分发网络（CDN）的作用。
