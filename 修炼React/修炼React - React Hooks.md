# 简介
&emsp;&emsp;Hooks的使用就是为了不编写class的情况下使用state以及其他react特性来实现组件。

# useState
```jsx
const [state, setState] = useState(initialState);
```

&emsp;&emsp;接收一个initialState初始值作为参数，返回一个长度为2的数组，第一项是state的值，第二项是更新state的函数。
```jsx
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

### 函数式更新
&emsp;&emsp;如果新的 state 需要通过使用先前的 state 计算得出，那么可以将函数传递给 setState。
```jsx
import { useState } from 'react'

const Counter = () => {
  const [count, setCount] = useState(0)

  return (
    <div>
      <button onClick={() => setCount(count => count + 1)}> + 1</button>
    </div>
  )
}
```
&emsp;&emsp;与class组件中的setState方法不同，useState不会自动合并更新对象。可以用函数式的setState结合展开运算符来达到合并更新对象的效果。
```jsx
setState(prevState => {
  // 也可以使用 Object.assign
  return {...prevState, ...values};
});
```
&emsp;&emsp;useReducer是另一种可选方案，它更适合用于管理包含多个子值的state对象。

### 惰性初始state
&emsp;&emsp;initialState 参数只会在组件的初始渲染中起作用，后续渲染时会被忽略。如果初始 state 需要通过复杂计算获得，则可以传入一个函数，在函数中计算并返回初始的 state，此函数只在初始渲染时被调用：
```jsx
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
});
```

# useEffect
&emsp;&emsp;useEffect()接收一个函数作为参数，组件每次渲染都会执行这个函数，同时实现了componentDidMount 和 componentDidUpdate更新副作用效果。
```jsx
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
```jsx
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

```jsx
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
```jsx
const MyContext = createContext();
const value = useContext(MyContext);
```

&emsp;&emsp;接收一个context对象(React.createContext的返回值)并返回该context的当前值。当前的context值由上层组件中距离当前组件最近的<MyContext.Provider>的value prop决定。

&emsp;&emsp;当组件上层最近的<MyContext.Provider>更新时,该Hook会触发重渲染，并使用最新传递给MyContext provider的context value值。
```jsx
import React, { createContext, useContext } from 'react'

type Theme = 'light' | 'dark'

const ThemeContext = createContext<Theme>('dark')

const MyComp = () => {
  const theme = useContext(ThemeContext)
  return <div>The theme is {theme}</div>
}

const MyApp = () => (
  <ThemeContext.Provider value="dark">
    <MyComp />
  </ThemeContext.Provider>
)
```

# useReducer

* CounterReducer.tsx
```jsx
export const initialState = {
  count: 0
}

export type State = typeof initialState

export enum TYPES {
  INCREMENT = 'INCREMENT',
  DECREMENT = 'DECREMENT',
  INCREMENT_AMOUNT = 'INCREMENT_AMOUNT'
}

export type Action =
  | { type: TYPES.INCREMENT }
  | { type: TYPES.DECREMENT }
  | { type: TYPES.INCREMENT_AMOUNT; amount: number }

export const counterReducer = (state: State, action: Action) => {
  switch (action.type) {
    case TYPES.INCREMENT:
      return state.count + 1
    case TYPES.DECREMENT:
      return state.count - 1
    case TYPES.INCREMENT_AMOUNT:
      return state.count + action.amount
    default:
      throw new Error()
  }
}
```
* Counter.tsx
```jsx
import React, { useReducer } from 'react'
import { counterReducer, TYPES, initialState } from './CounterReducer'

function Counter() {
  const [state, dispatch] = useReducer(counterReducer, initialState)
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: TYPES.INCREMENT })}>+</button>
      <button onClick={() => dispatch({ type: TYPES.DECREMENT })}>-</button>
    </>
  )
}

export default Counter
```

