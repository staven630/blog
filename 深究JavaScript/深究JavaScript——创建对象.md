# new实例对象的过程
* 创建新对象
```
var person = {};
```
* 将新对象的__proto__指针指向构造函数的原型对象
```
person.__proto__ = Person.prototype;
```
* 将构造函数的作用域复制给新对象(绑定this)
```
Person.call(person);
```
* 执行构造函数内部的代码，将属性添加给新对象
* 返回这个新对象