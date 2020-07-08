&emsp;&emsp;首先生成vue项目：
```bash
vue create v-card
```
&emsp;&emsp;在components目录中新建自定义组件VCard.vue。
```vue
<template>
  <div style="text-align: center; font-family: sans-serif">
    <h1>{{title}}</h1>
    <p>{{name}}</p>
  </div>
</template>

<script>

export default {
  name: 'VCard',
  props: {
    title: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  },
  components: {
  }
}
</script>
```
&emsp;&emsp;修改main.js
```js
import wrap from '@vue/web-component-wrapper';
import Vue from 'vue';

import VCard from './components/VCard.vue';


const wrappedElement = wrap(Vue, VCard);

window.customElements.define('v-card', wrappedElement);
```
&emsp;&emsp;执行命令，生成web components组件。
```bash
npm run build -- --target wc --name v-card src/components/VCard.vue
``` 
&emsp;&emsp;\<style\>样式将会注入build之后的web components组件，但开发环境并不会生效。解决这个问题需要修改vue.config.js。参见：[Styling not applied to vue web component during development
](https://stackoverflow.com/questions/53431754/styling-not-applied-to-vue-web-component-during-development)
> vue.config.js

```js
var webpackConfig = require("@vue/cli-service/webpack.config");


function enableShadowCss(config) {
  const configs = [
    config.module.rule('vue').use('vue-loader'),
    config.module.rule('css').oneOf('vue-modules').use('vue-style-loader'),
    config.module.rule('css').oneOf('vue').use('vue-style-loader'),
    config.module.rule('css').oneOf('normal-modules').use('vue-style-loader'),
    config.module.rule('css').oneOf('normal').use('vue-style-loader'),
    config.module.rule('postcss').oneOf('vue-modules').use('vue-style-loader'),
    config.module.rule('postcss').oneOf('vue').use('vue-style-loader'),
    config.module.rule('postcss').oneOf('normal-modules').use('vue-style-loader'),
    config.module.rule('postcss').oneOf('normal').use('vue-style-loader'),
    config.module.rule('scss').oneOf('vue-modules').use('vue-style-loader'),
    config.module.rule('scss').oneOf('vue').use('vue-style-loader'),
    config.module.rule('scss').oneOf('normal-modules').use('vue-style-loader'),
    config.module.rule('scss').oneOf('normal').use('vue-style-loader'),
    config.module.rule('sass').oneOf('vue-modules').use('vue-style-loader'),
    config.module.rule('sass').oneOf('vue').use('vue-style-loader'),
    config.module.rule('sass').oneOf('normal-modules').use('vue-style-loader'),
    config.module.rule('sass').oneOf('normal').use('vue-style-loader'),
    config.module.rule('less').oneOf('vue-modules').use('vue-style-loader'),
    config.module.rule('less').oneOf('vue').use('vue-style-loader'),
    config.module.rule('less').oneOf('normal-modules').use('vue-style-loader'),
    config.module.rule('less').oneOf('normal').use('vue-style-loader'),
    config.module.rule('stylus').oneOf('vue-modules').use('vue-style-loader'),
    config.module.rule('stylus').oneOf('vue').use('vue-style-loader'),
    config.module.rule('stylus').oneOf('normal-modules').use('vue-style-loader'),
    config.module.rule('stylus').oneOf('normal').use('vue-style-loader'),
  ];
  configs.forEach(c => c.tap(options => {
    options.shadowMode = true;
    return options;
  }));
}

module.exports = {
  chainWebpack: config => {
    enableShadowCss(config);
  }
}
```