# useCallback
&emsp;&emsp;根据回调函数及其依赖项数组返回回调函数的memoized版本。该回调函数仅在某个依赖项改变时才会更新。

&emsp;&emsp;useCallback(dn, deps)相当于useDMemo(() => fn, deps)
```jsx
const value = 10;
const result = useCallback(() => value * 2, [value]);
```

# useMemo
&emsp;&emsp;将回调函数和依赖数组作为参数，返回仅在某个依赖项改变时才会重新计算memoized值。有助于优化每次渲染时都会进行高开销的计算。

&emsp;&emsp;传入useMemo的回调函数会在渲染期间执行。不要在这个函数内部执行与渲染无关的操作。

&emsp;&emsp;如果没有提供依赖数组，useMemo会在每次渲染时都会极端新的值。
```jsx
const value = 10;
const result = useMemo(() => value * 2, [value]);
```

# useRef
```jsx
const customRef = useRef(initialValue);
```

&emsp;&emsp;返回一个可变的ref对象，在组件的整个生命周期内保持不变。 其.current属性指挂载的Dom元素。

&emsp;&emsp;useRef会在每次渲染时都返回同一个ref对象。
```jsx
import React, { useRef } from 'react'

function FocusInput() {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <input type="text" ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>Focus Button</button>
    </>
  )
}
```

# useImperativeHandle
```jsx
useImperativeHandle(ref, createHandle, [deps])
```

&emsp;&emsp;在使用 ref 时自定义暴露给父组件的实例值。在大多数情况下，应当避免使用ref这样的命令式代码。useImperativeHandle应当与forwardRef一起使用

* FocusInput.tsx
```jsx
import React, {
  forwardRef,
  RefForwardingComponent,
  useRef,
  useImperativeHandle
} from 'react'

export interface InputHandles {
  focus(): void
}

export interface InputProps {
  [key: string]: any
}

const MyInput: RefForwardingComponent<InputHandles, InputProps> = (
  props,
  ref
) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useImperativeHandle(ref, () => ({
    focus: () => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }
  }))

  return <input {...props} ref={inputRef} />
}

export default forwardRef(MyInput)
```

* Input.tsx
```jsx
import React, { useRef, useEffect } from 'react'
import MyInput, { InputHandles } from './myInput'

const Input = () => {
  const myInputRef = useRef<InputHandles>(null)

  useEffect(() => {
    if (myInputRef.current) {
      myInputRef.current.focus()
    }
  })

  return <MyInput ref={myInputRef} />
}

export default Input
```

# useLayoutEffect

# useDebugValue
```jsxjsx
useDebugValue(value)
```

 &emsp;&emsp;useDebugValue用在React开发者工具中显示自定义hook的标签。

##### 延迟格式化debug值
&emsp;&emsp;useDebugValue 接受一个格式化函数作为可选的第二个参数，该函数只有在Hook被检查时才会被调用。它接受debug值作为参数，并且会返回一个格式化的显示值。
```jsx
useDebugValue(date, date => date.toDateString())
```

# Hook规则
### 只在最顶层使用Hook
&emsp;&emsp;不要在循环、条件或嵌套函数中调用Hook，确保总是在你的React函数的最顶层调用他们。遵守这条规则，你就能确保Hook在每一次渲染中都按照同样的顺序被调用。这让React能够在多次的useState和useEffect调用之间保持hook状态的正确。

### 只在React函数中调用Hook
&emsp;&emsp;不要在普通的JavaScript函数中调用Hook。
* ✅在React的函数组件中调用Hook
* ✅在自定义Hook中调用其他Hook
  
### eslint-plugin-react-hooks
```bash
npm install eslint-plugin-react-hooks --save-dev
```
.eslintrc
```json
{
  "plugins": [
    "react-hooks"
  ],
  "rules": {
    "react-hooks/rules-of-hooks": "error", // 检查 Hook 的规则
    "react-hooks/exhaustive-deps": "warn" // 检查 effect 的依赖
  }
}
```
