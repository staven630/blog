# Rollup 简介
&emsp;&emsp;rollup.js 是 JavaScript 的 ES 模块打包器，允许使用现代ES模块系统，将其转换为CommonJS、AMD或UMD，以及包装在IIFE中。更适用于js类库的打包。

&emsp;&emsp;默认采用 ES 模块标准，可以使用 rollup-plugin-commonjs 插件来支持 Commonjs 标准。

# 常见配置选项
- input: 入口文件
- output.file: 输出文件
- output.name: 生成包名称
- output.format
  | 类型 | 说明                                           |
  | :--- | :--------------------------------------------- |
  | amd  | AMD模块，用于像 require.js 这样的模块加载器    |
  | cjs  | Commonjs，适用于 Node 和 Browserify、Webpack   |
  | es   | ES 模块                                        |
  | iife | 包装成IIFE, 具有自执行功能，适合script标签引用 |
  | umd  | amd,cjs 和 iife 一体                           |

# 支持Tree-sharking

&emsp;&emsp;Rollup可以静态分析代码，并删除未使用的函数或模块。

* person.js
```javascript
const members = ['张三', '李四', '王五']

const kids = ['小明', '小红', '小亮']

const getRandom = (start, end) => Math.floor(Math.random() * end) + start

const getMember = () => members[getRandom(0, members.length - 1)]
const getKid = () => kids[getRandom(0, kids.length - 1)]

export { members, kids, getMember, getKid }
```

* main.js
```javascript
import * as Person from './person'

const getName = () => console.log(`My name is ${Person.getMember()}`)

export default getName
```
&emsp;&emsp;打包后，
```javascript
'use strict';

const members = ['张三', '李四', '王五'];

const getRandom = (start, end) => Math.floor(Math.random() * end) + start;

const getMember = () => members[getRandom(0, members.length - 1)];

const getName = () => console.log(`My name is ${getMember()}`);

module.exports = getName;
```

# 解析第三方库
&emsp;&emsp;经常需要引入第三方库，如lodash-es

