# 初始化
```
npx -p @storybook/cli sb init
```
# 修改package.json
```
"storybook": "start-storybook -p 9001 -c .storybook",
"generate:storybook": "build-storybook -c .storybook -o blog-storybook"
```
# 修改.storybook
```
npm i -S @storybook/addon-centered @storybook/addon-console @storybook/addon-options @storybook/addon-storysource @storybook/addon-viewport @storybook/addons babel-plugin-transform-pug-html babel-preset-vue storybook-readme
```
### 修改.storybook/addons.js
```
// 记录对component的操作
import '@storybook/addon-actions/register';
import '@storybook/addon-links/register';
// 定制化设置storybook的标题、排版或超链接
import '@storybook/addon-options/register'


// 在storybook中查看component如何被使用
//import '@storybook/addon-storysource/register'
// 在storybook中显示README.md文件
// import 'storybook-readme/register'
// 方便切换不同actions大小
// import '@storybook/addon-viewport/register'
```
### 修改.storybook/config.js
```
import { configure } from '@storybook/vue';
// import { setOptions } from '@storybook/addon-options';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// 加载样式
// import '!!style-loader!css-loader!stylus-loader!../assets/style/reset.styl'
// import '!!style-loader!css-loader!stylus-loader!../assets/style/base.styl'

// @storybook/addon-options/register 基础设置
// setOptions({
// name: 'staven-nuxt-storybook',
// url: 'https://github.com/staven630',
// addonPanelInRight: true
// })

// automatically import all files ending in *.stories.js
const req = require.context('../components', true, /stories.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
```
### 添加.storybook/webpack.config.js
```
const path = require("path");

module.exports = {
  module: {
    rules: [
      {
        // addon-storysource设置
        test: /\.stories\.jsx?$/,
        loaders: [require.resolve('@storybook/addon-storysource/loader')],
        enforce: 'pre'
      },
      {
        // pug设置
        test: /\.pug$/,
        loader: 'pug-plain-loader'
      },
      {
      // stylus设置
        test: /\.styl(us)?$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'stylus-loader'
        ]
      }
    ]
  },
  resolve: {
    alias: {
   // nuxt预设alias：'@','@@','~'m'~~'
      '@': path.dirname(path.resolve(__dirname))
    }
  }
};
```
### 整合nuxt-link、no-ssr
&emsp;&emsp;在.storybook/config.js中添加
```
Vue.component('nuxt-link', {
  functional: true,
  render: function (createElement, context) {
    let allClass = {}
    let arrClass = context.data.staticClass
      ? context.data.staticClass.split(' ')
      : []
    arrClass.forEach(theClass => {
      allClass[theClass] = true
    })
    return createElement('a', { class: allClass }, context.children)
  }
})
Vue.component('no-ssr', {
  functional: true,
  render (createElement, context) {
    return context.children
  }
})
```