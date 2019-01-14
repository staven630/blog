### 适用场景

| 方法                     | node | es6 |
| :----------------------- | :--- | --- |
| require                  | √    | √   |
| module.exports / exports | √    | ×   |
| export / import          | ×    | √   |

### exports 与 module.exports

&emsp;&emsp;Nodejs 采用 Commonjs 模块规范。每个文件就是一个模块，有自己的作用域。在文件里面的变量，函数、类都是私有的。

&emsp;&emsp;每个模块内部，都有一个 module 属性代表当前模块，module 也有个对外的接口属性 exports。加载某个模块，就是加载改模块的 module.exports 属性。

&emsp;&emsp;nodejs 执行文件，会自动创建一个 module 对象，module 对象有一个 exports 属性，初始值为{}。

```
console.log(module.exports); // {}
console.log(exports); // {}
```

&emsp;&emsp;exports 是指向的 module.exports 的引用,如果直接将 exports 指向一个值，就等于切断了与 module.exports 的引用关系

```
// util.js
exports.name = 'Staven';
exports = 'Hello';
console.log(module.exports); // { name: 'Staven' }
console.log(exports); // Hello
```

&emsp;&emsp;每个文件模块真正是通过 module.exports 导出的模块信息的, 而 require() 返回的是 module.exports

```
var util = require('./util');
console.log(util);  // { name: 'Staven' }
```

### export 与 export default

&emsp;&emsp;在一个文件或模块中，export、import 可以使用多次，export default 仅有一个。

&emsp;&emsp;export 导出时，import 导入需要使用{}包裹导出的对象; export default 导出时，import 可直接导入对象

&emsp;&emsp;export 能直接导出变量表达式，而 export default 不能

参考:

- [CommonJS 规范](http://javascript.ruanyifeng.com/nodejs/module.html#toc0)
- [Module 的语法](http://es6.ruanyifeng.com/#docs/module)
