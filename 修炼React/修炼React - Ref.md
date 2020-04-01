# 创建refs
&emsp;&emsp;创建ref有两种途径：

### 回调形式的refs
&emsp;&emsp;回调函数中接受React组件实例或HTML DOM元素作为参数，以使它们能在其他地方被存储和访问。
```jsx
import React from 'react'

export default class MyRef extends React.Component {

  constructor(props) {
    super(props);

    this.state = { value: '' }
    this.input = null;

    this.inputRef = e => {
      this.input = e;
    }
  }

  handleClick = () => {
    this.setState({
      value: this.input.value
    })
  }

  render() {
    return (
      <>
        <input ref={this.inputRef} />
        <p>{this.state.value}</p>
        <button onClick={this.handleClick}>Click Me!</button>
      </>
    )
  }
}
```

### React.createRef()
&emsp;&emsp;React16.3版本引入React.createRef()方法创建refs，并通过附加到React元素Ref属性上。

&emsp;&emsp;当ref被传递给render中的元素时，对该节点的引用可以在ref的 current属性中被访问。
* 当ref属性作用HTML元素，ref接收到的是DOM元素
* 当ref属性作用自定义元素，ref接收到的是组件的挂载实例
* 函数组件上不能使用ref属性，因为他们没有实例。如果要在函数组件上使用ref属性，可以借助forwardRef(可与useImperativeHandle结合使用)。但是可以在函数组件内部使用ref属性。
```jsx
import React from 'react'

export default class MyRef extends React.Component {

  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      value: ''
    }
  }

  handleClick = () => {
    this.setState({
      value: this.inputRef.current.value
    })
  }

  render() {
    return (
      <>
        <input ref={this.inputRef} />
        <p>{this.state.value}</p>
        <button onClick={this.handleClick}>Click Me!</button>
      </>
    )
  }

}
```

# React.forwardRef((props, ref) => ())

&emsp;&emsp;React.forwardRef可以将ref自动地通过组件传递到其一子组件的技巧。

&emsp;&emsp;不建议暴露 DOM 节点。
> Parent.js
```js
import React, { Component } from 'react'
import Child from './Child'

export default class Parent extends Component {
  constructor(props) {
    super(props);

    this.parentRef = React.createRef();
  }

  handleClick = () => {
    console.log(this.parentRef.current.value);
  }

  render() {
    return (
      <div>
        <Child ref={this.parentRef} />
        <button onClick={this.handleClick}>Click</button>
      </div>
    )
  }
}
```
> Child.js
```js
import React from 'react'

const Child = React.forwardRef((props, ref) => (
  <input ref={ref} />
))

export default Child;
```