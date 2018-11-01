# Module
### 静态化
1、ES6模块的设计思想是尽量静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CMD和AMD模块，都只能在运行时确定这些东西。
2、CMD模块就是对象，输入时必须查找对象属性。
```
var http = require('http')
http.createServer(function(req, res) {});
```
&emsp;&emsp;要使用http.createServer得先整体加载http模块，称为“运行时加载”，导致无法再编译时做“静态优化”。
3、ES6模块不是对象

### 严格模式
&emsp;&emsp;ES6模块自动采用严格模式，无论有没有加“use strict”
* 变量必须声明后再使用
* 函数的参数不能有同名属性，否则报错
* 不能使用with语句
* 不能对只读属性赋值，否则报错
* 不能使用前缀 0 表示八进制数，否则报错
* 不能删除不可删除的属性，否则报错
* 不能删除变量delete prop，会报错，只能删除属性delete global[prop]
* eval不会在它的外层作用域引入变量
* eval和arguments不能被重新赋值
* arguments不会自动反映函数参数的变化
* 不能使用arguments.callee
* 不能使用arguments.caller
* 禁止this指向全局对象
* 不能使用fn.caller和fn.arguments获取函数调用的堆栈
* 增加了保留字（比如protected、static和interface）

### export
1、CMD模块输出的是值的缓存，不存在动态更新。通过export导出的接口，可以获取模块内部实时的值。
2、export可以卸载模块顶层的任何位置，但不可以在块级作用域内。

### export default
1、指定模块的默认输出

### import
1、可以使用as关键字，将输入的变量重命名。
2、import输入的变量都是只读的。
3、import具有提升效果，会提升到模块的顶部，优先执行。
4、多次执行相同import操作，只执行一次。
5、使用* as 可以整体加载

### import()
1、import()函数可以用在任何地方，不仅仅是模块，非模块也可以使用。
2、import()返回一个Promise对象