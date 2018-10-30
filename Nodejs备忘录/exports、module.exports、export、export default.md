### exports 与 module.exports
&emsp;&emsp;Nodejs采用Commonjs模块规范。每个文件就是一个模块，有自己的作用域。在文件里面的变量，函数、类都是私有的。每个模块内部，都有一个module属性代表当前模块，module也有个对外的接口属性exports。加载某个模块，就是加载改模块的module.exports属性。
* nodejs执行文件，会自动创建一个module对象，module对象有一个exports属性，初始值为{}
```
console.log(module.exports); // {}
console.log(exports); // {}
```
* exports 是指向的 module.exports 的引用,如果直接将exports指向一个值，就等于切断了与module.exports的引用关系
```
// util.js
exports.name = 'Staven';
exports = 'Hello';
console.log(module.exports); // { name: 'Staven' }
console.log(exports); // Hello
```
* 真正导出的是module.exports，require() 返回的是 module.exports
```
var util = require('./util');
console.log(util);  // { name: 'Staven' }
```

### export 与 export default
* 在一个文件或模块中，export、import可以使用多次，export default仅有一个
* export导出时，import导入需要使用{}包裹导出的对象; export default导出时，import可直接导入对象
* export能直接导出变量表达式，而export default不能

参考:
* [CommonJS规范](http://javascript.ruanyifeng.com/nodejs/module.html#toc0)
* [Module 的语法](http://es6.ruanyifeng.com/#docs/module)