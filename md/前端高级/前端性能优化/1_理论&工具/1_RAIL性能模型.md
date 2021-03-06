&emsp;&emsp;RAIL是以用户为中心的性能模型。RAIL代表Web应用程序生命周期的四个不同方面：
* 响应（Response）
* 动画（Animation）
* 空闲（Idle）
* 加载（Load）

![RAIL性能模型的4个部分](./img/rail.png)



<!-- ![RAIL性能模型的4个部分](~@images/performance/rail_model.png) -->

# 用户感知
&emsp;&emsp;用户感知性能延迟的关键指标：
| 延迟时间       | 用户感知                                                                                                                                                                      |
| :------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0 ~ 16s        | 只要每秒渲染60个新帧，就能感觉到其流畅性，也就是每帧（1000/60~=16ms)。 |
| 0 ~ 100ms      | 在这个时间范围内向用户做出响应，他们会感觉到这样的结果是即时的。超过100ms，行动和反应之间的连接就会被破坏了。                                                                   |
| 100ms ~ 1000ms | 用户会感觉到网站上有一些加载任务                                                                                                                                                  |
| 1000ms ~       | 用户会渐渐地对他们正在执行的任务失去耐心。                                                                                                                                    |
| 10000ms ~| 用户会绝望的，然后放弃任务。                                                                                                                                              |

# Response：在50ms内响应用户操作事件
&emsp;&emsp;在100ms内完成由用户输入启动的过渡，这样用户感觉交互是即时的。

### 指导方针
* 为确保在100ms内可见响应，在50ms内处理用户输入事件。这适用于大多数输入操作，例如单击按钮、切换表单控件。开始动画。这不适用于触摸拖动或滚动。
  
* 可以在这100ms窗口执行其他昂贵的工作，但注意不要阻塞用户输入操作。如果可能，请使用[后台任务API](https://developer.mozilla.org/en-US/docs/Web/API/Background_Tasks_API)进行操作。
  
* 如果超过50ms的响应，一定要提供反馈，比如倒计时，进度百分比等。

### 50ms or 100ms
&emsp;&emsp;目标是在100ms内响应输入，那么为什么我们的预算只有50ms？

&emsp;&emsp;这是因为除了输入处理外，通常还要执行其他工作，并且该工作会占用一部分时间来接受可接受的输入响应。如果应用程序在空闲时间以建议的50ms块执行工作，这意味着如果输入发生在这些工作块之一中，则输入最多可以排队50ms。考虑到这一点，可以安全地假设只有剩余的50ms可用于实际的输入处理。

&emsp;&emsp;空闲任务如何影响输入响应预算:

![空闲任务如何影响输入响应预算](./img/idle.png)

# Animation：在10ms内产生一帧
&emsp;&emsp;如果想达到60FPS,理论上每帧预算为16m（1000ms/每秒60帧≈16ms）。但是浏览器通常渲染每帧需要大概6ms。因此，需要在10ms或更短的时间内产生的每帧。


### 指导方针

* 在类似动画这类高压点上，尽量不要去处理其他操作。尽可能保证达到60fps的体验。

* 有关各种动画优化策略，请参见[渲染性能](https://developers.google.com/web/fundamentals/performance/rendering)
  
&emsp;&emsp;动画不只是UI的视觉效果，以下行为都属于动画：
  1. 视觉动画，如渐隐渐显，tweens，loading等
  2. 滚动，包含弹性滚动，松开手指后，滚动会持续一段距离
  3. 拖拽，缩放，经常伴随着用户行为

# Idle：最大化空闲时间
&emsp;&emsp;为了提高始终达到50ms响应时间的机会，提供充分利用空闲时间。必须确保在空闲时间执行的工作不会干扰响应能力。

### 指导方针

* 尝试在初始页面加载期间仅加载页面中最关键的元素，然后使用空闲时间来完成延迟的工作。例如，最小化预加载数据，以保证应用程序快速加载完成，然后使用空闲时间加载其余数据。

* 在50ms或更短的空闲时间内执行工作。为了保证<100ms的响应，应用程序必须在每个<100ms的时间内将控制权交回主线程，这样主线程才能响应用户输入。

* 如果用户在空闲时间工作期间与页面进行交互，则此用户交互应始终具有最高优先级，并中断空闲时间工作。

# Load：在5s内交付内容并进行互动
&emsp;&emsp;当页面加载缓慢时，用户的注意力会散乱，用户会认为任务已中断。快速加载的网站具有更长的平均会话时间，更低的跳出率和更高的广告可见度。

* 用户应该能够在首次请求您的URL后最多五秒钟之内开始与您的页面进行交互。

* 对于后续加载，一个不错的目标是在2秒内加载页面。

### 指导方针：

* 消除渲染阻塞资源。

* 不必在5秒钟内加载所有内容即可产生完整加载的感觉。考虑延迟加载图像、代码拆分JavaScript包等优化。

* 实际上我们并不需要在1s内加载完所有东西，只需要在1s内完成关键呈现路径即可，这样就可以给用户提供一个全部加载完成的错觉！开启渐进式渲染并且在后台做一些任务、延迟一些非关键加载到空闲时间中，这些都是一些比较常见的优化手段。

### 影响到页面加载性能的因素
* 网络速度和延迟

* 硬件（例如，较慢的CPU）

* 缓存逐出

* L2/L3缓存的差异

* 解析JavaScript


# 参考资料
* [Measure performance with the RAIL model](https://web.dev/rail/)
* [An Overview of the RAIL Performance Model](https://www.keycdn.com/blog/rail-performance-model)