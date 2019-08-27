# 挂载阶段(Mounting)
### constructor
&emsp;&emsp;类组件，首先会调用constructor。
```jsx
class MyComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: props.value
    }
  }
}
```

&emsp;&emsp;常用于：
* 初始化state
* 创建refs
* 方法绑定

### getDerivedStateFromProps(props, state)
&emsp;&emsp;在渲染之前调用的最后一个方法。可以根据初始的props设置state,但推荐在constructor中初始化state。
```jsx
static getDerivedStateFromProps(props, state) {
  return { count: state.value }
}
```
&emsp;&emsp;setState调用，并不会调用这个函数。

&emsp;&emsp;无论父组件更新，还是props发生变化，这个函数都会被调用。

### render
&emsp;&emsp;返回组件jsx

### componentDidMount
&emsp;&emsp;在第一次渲染后，调用这个方法。

&emsp;&emsp;常用于：
* Ajax请求
* 添加事件侦听器


# 更新阶段(Updating)

### getDerivedStateFromProps(props, state)
&emsp;&emsp;如果需要根据props变化更新状态，可以通过返回新的state对象来实现。

### shouldComponentUpdate
&emsp;&emsp;总是返回一个布尔值。默认情况下，返回true。
```jsx
shouldComponentUpdate(nextProps, nextState) {
  return nextState.count !== nextProps.value
}
```

### render

### getSnapshotBeforeUpdate(prevProps, prevState)
&emsp;&emsp;基于props的变化，通过返回新的state来实现更新。

### componentDidUpdate
```jsx
componentDidUpdate（prevProps，prevState，snapshot）{ 
}
```

# 卸载阶段(Unmounting)
### componentWillUnmount


# 错误(Errors)
### getDerivedStateFromError

### componentDidCatch
&emsp;&emsp;在子组件中发生错误时被触发。

&emsp;&emsp;只适用于呈现生命周期方法中的错误。