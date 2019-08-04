&emsp;&emsp;Electron的核心是多进程架构。可以拥有两个或多个操作系统进程并发运行——主进程(main processes)和渲染进程(renderer processes)。

&emsp;&emsp;每个进程都是并发运行的，而且每个进程的内存和资源是相互独立的。

# 主进程
&emsp;&emsp;一个Electron应用只有一个主进程。

&emsp;&emsp;执行“electron .”命令后，会在package.json中“main”字段指定的文件作为主入口文件，运行该文件即为主进程。

&emsp;&emsp;主进程负责创建和管理BrowserWindow实例和各种应用程序事件。它还可以执行诸如注册全局快捷方式、创建菜单和对话框、响应自动更新等操作。主进程可以创建多个渲染进程。

&emsp;&emsp;主进程中提供了Element API的子集，以及所有nodejs模块。

# 渲染进程
&emsp;&emsp;在Electron中每个页面都有它自己的进程，叫做渲染进程。主进程通过实例化BrowserWindow，每个BrowserWindow实例都在它自己的渲染进程内返回一个web页面。当BrowserWindow实例销毁时，响应的渲染进程也会终止。

&emsp;&emsp;渲染进程负责运行应用程序的用户界面，即一个实例的网页webContents。渲染器中提供了所有DOM API，node.js API和Electron API的子集。

&emsp;&emsp;在窗口中包含webContents实例之前，实际上不会创建渲染器进程。一个窗口可以托管多个webview，每个webview都有自己的webContents实例和渲染器进程。

# Electron API
![electron api](https://github.com/staven630/blog/blob/master/assets/electron/electron-apis.png?raw=true)
&emsp;&emsp;上图可以看出Node.js API全局可用，而渲染进程只有DOM/Browser API可用。

# 进程间通信
### ipcMain和ipcRenderer模块
&emsp;&emsp;Electron使用IPC(interprocess communication)在进程间通信，与Chromium相同。IPC可以在渲染进程和主进程之间双向通信。IPC默认是异步的，但也有同步的API（如Node.js中的fs）。

* index.html
```html
<section class="controls">
  <button id="sync-message">Send IPC message to main</button>
  <button id="async-message">Use remote</button>
</section>
</body>
<script>
  require('./renderer.js')
</script>
```

* 主进程：main.js
```javascript
const { app, BrowserWindow, ipcMain } = require('electron')
let win = null

function createWindow() {
  ipcMain.on('sync-rtm', (event, args) => {
    console.log('ipcMain 接收sync事件: ', args)
    event.returnValue = 'staven'
  })

  ipcMain.on('async-rtm', (event, args) => {
    console.log('ipcMain 接收async事件: ', args)
    event.sender.send('async-mrr', '主进程 => 渲染进程:下响应async事件')
  })
}

app.on('ready', createWindow)
```

* 渲染进程：enderer.js
```javascript
const { ipcRenderer } = require('electron')

document.querySelector('#sync-rtm').addEventListener('click', () => {
  const result = ipcRenderer.sendSync('sync-rtm', '渲染进程 => 主进程:发送sync事件')
  console.log(result);
})

document.querySelector('#async-message').addEventListener('click', () => {
  ipcRenderer.send('async-rtm', '渲染进程 => 主进程:发送async事件')
})

ipcRenderer.on('async-mrr', (event, args) => {
  console.log('ipcRenderer 接收async事件: ')
})
```

&emsp;&emsp;主进程通过ipcMain.on('eventName', (event, args) => {})监听接收事件。

&emsp;&emsp;对于异步事件：渲染进程可以使用ipcRenderer.send(eventName, args)方法向主进程发送异步事件。主进程可以通过event.sender.send(eventName, args)向渲染进程发送事件。

&emsp;&emsp;对于同步事件：渲染进程可以使用ipcRenderer.sendSync(eventName, args)方法向主进程发送同步事件。主进程可以通过event.returnValue = args回应该同步事件。

&emsp;&emsp;ipcMain与ipcRenderer具有相似的特性。

### remote模块
&emsp;&emsp;Electron还提供了remote模块，使渲染进程中可以访问/使用主进程模块。

##### 在渲染进程中新建一个窗口：
```javascript
const { BrowserWindow } = require('electron').remote

let win = new BrowserWindow({
  width: 400,
  height: 300
})
win.loadURL('https://v.youku.com')
```

##### 在渲染进程中使用挂载在app上的方法
&emsp;&emsp;在渲染进程中使用electron.remote.app访问挂载在app上的方法。
* show-dialog.js
```javascript
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
* 主进程：main.js
```javascript
const { app } = require('electron')
const showDialog = require('./show-dialog')
app.showDialog = showDialog
```
* 渲染进程：renderer.js
```javascript
const { remote } = require('electron')

document.querySelector('#open-dialog').addEventListener('click', () => {
  remote.app.showDialog('staven')
})
// or
remote.require('./show-dialog')('staven')
```
&emsp;&emsp;通过remote对象，可以不用显示地发送进程间消息来进行通信。但实际上，调用远程对象的方法、函数或者通过远程构造函数创建一个新的对象，实际上都是在发送一个同步的进程间消息。

&emsp;&emsp;如果在主进程中进行CPU密集型工作，它将锁定所有渲染器进程。因此，CPU密集型任务应该在一个单独的进程中运行，而不是具有UI的现有渲染器。

### devtron模块
&emsp;&emsp;使用devtron模块，可以检测使用remote模块时发生的所有IPC调用。同步IPC调用可能具有性能缺陷性。

# 网络协议
&emsp;&emsp;Chromium IPC文档声明它是“named pipes”作为基础工具。named pipes允许比网络协议提供的更快，更安全的通信。
