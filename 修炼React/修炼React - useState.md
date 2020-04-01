> const [state, setstate] = useState(initialState)

&emsp;&emsp;在函数组件内部调用useState，会给函数组件添加一些内部state。React会在重复渲染时保留这个state。

# 参数
```ts
function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];

function useState<S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>];
```
&emsp;&emsp;有两种重载形式：
* 接受一个初始值、或者一个返回初始值的函数
* 不带任何参数

# 返回值
&emsp;&emsp;useState会返回一个有两个值的数组：
* 第一个值是当前state值xxx
* 第二个值是更新state的函数setXXX。setXXX类似于class组件的this.setState，但是不会把新的state和旧的state进行合并。

```jsx
function Example() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>{count} time</p>
      <button onClick={() => setCount(count + 1)}>Click me!!!</button>
    </div>
  )
}
```

# 声明多个变量
&emsp;&emsp;通过数组解构语法，可以解构出不同名称的变量和方法，可以多次使用useState()添加多个内部状态。
```jsx
function Example() {
  // 声明多个state变量
  const [count, setCount] = useState(0)
  const [time, setTime] = useState(0)

  return (
    <div></div>
  )
}
```

# 使用typescript注意项
### 对state类型约束
&emsp;&emsp;可以通过useState<S\>这样提供泛型约束，来限制state类型。
```typescript
const Color: React.FC = () => {
  const [color, setColor] = useState<'red' | 'blue'>()
  return (
    <div>
      <button onClick={() => setColor('red')}>Red Color</button>
      <button onClick={() => setColor('blue')}>Blue Color</button>
      {/* 类型“green"的参数不能赋给类型“SetStateAction<"red" | "blue" | undefined>”的参数。ts(2345)
      <button onClick={() => setColor('green')}>Green Color</button> */}
      <span style={{ backgroundColor: color }}>You chose {color} Color</span>
    </div>
  )
}
```

### state操作容错处理
&emsp;&emsp;如果useState()没有初始值，可能返回undefined，应该对state进行操作可能会报错，需要先做容错处理。
```ts
const Color: React.FC = () => {
  const [color, setColor] = useState<'red' | 'blue'>()
  return (
    <div>
      <button onClick={() => setColor('red')}>Red Color</button>
      <button onClick={() => setColor('blue')}>Blue Color</button>
      {/* color可能为undefined
      <span style={{ backgroundColor: color }}>
        You chose {color.toLowerCase()} Color
      </span> */}
      {color && (
        <span style={{ backgroundColor: color }}>
          You chose {color.toLowerCase()} Color
        </span>
      )}
    </div>
  )
}
```

### useState清除状态
&emsp;&emsp;如果useState()具有初始值，操作过程中要想清空state的值，需要确保state类型可以是undefined。
```ts
const Color: React.FC = () => {
  // 根据类型推断state为string，不能为undefined
  // const [color, setColor] = useState('blue')
  const [color, setColor] = useState<'red' | 'blue' | undefined>('blue')
  return (
    <div>
      <button onClick={() => setColor('red')}>Red Color</button>
      <button onClick={() => setColor('blue')}>Blue Color</button>
      <button onClick={() => setColor(undefined)}>Blue Color</button>
      {color && (
        <span style={{ backgroundColor: color }}>
          You chose {color.toLowerCase()} Color
        </span>
      )}
    </div>
  )
}
```