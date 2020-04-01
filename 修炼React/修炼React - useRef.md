&emsp;&emsp;useRef 会在每次渲染时返回同一个 ref 对象，其.current属性被初始化为传入的参数(initialValue)。返回的ref对象在组件的整个生命周期内保持不变。
```jsx
const refContainer = useRef(initialValue);
```

&emsp;&emsp;当 ref 对象内容发生变化时，useRef 并不会通知你。变更 .current 属性不会引发组件重新渲染。

# ref与useCallback
&emsp;&emsp;获取DOM节点信息时：由于ref是一个对象时，useRef并不会把当前ref的值得变化通知给我们。

&emsp;&emsp;可以使用callback ref,每当ref被附加到另一个节点，React就会调用callback回调。
```jsx
function useClientRect() {
  const [rect, setRect] = useState(null);
  const ref = useCallback(node => {
    if (node !== null) {
      setRect(node.getBoundingClientRect());
    }
  }, []);
  return [rect, ref];
}


function MeasureExample() {
  const [rect, ref] = useClientRect();
  return (
    <>
      <h1 ref={ref}>Hello, world</h1>
      {rect !== null &&
        <h2>The above header is {Math.round(rect.height)}px tall</h2>
      }
    </>
  );
}
```

# 使用场景
### 对 DOM 节点的引用
```jsx
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` 指向已挂载到 DOM 上的文本输入元素
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```
&emsp;&emsp;无论节点如何改变，useRef的.current的属性都设置为相应的DOM节点。

### 模仿实例变量
&emsp;&emsp;useRef() Hook不仅可以用于DOM refs。「ref」 对象是一个 current 属性可变且可以容纳任意值的通用容器，类似于一个 class 的实例属性。
```jsx
function Timer() {
  const intervalRef = useRef();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      // ...
    });

    return () => {
      clearInterval(intervalRef.current);
    };
  });
}
```
### 保持一致性引用
```jsx
const Parent = () => {
  const bar = useMemo(() => [1, 2, 3], [])

  return (
    <Child data={bar} />
  )
}
```
&emsp;&emsp;不要只为了保持一致的引用就记忆一个值。如果需要根据prop或者state重新计算该值，那就可以使用 useMemo Hook。否则，可能会消耗更多内存。

&emsp;&emsp;这种情况下就可以使用useRef Hook,来完成对值得一致性引用。
```jsx
const Parent = () => {
  const { current: bar } = useRef([1, 2, 3])

  return (
    <Child data={bar} />
  )
}
```
