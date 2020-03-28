&emsp;&emsp;Electron 的核心是多进程架构。主要有主进程(main processes)和渲染进程(renderer processes)组成。

&emsp;&emsp;每个进程都是并发运行的，而且每个进程的内存和资源是相互独立的。

# 主进程
&emsp;&emsp;Electron运行package.json的main字段指定文件后的进程，即为主进程。

### 特性
&emsp;&emsp;一个 Electron 应用只有一个主进程。

### 功能

1. 主进程使用BrowserWindow实例创建页面，主进程可以创建多个渲染进程。
2. 响应应用的生命周期事件。
3. 负责与原生操作系统 API 进行通信。
4. 执行诸如注册全局快捷方式、创建菜单和对话框、响应自动更新等操作。
5. 主进程中提供了 Element API 的子集，以及所有 nodejs 模块。

# 渲染进程

&emsp;&emsp;当 BrowserWindow 实例销毁时，响应的渲染进程也会终止。

&emsp;&emsp;渲染进程可以加载 Web 页面，即一个实例的网页 webContents，来显示 GUI 界面。渲染器中提供了所有 DOM API，node.js API 和 Electron API 的子集。

&emsp;&emsp;在窗口中包含 webContents 实例之前，实际上不会创建渲染器进程。一个窗口可以托管多个 webview，每个 webview 都有自己的 webContents 实例和渲染器进程。

&emsp;&emsp;渲染进程之间相互隔离，并且不允许它们直接访问操作系统级别的 API。当渲染进程需要访问系统级别 api，可以与主进程通信，由主进程实现其功能。

# Electron API

![electron api](https://raw.githubusercontent.com/staven630/blog/master/assets/electron/electron-apis.png)

&emsp;&emsp;上图可以看出 Node.js API 全局可用，而渲染进程只有 DOM/Browser API 可用。