# ipcMain 和 ipcRenderer 模块

&emsp;&emsp;Electron 使用 IPC(interprocess communication)在进程间通信，与 Chromium 相同。IPC 可以在渲染进程和主进程之间双向通信。IPC 默认是异步的，但也有同步的 API（如 Node.js 中的 fs）。

### 异步通信

* 主进程 => 渲染进程: 主进程发送异步事件
```js
const mainWindow = new BrowserWindow({})
mainWindow.send(eventName, args)
```

* 渲染进程 <= 主进程: 渲染进程监听事件
```js
ipcRenderwer.on(eventName, (event, args) => {})
```

* 渲染进程 => 主进程：渲染进程发送异步事件
```js
ipcRenderer.send(eventName, args)
```

* 主进程 <= 渲染进程：主进程监听事件

&emsp;&emsp;主进程在ipcMain监听回调里，通过event.reply(eventName, repleyArgs)响应事件。
```js
ipcMain.on(eventName, (event, args) => {
  // 响应事件
  event.reply(eventName, 'repley')
})
```

### 同步通信
&emsp;&emsp;同步通讯与异步通信类似，主要有以下不同：

* 事件发送方法不再是send,而是sendSync
```js
const mainWindow = new BrowserWindow({})
const result = mainWindow.sendSync(eventName, args)
```

* 监听响应不再是event.sender.send,而是直接赋值event.returnValue
```js
ipcMain.on(eventName, (event, args) => {
  event.returnValue = '回复';
})
```

### 示例
> index.html

```html
<button id="syncBtn">同步发送</button>
<button id="asyncBtn">异步发送</button>
<script src="renderer.js"></script>
```
> 渲染进程：renderer.js
```js
const { ipcRenderer } = require('electron')

function $(dom) {
  return document.querySelector(dom)
}

$('#syncBtn').addEventListener('click', () => {
  const result = ipcRenderer.sendSync('syncSend', '同步sync发送消息');
  console.log('主进程响应sync消息:', result);
})

$('#asyncBtn').addEventListener('click', () => {
  ipcRenderer.send('asyncSend', '同步async发送消息');
  ipcRenderer.on('reply', (event, args) => {
    console.log('主进程响应async消息:', args);
  })
})
```

> 主进程：main.js

```javascript
const { app, BrowserWindow, ipcMain } = require('electron')

function createWindow() {
  const mainWin = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWin.webContents.openDevTools({
    mode: 'bottom'
  });
  mainWin.loadFile('index.html')

  ipcMain.on('syncSend', (event, args) => {
    console.log('ipcRenderer syncSend消息:', args);
    event.returnValue = '主进程收到同步消息';
  })

  ipcMain.on('asyncSend', (event, args) => {
    console.log('ipcRenderer asyncSend消息:', args);
    event.reply('reply', '主进程收到异步消息')
  })
}

app.on('ready', createWindow)
```

# remote 模块

&emsp;&emsp;Electron 还提供了 remote 模块，使渲染进程中可以访问/使用主进程模块。

### 在渲染进程新建窗口

```javascript
const { remote, remote: { BrowserWindow } } = require('electron')

const win = new BrowserWindow({
  width: 600,
  height: 500
})

win.loadURL('https://github.com/staven630')
```

### 渲染进程访问主进程模块
> show-dialog.js
```js
const electron = require('electron')
const dialog = electron.dialog || electron.remote.dialog

function showDialog(message) {
  dialog.showMessageBox({
    type: 'info',
    title: '提示',
    message,
    buttons: ['确认', '提示']
  })
}

module.exports = showDialog
```

> main.js
```javascript
const { app } = require('electron')
const showDialog = require('./show-dialog')
showDialog()
```

> renderer.js
```javascript
const showDialog = require('./show-dialog')

document.querySelector('#open-dialog').addEventListener('click', () => {
  showDialog('staven')
})
```

&emsp;&emsp;通过 remote 对象，可以不用显示地发送进程间消息来进行通信。但实际上，调用远程对象的方法、函数或者通过远程构造函数创建一个新的对象，实际上都是在发送一个同步的进程间消息。

&emsp;&emsp;如果在主进程中进行 CPU 密集型工作，它将锁定所有渲染器进程。因此，CPU 密集型任务应该在一个单独的进程中运行，而不是具有 UI 的现有渲染器。

### devtron 模块

&emsp;&emsp;使用 devtron 模块，可以检测使用 remote 模块时发生的所有 IPC 调用。同步 IPC 调用可能具有性能缺陷性。

# 网络协议

&emsp;&emsp;Chromium IPC 文档声明它是“named pipes”作为基础工具。named pipes 允许比网络协议提供的更快，更安全的通信。
