# useState
```ts
function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];

function useState<S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>];
```

# 参数
&emsp;&emsp;有两种重载形式：
* 接受一个初始值、或者一个返回初始值的函数
* 不带任何参数

# 返回值
&emsp;&emsp;两种重载形式都返回一个元组。包含两个元素，分别表示state和改变state的函数。
* 如果没有提供任何初始值，那么返回值是
```ts
[S | undefined, Dispatch<SetStateAction<S | undefined>>]
```
* 如果提供了初始值，返回值是
```ts
[S, Dispatch<SetStateAction<S>>]
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
&emsp;&emsp;如果useState()具有初始值，要向清空state的值，需要确保state可以是undefined
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