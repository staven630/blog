&emsp;&emsp;Hook是React16.8中新增特性。它可以在不编写class的情况下使用state以及其他的React特性。

# 解决的问题
### 解决组件之间难以复用状态逻辑
&emsp;&emsp;可以使用Hook从组件中提取状态逻辑，使得这些逻辑可以单独测试并复用。在无需修改组件结构的情况下复用状态逻辑。

&emsp;&emsp;在react hook之前，有两种主流方案来解决组件逻辑重用问题：高阶组件（HOC）、render props。

### 为无状态组件添加state
&emsp;&emsp;之前将function组件叫做“无状态组件”，引入react state能力后，将其成为“函数组件”。

# React Hook的使用规则
### 仅在函数最顶层调用Hook
* 不要在循环、条件或者嵌套函数内部调用。
* 请始终在React函数的顶层使用。通过遵循此规则，可以确保每次渲染组件时都以相同的顺序调用Hook。这就是让React在多个useState和useEffect调用之间正确保留Hook的状态的原因。

### 仅在React函数组件中调用Hook
* 不要在常规JavaScript函数中调用。
* 可以在自定义Hooks函数中调用。

# eslint-plugin-react-hooks
&emsp;&emsp;React核心团队提供了一个eslint插件：eslint-plugin-react-hooks
```bash
npm install -D eslint-plugin-react-hooks
```

> .eslintrc
```
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