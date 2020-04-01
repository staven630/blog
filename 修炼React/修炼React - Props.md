# Props
### 只读性
&emsp;&emsp;所有的React组件都必须像纯函数一样保护它们的props不被更改。

### super(props)
&emsp;&emsp;需要访问this.props,就需要在constructor()中将props传给super()方法。
* super()
```jsx
class MyComponent extends React.Component{
    constructor(props){
        super()
        console.log(this.props) // undefined
    }
}
```
* super(props)
```jsx
class MyComponent extends React.Component{
    constructor(props){
        super(props)
        console.log(this.props) // {name: 'staven', ... }
    }
}
```

# PropTypes
### 使用PropTypes进行类型检查
&emsp;&emsp;React内置了一些类型检查的功能。要在组件的props上进行类型检查，只需要配置特定的propTypes属性：
```jsx
import PropTypes from 'prop-types';

class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

Greeting.propTypes = {
  name: PropTypes.string
};
```
&emsp;&emsp;PropTypes提供一系列验证器，可用于确保组件接收到的数据类型是有效的。
```jsx
PropTypes.string
PropTypes.number
PropTypes.bool
PropTypes.symbol
PropTypes.object
PropTypes.array
PropTypes.func
// 任意类型的数据
PropTypes.any

// 任何可被渲染的元素（包括数字、字符串、元素、数组或Fragment）
PropTypes.node

// 一个React元素
PropTypes.element

// 一个React元素类型(即MyComponent)
PropTypes.elementType

// 指定prop为必填，属性后加上'isRequired'
PropTypes.func.isRequired

// 限制children只包含一个元素
PropTypes.element.children

PropTypes.instanceof(MyComponent)

// 指定特定值范围
PropTypes.oneOf(['news', 'blogs'])

// 一个对象可以是集中类型中的任意一个类型
PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
  PropTypes.instanceof(MyComponent)
])

// 指定数组只能是某种指定类型元素组成
PropTypes.arrayOf(PropTypes.number)
// 指定对象只能是某种指定类型元素组成
PropTypes.objectOf(PropTypes.number)

// 指定一个对象由特定的类型值组成
PropTypes.shape({
  color: PropTypes.string,
  fontSize: PropTypes.number
})

// 自定义验证器，验证失败时返回一个Error对象。
function(props, propName, componentName) {
  if (!/^\d+$/.test(props[propName])) {
    return new Error(`${propName}的值应为数字类型`);
  }
}
```

### 默认Prop值
&emsp;&emsp;通过配置defaultProps属性来定义props的默认值。
```jsx
class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

// 指定 props 的默认值：
Greeting.defaultProps = {
  name: 'Stranger'
};
```
&emsp;&emsp;也可以在React组件类中声明defaultProps作为静态属性。需要借助[transform-class-properties](https://babeljs.io/docs/en/babel-plugin-proposal-class-properties)的Babel转换工具。

```jsx
class Greeting extends React.Component {
  static defaultProps = {
    name: 'stranger'
  }

  render() {
    return (
      <div>Hello, {this.props.name}</div>
    )
  }
}
```
&emsp;&emsp;propTypes类型检查发生在defaultProps赋值后，所以类型检查也适用于defaultProps。