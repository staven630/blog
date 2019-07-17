# Rollup 简介
&emsp;&emsp;rollup.js 是 JavaScript 的 ES 模块打包器，更适用于 js 类库的打包。
&emsp;&emsp;默认采用 ES 模块标准，可以使用 rollup-plugin-commonjs 插件来支持 Commonjs 标准。
# 常见配置选项
- input: 入口文件
- output.file: 输出文件
- output.name: 生成包名称
- output.format
  | 类型 | 说明                                             |
  | :--- | :----------------------------------------------- |
  | amd  | 异步模块定义，用于像 require.js 这样的模块加载器 |
  | cjs  | Commonjs，适用于 Node 和 Browserify、Webpack     |
  | es   | ES 模块文件                                      |
  | iife | 具有自执行功能，适合用 script 标签引用           |
  | umd  | amd,cjs 和 iife 一体                             |
# .eslintrc.json
> npm i -D rollup-plugin-eslint
> npx eslint --init
```
{
  "env": {
    "browser": true,
    "es6": true
  },
  "globals": {
    "ENV": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "sourceType": "module"
  },
  "rules": {
    "indent": ["error", 2],
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "single"]
  }
}
```
# 创建 rollup.config.js
```
export default {
  input: "src/main.js",
  output: {
    file: "dist/js/main.min.js",
    format: "umd",
    name: 'bundle-name'
  }
};
```
# 编译 js
- [rollup-plugin-babel](https://github.com/rollup/rollup-plugin-babel)
> npm i -D @babel/core rollup-plugin-babel@latest @babel/preset-env
```
import babel from 'rollup-plugin-babel'
export default {
  plugins: [
    babel({
      babelrc: false,
      presets: [['@babel/preset-env', { modules: false }]],
      include: ['src/**'],
      exclude: ['node_modules/**'], // 避免转译第三方脚本
      runtimeHelpers: true // 用来开启transform-runtme
    })
  ]
}
```
- [rollup-plugin-buble](https://github.com/rollup/rollup-plugin-buble)
&emsp;&emsp;将 ES6+代码编译成 ES2015 标准
> npm i -D rollup-plugin-buble
```
import buble from 'rollup-plugin-buble'
export default {
  plugins: [
    buble(
       objectAssign: 'Object.assign',
       exclude: ['node_modules/**']
     )
  ]
}
```
# 兼容 Commonjs
> npm i -D rollup-plugin-commonjs rollup-plugin-node-resolve
```
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
export default {
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    commonjs()
  ]
}
```
# [rollup-plugin-postcss:处理样式](https://github.com/egoist/rollup-plugin-postcss)
- 处理 css
> npm i -D rollup-plugin-postcss postcss-simple-vars postcss-nested postcss-cssnext cssnano
```
import postcss from 'rollup-plugin-postcss'
import simplevars from 'postcss-simple-vars'
import nested from 'postcss-nested'
import cssnext from 'postcss-cssnext'
import cssnano from 'cssnano'
export default {
  plugins: [
    postcss({
      plugins: [
        simplevars(),
        nested(),
        cssnext({ warnForDuplicates: false }),
        cssnano()
      ],
      extensions: ['.css']
    })
  ]
}
```
- 处理 scss
> npm i -D rollup-plugin-postcss postcss-scss autoprefixer postcss-base64
```
import postcss from 'rollup-plugin-postcss'
import scss from 'postcss-scss'
import autoprefixer from 'autoprefixer'
import base64 from 'postcss-base64'
export default {
  plugins: [
    postcss({
      extract: true,
      parser: scss,
      plugins: [
        base64({
          extensions: ['.png', '.jpeg'],
          root: './packages/',
        }),
        autoprefixer({ add: true }),
      ]
    })
  ]
}
```
# [rollup-plugin-url:处理图片](https://github.com/rollup/rollup-plugin-url)
> npm i -D rollup-plugin-url
```
import url from "rollup-plugin-url"
export default {
  entry: 'src/main.js',
  dest: 'dist/bundle.js',
  sourcemaps: true,
  plugins: [
    url({
      limit: 10 * 1024,
      include: ["**/*.svg"],
      emitFiles: true
    })
  ]
}
```
# [rollup-plugin-vue2:处理 vue](https://github.com/thgh/rollup-plugin-vue2)
> npm i -D rollup-plugin-vue2 rollup-plugin-css-only
```
import vue from 'rollup-plugin-vue2'
import css from 'rollup-plugin-css-only'
export default {
  entry: 'src/main.js',
  dest: 'dist/bundle.js',
  sourcemaps: true,
  plugins: [
    vue({
      compileTemplate: true,
      htmlMinifier: {
        customAttrSurround: [[/@/, new RegExp('')], [/:/, new RegExp('')]],
        collapseWhitespace: true,
        removeComments: true
      }
    }),
    css()
  ]
}
```
# [rollup-plugin-alias:提供别名](https://github.com/rollup/rollup-plugin-alias)
> npm i -D rollup-plugin-alias
```
import alias from 'rollup-plugin-alias'
export default {
  plugins: [
    alias({
      vue: 'vue/dist/vue.esm.js'
    })
  ]
}
```
# [rollup-plugin-json: 转换 json](https://github.com/rollup/rollup-plugin-json)
> npm i -D rollup-plugin-json
```
import json from "rollup-plugin-json";
export default {
  plugins: [
    json()
  ]
};
```
# [rollup-plugin-replace:设置环境变量](https://github.com/rollup/rollup-plugin-replace)
> npm i -D rollup-plugin-replace
```
import replace from 'rollup-plugin-replace'
const ENV = process.env.NODE_ENV
export default {
  plugins: [
    replace({
       exclude: 'node_modules/**',
      'process.env.NODE_ENV': JSON.stringify(ENV),
      ENV: JSON.stringify('development')
    })
  ]
}
```
# 压缩
- [rollup-plugin-uglify:压缩 ES5](https://github.com/TrySound/rollup-plugin-uglify):
&emsp;&emsp;uglify 插件不支持 ES 模块和 es6 语法，主要用来打包 es5 语法
> npm i -D rollup-plugin-uglify
```
import { uglify } from "rollup-plugin-uglify";
export default {
  plugins: [
     uglify()
  ]
};
```
- [rollup-plugin-terser: 压缩 ES6](https://github.com/TrySound/rollup-plugin-terser):
> npm i -D rollup-plugin-terser
```
import terser from 'rollup-plugin-terser'
export default {
  plugins: [
    terser({
      output: {
        ascii_only: true // 仅输出ascii字符
      },
      compress: {
        pure_funcs: ['console.log'] // 去掉console.log函数
      }
    })
  ]
};
```
# rollup-watch
> npm i -D rollup-watch livereload npm-run-all

- package.json
```
"scripts": {
  "dev": "rollup -c --watch",
  "reload": "livereload 'build/'",
  "watch": "npm-run-all --parallel reload dev"
},
```