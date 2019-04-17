# 简介
&emsp;&emsp;Hooks的使用就是为了不适用class来实现组件。


# useState
&emsp;&emsp;useState()接收一个参数作为state的初始值，返回一个长度为2的数组，第一项是state的值，第二项是更新state的函数。
```
import { useState } from 'react'

const Counter = () => {
  const [count, setCount] = useState(0)

  return (
    <div>
      <div>{count}</div>
      <button onClick={() => setCount(count + 1)}> + 1</button>
      <button onClick={() => setCount(count - 1)}> - 1</button>
    </div>
  )
}
```

# useEffect
&emsp;&emsp;useEffect()接收一个函数作为参数，组件每次渲染都会执行这个函数，同时实现了componentDidMount 和 componentDidUpdate更新副作用效果。
```
import { useState, useEffect } from 'react'

const Counter = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.title = `Count: ${count}`
  })

  return (
    <div>
      <div>{count}</div>
      <button onClick={() => setCount(count + 1)}> + 1</button>
      <button onClick={() => setCount(count - 1)}> - 1</button>
    </div>
  )
}
```
&emsp;&emsp;useEffect()还可以接收两个参数。当两次调用，第二个参数不同时，第一个参数函数才会被调用。如果将第二个参数设为固定值，就只实现了componentDidMount更新副作用效果。

##### 只模拟componentDidMount

&emsp;&emsp;虽然useEffect(fn, [])可以模拟componentDidMount，但是并不完全相等，useEffect会捕获props和state。即便在回调函数里，拿到的通常还是初始的props和state。如果想要拿到最新的值ref。不过，通常会有更简单的实现方式，所以不一定要用ref。Effects的心智模型更接近于实现状态同步，而不是响应生命周期事件。
```
import { useState, useEffect } from 'react'

const Counter = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.title = `Count: ${count}`
  }, [])

  return (
    <div>
      <div>{count}</div>
      <button onClick={() => setCount(count + 1)}> + 1</button>
      <button onClick={() => setCount(count - 1)}> - 1</button>
    </div>
  )
}
```

##### 每次渲染都有自己的Effects和其独立的props和state
&emsp;&emsp;组件函数每次渲染都会被调用，但是每一次调用中拿到的state都是独立的，并且被赋予了当前渲染中的状态值。

&emsp;&emsp;每次渲染中state的值是常量，不会随着时间改变而改变。渲染输出会变是因为组件被一次次调用，effect函数都不同，每次渲染都有自己的props和state，state的值独立于其它渲染。

##### useEffect中使用async
&emsp;&emsp;async function声明用于定义一个返回 AsyncFunction 对象的异步函数。异步函数是指通过事件循环异步执行的函数，它会通过一个隐式的 Promise 返回其结果。

&emsp;&emsp;但是useEffect函数必须返回一个清理函数或者什么也不返回，不支持promises和useEffect(async () => {})。可以通过以下方式来使用async

```
const [data, setData] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    const result = await axios.get('http://demo.com/api');
    setData(result.data);
  };
  fetchData();
}, []);
```

&emsp;&emsp;副作用函数可以通过返回一个函数来指定如何回收副作用事件。
&emsp;&emsp;建议把不依赖props和state的函数提到组件外面，并且把哪些仅被effect使用的函数放到effect里面。如果这样做了以后，effect还是需要用到组件内的函数（包括props传进来的函数），可以在定义他们的地方用useCallback包一层。
&emsp;&emsp;effect函数在每一次渲染中都不相同。


# useContext
&emsp;&emsp;接收上下文对象，并返回当前上下文的值。