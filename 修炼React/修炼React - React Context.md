# Context
&emsp;&emsp;Context提供了一种在组件间共享数据的快捷方式，而不必显式地通过组件树逐层传递props。

```jsx
import React from 'react';

// 首先需要使用React.createContext创建context
const ThemeContext = React.createContext('dark')

function Toolbar() {
  return (
    <ThemeButton />
  )
}

class ThemeButton extends React.Component {
  // 指定contextType读取当前theme context
  // React会往上找到最近的theme provider，this.context指向Context.Provider的value值
  static contextType = ThemeContext
  render() {
    return (
      <div>
        {this.context}
      </div>
    )
  }
}

function App() {
  return (
    // 使用Context.Provider将'dark'传递给以下组件树
    <ThemeContext.Provider value='dark'>
      <Toolbar />
    </ThemeContext.Provider>
  )
}

export default App
```
# 创建context
&emsp;&emsp;React.createContext(defaultValue)
```jsx
const ThemeContext = React.createContext(defaultValue)
```
&emsp;&emsp;创建一个Context对象。当React渲染一个订阅了这个Context对象组件，这个组件会从组件树中离自身最近的那个匹配的Provider中读取到当前的context值。

&emsp;&emsp;当组件所处的树中没有匹配到Provider时，其defaultValue参数才会生效。将undefined传递给defaultValue时，defaultValue不会生效。

# 提供共享数据
&emsp;&emsp;Context.Provider
```jsx
<ThemeContext.Provider value={/*  */} />
```
&emsp;&emsp;多个Provider可以嵌套使用，里层会覆盖外层数据。

&emsp;&emsp;当Provider的value值发生变化时，它内部的所有消费组件都会重新渲染。Provider及其内容的consumer组件都不会受制于shouldComponentUpdate函数，因此当consumer组件在其祖先组件退出更新的情况下也能更新。

&emsp;&emsp;通过新旧值检测确定变化，使用了与Object.is相同的算法。

# 订阅数据
### 使用contextType订阅数据
* Class.contextType

&emsp;&emsp;挂载在class上的contextType属性会被重赋值为一个有React.createContext()创建的Context对象。这样可以使用this.context引用最近的Context上的值。可以在生命周期、render函数中使用。
```jsx
class ThemeButton extends Component {
  render() {
    let theme = this.context
  }  
}

ThemeButton.contextType = ThemeContext
```
* static contextType

&emsp;&emsp;可以使用static这个属性来初始化contextType。
```jsx
class ThemeButton extends Component {
  static contextType = ThemeContext
  render() {
    let value = this.context
  }  
}
```
### 使用Context.consumer函数式组件订阅数据
&emsp;&emsp;Context.consumer中可以使用函数式组件订阅context值。
```jsx
class ThemeButton extends React.Component {
  render() {
    return (
      <div>
        <ThemeContext.Consumer>
          {value => (
            <p>{value}</p>
          )}
        </ThemeContext.Consumer>
      </div>
    )
  }
}
```

