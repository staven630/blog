# 宏任务（Macrotask）
* 浏览器中：I/O、setTimeout、setInterval、requestAnimationFrame
* Node中： I/O、setTimeout、setInterval、setImmediate

# 微任务（Microtask）
* 浏览器中：MutationObserver、Promise.then/.catch/.finally 
* Node中： process.nextTick 、Promise.then/.catch/.finally 

# 微任务与宏任务执行顺序
![Event Loop](https://raw.githubusercontent.com/staven630/blog/master/assets/images/event-loop.png)

&emsp;&emsp;JavaScript是单线程的，常用的任务分为同步任务和异步任务。在每轮事件循环中，主线程会先执行完同步任务，再执行异步任务。

&emsp;&emsp;整体JavaScript代码将作为一个宏任务执行，先将同步任务进入主线程执行，异步任务进入事件(Event Table)并注册回调函数(如:success、then、catch等)。当异步事件完成，回调函数进入事件队列等待被调用。而来自不同任务源的任务会进入不同的任务队列。其中setTimeout与setInterval是同源的。

&emsp;&emsp;js引擎Monitoring Process进程会不断的检查主线程执行栈是否为空，一旦为空，就会检查事件队列中是否有等待被调用的函数，如果有，主线程将依次读取回调函数并调用。否则执行下一轮事件循环。

&emsp;&emsp;在每轮事件循环中微任务队列的优先级高于宏任务队列。微任务队列中排队的所有微任务都在同一周期内处理，而这些微任务本身也可以将其他微任务添加到微任务队列中中执行，只有这些微任务全部执行完成时，才会执行下一个宏任务。

&emsp;&emsp;new Promise()在实例化的过程中所执行的代码都是同步执行的，而.then、.catch 和 .finally都是异步执行的。

```
console.log('script start');  // 同步

setTimeout(function () {
  console.log('setTimeout1');  // 异步
}, 300);

setTimeout(function () {
  console.log('setTimeout2');  // 异步
}, 0);

new Promise(resolve => {
  resolve()
  console.log('promise1');  // 同步
}).then(() => {
  console.log('promise2');  // 异步
})

console.log('script end');  // 同步


// script start
// promise1
// script end
// promise2
// setTimeout2
// setTimeout1
```

&emsp;&emsp;在微任务中注册新的微任务，其执行依然会在宏任务之前执行。
```
setTimeout(function () {
  console.log('setTimeout');
}, 0);

new Promise(resolve => {
  resolve()
  console.log('promise1');
}).then(() => {
  console.log('promise2');
  new Promise(resolve1 => {
    resolve1()
    console.log('promise3');
  }).then(() => {
    console.log('promise4');
  })
})
```
```
// promise1
// promise2
// promise3
// promise4
// setTimeout
```
&emsp;&emsp;process.nextTick()先于Promise.then()执行, setTimeout()与setImmediate()执行顺序取决于setTimeout的执行周期与设备性能。
```
console.log('golbol');

setTimeout(function () {
  console.log('timeout1');
  process.nextTick(function () {
    console.log('timeout1_process');
  })
  new Promise(function (resolve) {
    console.log('timeout1_promise');
    resolve();
  }).then(function () {
    console.log('timeout1_then')
  })
})

setImmediate(function () {
  console.log('immediate1');
  process.nextTick(function () {
    console.log('immediate1_process');
  })
  new Promise(function (resolve) {
    console.log('immediate1_promise');
    resolve();
  }).then(function () {
    console.log('immediate1_then')
  })
})

process.nextTick(function () {
  console.log('process1');
})
new Promise(function (resolve) {
  console.log('promise1');
  resolve();
}).then(function () {
  console.log('promise1_then')
})

setTimeout(function () {
  console.log('timeout2');
  process.nextTick(function () {
    console.log('timeout2_process');
  })
  new Promise(function (resolve) {
    console.log('timeout2_promise');
    resolve();
  }).then(function () {
    console.log('timeout2_then')
  })
})

process.nextTick(function () {
  console.log('process2');
})
new Promise(function (resolve) {
  console.log('promise2');
  resolve();
}).then(function () {
  console.log('promise2_then')
})

setImmediate(function () {
  console.log('immediate2');
  process.nextTick(function () {
    console.log('immediate2_process');
  })
  new Promise(function (resolve) {
    console.log('immediate2_promise');
    resolve();
  }).then(function () {
    console.log('immediate2_then')
  })
})
```
* 整体代码作为宏任务执行：
  
| 宏任务代码 | 微任务队列 |
| :--------- | :--------- |
| 整体代码   |            |

  1. 输出：global
  2. 将setTimeout标记为timeout1添加到宏任务队列中
  3. 将setImmediate标记为immediate1添加到宏任务队列中
  4. 将process标记为process1添加到微任务队列中
  5. 输出：promise1。将promise标记为promise1添加到微任务队里
  6. 将setTimeout标记为timeout2添加到宏任务队列中
  7. 将process标记为process2添加到微任务队列中
  8. 输出：promise2。将promise标记为promise2添加到微任务队里
  9. 将setImmediate2标记为immediate2添加到宏任务队列中

```
global、promise1、promise2
```   

| 宏任务队列             | 微任务队列         |
| :--------------------- | :----------------- |
| timeout1、timeout2     | process1、process2 |
| immediate1、immediate2 | promise1、promise2 |

&emsp;&emsp;主进程事件执行完，执行微任务队列，process.nextTick比promise.then先执行
```
process1、process2、promise1_then、promise2_then
```   
* 执行setTimeout宏任务队列
  
| 宏任务队列             | 微任务队列 |
| :--------------------- | :--------- |
| timeout1、timeout2     |            |
| immediate1、immediate2 |            |

&emsp;&emsp;分别执行宏任务队列setTimeout任务源
  1. 输出：timeout1
  2. 将process标记为timeout1_process添加到微任务队列中
  3. 输出：timeout1_promise。将promise标记为timeout1_then添加到微任务队里
  4. 输出：timeout2
  5. 将process标记为timeout2_process添加到微任务队列中
  6. 输出：timeout2_promise。将promise标记为timeout2_then添加到微任务队里

```
timeout1、timeout1_promise、timeout2、timeout2_promise
```
&emsp;&emsp;主进程事件执行完，执行微任务队列

| 宏任务队列             | 微任务队列                         |
| :--------------------- | :--------------------------------- |
|                        | timeout1_process、timeout2_process |
| immediate1、immediate2 | timeout1_then、timeout2_then       |

&emsp;&emsp;执行微任务队列：
```
timeout1_process、timeout2_process、timeout1_then、timeout2_then
```

* 执行setImmediate宏任务队列

| 宏任务队列             | 微任务队列 |
| :--------------------- | :--------- |
| immediate1、immediate2 |            |


&emsp;&emsp;分别执行宏任务队列setImmediate任务源
  1. 输出：immediate1
  2. 将process标记为immediate1_process添加到微任务队列中
  3. 输出：immediate1_promise。将immediate标记为immediate1_then添加到微任务队里
  4. 输出：immediate2
  5. 将process标记为immediate2_process添加到微任务队列中
  6. 输出：immediate2_promise。将promise标记为immediate2_then添加到微任务队里

```
immediate1、immediate1_promise、immediate2、immediate2_promise
```
&emsp;&emsp;主进程事件执行完，执行微任务队列

| 宏任务队列 | 微任务队列                             |
| :--------- | :------------------------------------- |
|            | immediate1_process、immediate2_process |
|            | immediate1_then、 immediate2_then      |

&emsp;&emsp;执行微任务队列：
```
immediate1_process、immediate2_process、immediate1_then、immediate2_then
```

整体输出
```
global、promise1、promise2、
process1、process2、promise1_then、promise2_then、
timeout1、timeout1_promise、timeout2、timeout2_promise、
timeout1_process、timeout2_process、timeout1_then、timeout2_then、
immediate1、immediate1_promise、immediate2、immediate2_promise、
immediate1_process、immediate2_process、immediate1_then、immediate2_then
```

# 模拟调用堆栈
```
let macrotask = []
let microtask = []
let call_stack = []

function setMicroTask(cb) {
  microtask.push(cb)
}

function setMacroTask(cb) {
  macrotask.push(cb)
}



global.setTimeout = function setTimeout(cb, time) {
  macrotask.push(cb)
}

function runHandler() {
  for (var i = 0; i < call_stack.length; i++) {
    eval(call_stack[i])
  }
}

function run(cb) {
  macrotask.push(cb)
  for (let i = 0; i < macrotask.length; i++) {
    eval(macrotask[i])()
    if (microtask.length != 0) {
      for (let j = 0; j < microtask.length; j++) {
        eval(microtask[j])()
      }
      microtask = []
    }
  }
}


call_stack.push(`console.log('script start');`)
call_stack.push(`setTimeout(function() {
  console.log('setTimeout');
}, 0);`)
call_stack.push(`setMicroTask(()=> {
  console.log('micro1')
  setMicroTask(()=> {
    console.log('micro2')
  })
})`)
call_stack.push(`console.log('script end');`)

run(runHandler)
```

```
call_stack.push(`console.log('script start');`)
call_stack.push(`setTimeout(function() {
  console.log('setTimeout');
}, 0);`)
call_stack.push(`setMicroTask(()=> {
  console.log('micro1')
  setMicroTask(()=> {
    console.log('micro2')
  })
})`)
call_stack.push(`console.log('script end');`)

run(runHandler)
```
```
script start
script end
micro1
micro2
setTimeout
```

# 未处理的rejection
&emsp;&emsp;"未处理的rejection"是指在微任务队列结束时未处理的promise错误。
```
let promise = Promise.reject(new Error('Promise Failed!'))

window.addEventListener('unhandledrejection', event => {
  alert(event.reason)
})

// Uncaught (in promise) Error: Promise Failed!
```
&emsp;&emsp;创建了一个rejected的promise并没有处理错误，所以会打印一个“未处理的 rejection”。添加.catch()就会解决。
```
let promise = Promise.reject(new Error('Promise Failed!'))
promise.catch(err => alert('caught'))

window.addEventListener('unhandledrejection', event => {
  alert(event.reason)
})

// caught
```