&emsp;&emsp;使用lodash-es取代person.js中getRandom方法。打包后的代码只是require('lodash-es')，并没有将lodash-es库打包到最终的代码中。
* person.js
```javascript
import { random } from 'lodash-es'

const members = ['张三', '李四', '王五']

const kids = ['小明', '小红', '小亮']

const getMember = () => members[random(0, members.length - 1)]
const getKid = () => kids[random(0, kids.length - 1)]

export default { members, kids, getMember, getKid }

```
&emsp;&emsp;[rollup-plugin-node-resolve](https://github.com/rollup/rollup-plugin-node-resolve)使用Nodejs节点分辨率算法定位modules，以便使用第三方模块node_modules。

```bash
npm i -D rollup-plugin-node-resolve
```
* rollup.config.js
```javascript
import pkg from './package.json'
import resolve from 'rollup-plugin-node-resolve'

export default {
  input: 'src/main.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs'
    },
    {
      file: pkg.module,
      format: 'es'
    },
    {
      file: pkg.browser,
      format: 'umd',
      name: 'ModuleName'
    }
  ],
  plugins: [
    resolve()
  ]
}
```

# 解析CommonJS模块

&emsp;&emsp;lodash-es采用了es模块，但npm上还有很多不支持es模块的包。比如使用将lodash-es改成lodash
* person.js
```
import random from 'lodash/random'

const members = ['张三', '李四', '王五']

const kids = ['小明', '小红', '小亮']

const getMember = () => members[random(0, members.length - 1)]
const getKid = () => kids[random(0, kids.length - 1)]

export default { members, kids, getMember, getKid }
```
&emsp;&emsp;rollup -c,发现Rollup无法解析CommonJS格式。这时，需要借助[rollup-plugin-commonjs](https://github.com/rollup/rollup-plugin-commonjs)

&emsp;&emsp;rollup-plugin-commonjs需要放在其他模块转换插件之前执行。

* rollup.config.js
```javascript
import commonjs from 'rollup-plugin-commonjs'

export default {
  plugins: [commonjs()]
}
```

# external

&emsp;&emsp;有时为了方便浏览器缓存，采用CDN引入第三方包。为避免再将其打包进文件，使用external排除其被打包。
```javascript
export default {
  external: ['lodash/random]
};
```

&emsp;&emsp;打包后生成的iife代码如下：
```javascript
var ModuleName = (function (random) {
	'use strict';

	random = random && random.hasOwnProperty('default') ? random['default'] : random;

	const members = ['张三', '李四', '王五'];

	const kids = ['小明', '小红', '小亮'];

	// const getRandom = (start, end) => Math.floor(Math.random() * end) + start

	const getMember = () => members[random(0, members.length - 1)];
	const getKid = () => kids[random(0, kids.length - 1)];

	var Person = { members, kids, getMember, getKid };

	const getName = () => console.log(`My name is ${Person.getMember()}`);

	return getName;

}(random));
```
&emsp;&emsp;形参中变量random是无法找到的，需要跟cdn引入的lodash库全局变量保持一致。因此，这种情况下导出umd和iife格式需要配置全局变量键值映射。
* rollup.config.js
```javascript
export default {
  output: [
    {
      file: pkg.browser,
      format: 'umd',
      name: 'ModuleName',
      globals: {
        'lodash/random': '_.random'
      }
    },
    {
      file: 'dist/index.iife.js',
      format: 'iife',
      name: 'ModuleName',
      globals: {
        'lodash/random': '_.random'
      }
    }
  ],
  external: [
    'lodash/random',
    ...Object.keys(pkg.dependencies),
    ...Object.keys(pkg.peerDependencies)
  ]
}
```
&emsp;&emsp;同理，output配置项中name表示的是当前库的全局变量名。

# [rollup-plugin-json: 转换 json](https://github.com/rollup/rollup-plugin-json)
```bash
npm i -D rollup-plugin-json
```

```javascript
import json from "rollup-plugin-json";
export default {
  plugins: [
    json()
  ]
};
```

# 编译js
- [rollup-plugin-babel](https://github.com/rollup/rollup-plugin-babel)：使用Babel编译ES 2015+代码

&emsp;&emsp;使用rollup-plugin-babel将您的ES 2015+代码转换为向后兼容的JavaScript版本

```bash
npm i -D @babel/core  @babel/preset-env rollup-plugin-babel babel-plugin-external-helpers
```
&emsp;&emsp;@babel/preset-env可以轻松地定位最小运行环境，不需要手动选择插件。{useBuiltIns: 'usage'} 仅为已使用的功能导入polyfill。

rollup.config.js:
```javascript
import babel from 'rollup-plugin-babel'
export default {
  plugins: [
    babel({
      babelrc: false,
      presets: [['@babel/preset-env', { modules: false }]],
      include: ['src/**'],
      exclude: ['node_modules/**'], // 避免转译第三方脚本
      // plugins: ['external-helpers', 'babel-plugin-transform-object-rest-spread'], 
      runtimeHelpers: true, // 用来开启transform-runtme
      comments: false  // 删除注释
    })
  ]
}
```
- [rollup-plugin-buble](https://github.com/rollup/rollup-plugin-buble):显示bundle文件大小
  
&emsp;&emsp;将 ES6+代码编译成 ES2015 标准。配合[rollup-plugin-async](https://github.com/leebyron/rollup-plugin-async)来支持async/await。

```bash
 npm i -D rollup-plugin-buble
```

```javascript
import buble from 'rollup-plugin-buble'
export default {
  plugins: [
    buble({
       objectAssign: 'Object.assign',
       exclude: ['node_modules/**']
    })
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
- [rollup-plugin-terser: 压缩 ES6](https://github.com/TrySound/rollup-plugin-terser)

```bash
npm i -D rollup-plugin-terser
```

```javascript
import {terser} from 'rollup-plugin-terser'
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

# [rollup-plugin-cpy](https://github.com/paulmelnikow/rollup-plugin-cpy)

```bash
npm i -D rollup-plugin-cpy
```

```javascript
import copy from 'rollup-plugin-cpy'

export default {
  plugins: [
    copy({
      files: ['src/*.png', '!src/goat.png'],
      dest: 'dist',
      options: {
        verbose: true
      }
    })
  ]
}
```

# rollup-plugin-typescript2
```bash
npm i -D rollup-plugin-typescript2 typescript
```
* rollup.config.js
```javascript
import typescript from 'rollup-plugin-typescript2'

export default {
  plugins: [
    typescript({
      typescript: require('typescript')
    })
  ]
}
```
* package.json
```json
{
	"scripts": {
		"build": "rollup -c && tsc",
		"build:watch": "rollup -cw",
	}
}
```


# [rollup-plugin-filesize](https://github.com/ritz078/rollup-plugin-filesize)
```bash
npm i -D rollup-plugin-filesize
```

```javascript
import filesize from 'rollup-plugin-filesize'

export default {
  plugins: [
    filesize()
  ]
}
```

# [rollup-plugin-istanbul](https://github.com/artberri/rollup-plugin-istanbul)

```bash
npm i -D rollup-plugin-istanbul
```

```javascript
import istanbul from 'rollup-plugin-istanbul';
```

# rollup-plugin-serve
```bash
npm install -D rollup-plugin-serve
```

```javascript

```


# rollup-watch
> npm i -D rollup-watch livereload npm-run-all

- package.json
```
"scripts": {
  "prebuild": "rimraf dist",
  "build": "rollup -c",
  "build:watch": "rollup -cw",
  "prepublishOnly": "npm run build"
  "reload": "livereload 'build/'",
  "watch": "npm-run-all --parallel reload build:watch"
},
```