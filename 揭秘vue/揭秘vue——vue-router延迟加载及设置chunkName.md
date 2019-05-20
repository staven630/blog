# 原理

&emsp;&emsp;借助 webpack 的[code splitting](https://webpack.js.org/guides/code-splitting/)以及[Dynamic import()](https://developers.google.com/web/updates/2017/11/dynamic-import)原理，可以轻松实现 vue 中组件的延迟加载，减小初始化包的大小。

# 视图目录

&emsp;&emsp;视图组件存放在 views 目录

# 定义路由

&emsp;&emsp; 在 import()函数中通过添加注释来使用 webpack 生成打包后的 chunk 名称。[request]表示将根据后面传入的字符串来生成 chunk 名称。

```
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
function loadView(view) {
  return () => import(/* webpackChunkName: "[request]" */ `@/views/${view}`)
}
const routes = [
  {
    path: '/',
    redirect: 'home'
  },
  {
    path: '/home',
    component: loadView('home')
  }
]
const router = new Router({
  mode: 'history',
  routes
})
export default router
```

# 解决 eslint 无法识别 import()

&emsp;&emsp;修改.eslintrc.js，添加'eslint:recommended'

```
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard', 'eslint:recommended'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
```
