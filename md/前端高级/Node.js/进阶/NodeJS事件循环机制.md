&emsp;&emsp;JS 引擎本身不实现事件循环机制，这是由它的宿主实现的，浏览器中的事件循环主要是由浏览器来实现，而在 NodeJS 中也有自己的事件循环实现。NodeJS 中也是循环 + 任务队列的流程以及微任务优先于宏任务，大致表现和浏览器是一致的。不过它与浏览器中也有一些差异，并且新增了一些任务类型和任务阶段。接下来我们介绍下 NodeJS 中的事件循环流程。

&emsp;&emsp;NodeJS 的跨平台能力和事件循环机制都是基于 Libuv 库实现的， Libuv 库是事件驱动的，并且封装和统一了不同平台的 API 实现。

&emsp;&emsp;NodeJS 中 V8 引擎将 JS 代码解析后调用 Node API，然后 Node API 将任务交给 Libuv 去分配，最后再将执行结果返回给 V8 引擎。在 Libux 中实现了一套事件循环流程来管理这些任务的执行，所以 NodeJS 的事件循环主要是在 Libuv 中完成的。

- [面试率 90% 的 JS 事件循环 Event Loop，看这篇就够了](https://blog.csdn.net/m0_46374969/article/details/119969908)
