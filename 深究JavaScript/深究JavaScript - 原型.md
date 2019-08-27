### prototype、constructor、__proto__
&emsp;&emsp;prototype是站在构造函数的角度讨论原型对象的，用来实现基于原型的继承与属性的共享。__proto__是站在对象的角度讨论原型对象，构成原型链，同样用于实现基于原型的继承。
```js
function Person(){}
var p = new Person();
```
> Person.prototype

![Person.prototype](https://segmentfault.com/img/bV0n5e?w=391&h=408)

> Person.constructor

![Person.constructor](https://segmentfault.com/img/bV0n5n?w=289&h=40)

> p.prototype

![p.prototype](https://segmentfault.com/img/bV0n5v?w=178&h=35)

> p.constructor

![p.constructor](https://segmentfault.com/img/bV0n8b)

> p.__proto__

![p.__proto__](https://segmentfault.com/img/bV0n7y)


* 通过new构造函数实例化得到对象。
* prototype是构造函数的属性，而不是实例对象的属性，指向Person.prototype原型对象。
* 实例对象含有一个Constructor属性指向该对象的构造器。
* p对象有个__proto__内部属性指向Person.prototype。 
* p.__proto__、p.constructor.prototype、Person.prototype指向Person的原型对象


&emsp;&emsp;每个构造函数都有一个phototype属性(通过Function.prototype.bind方法构造出来的函数以及Object.create(null)例外，没有prototype属性)，这个属性是一个指针，指向一个包含特定类型的所有实例共享属性和方法的对象。通过prototype对象可以返回对象的原型对象的引用。

&emsp;&emsp;每个实例对象都有一个constructor属性指向prototype属性所在函数的指针。通过这个constructor（构造函数），还可以继续为原型对象添加其他属性和方法。  

&emsp;&emsp;每个实例对象都有一个内部属性[[prototype]]，在ES5之前没有标准的方法访问这个内置属性，但是大多数浏览器都支持通过__proto__指针来访问。__proto__指向实例该对象的构造器的原型对象(Object.prototype 这个对象是个例外，它的__proto__值为null)。这个连接存在于实例与构造函数的原型对象(而不是构造函数)之间，也就是说实例对象与构造函数没有直接关系。并且，实例并不包含属性与方法，实例之所以能够调用原型上的方法，是依赖于查找对象属性的过程来实现的。虽然无法访问到__proto__，可以通过isPrototypeOf()方法来确定对象之间是否存在这种关系，如果__proto__指向调用该方法的对象的prototype，返回true。      
```
console.log(Person.prototype.isPrototypeOf(p)); //true;
```
![原型解构图](https://segmentfault.com/img/bV0n4I)

&emsp;&emsp;每当代码读取某个对象属性时，首先从对象实例开始，如果找到给定名字属性，返回该值；如果没有找到，继续搜索指针指向的原型对象。虽然能通过实例访问原型中的值，但不能通过对象实例重写原型中的值。

&emsp;&emsp;当为对象实例添加一个属性时，这个属性就会屏蔽原型对象中保存的同名属性；换句话说，添加这个属性只会阻止我们访问原型中的那个属性，但不会修改那个属性。即使将这个属性设置为 null，也只会在实例中设置这个属性，而不会恢复其指向原型的连接。不过，使用 delete 操作符则可以完全删除实例属性，从而让我们能够重新访问原型中的属性。
```js
function Person(){}
Person.prototype.name = "staven";
Person.prototype.say = function(){
	console.log("My name is "+this.name);
}
var p = new Person();
p.name = "赫连小妖"
p.say();  //My name is 赫连小妖
delete p.name;
p.say();  //My name is staven
```
&emsp;&emsp;使用 hasOwnProperty()方法只在给定属性存在于对象实例中时，才会返回 true；可以检测一个属性是存在于实例中，还是存在于原型中。

&emsp;&emsp;for(x in xxx)既可以检测实例属性，也可以检测自定义属性。

&emsp;&emsp;hasOwnProperty()为true，属性存在在对象实例中；hasOwnProperty()为false，(x in xxx)为true，属性存在在对象的构造器原型中。
```js
function Person(){}
Person.prototype.name = "staven";
var p = new Person();
console.log(p.hasOwnProperty('name'));	//false
console.log(('name' in p));				//true
p.name = "赫连小妖";
console.log(p.hasOwnProperty('name'));	//true
console.log(('name' in p));				//true
```
&emsp;&emsp;ECMAScript 5 的 Object.keys()方法接收一个对象作为参数，返回一个包含所有可枚举属性的字符串数组。
```js
function Person(){}
Person.prototype.name = "staven";
Person.prototype.say = function(){};
console.log(Object.keys(Person.prototype));		//["name", "say"]
var p = new Person();
p.sex = 'man';
p.character = "handsome";
console.log(Object.keys(p));	//["sex", "character"]
```
&emsp;&emsp;无论它是否可枚举，都可以使用 Object.getOwnPropertyNames()方法。
```js
function Person(){}
Person.prototype.name = "staven";
Person.prototype.say = function(){};
console.log(Object.getOwnPropertyNames(Person.prototype));		//["constructor", "name", "say"]
var p = new Person();
p.sex = 'man';
p.character = "handsome";
console.log(Object.getOwnPropertyNames(p));	//["sex", "character"]
```
### 使用字面量赋值原型对象
```js
Person.prototype = {
	name : "staven",
	say : function(){
		console.log("My name is "+this.name);
	}
};
```
&emsp;&emsp;此时constructor属性不再指向Person。尽管 instanceof操作符还能返回正确的结果，但通过 constructor 已经无法确定对象的类型了。
```js
function Person(){}
Person.prototype = {
	name : "staven",
	say : function(){
		console.log("My name is "+this.name);
	}
};
var p = new Person();
console.log(p instanceof Object);		//true
console.log(p instanceof Person);		//true
console.log(p.constructor == Person);	//false
console.log(p.constructor == Object);	//true
```
&emsp;&emsp;不过可以重新设置constructor属性，确保通过该属性的原有性。
```js
function Person(){}
Person.prototype = {
	constructor : Person,
	name : "staven",
	say : function(){
		console.log("My name is "+this.name);
	}
};
```
### 原型的动态性
&emsp;&emsp;随时可以为原型添加属性和方法，并且能够立即在所有对象实例中反映出来，但是如果重写了整个原型对象，情况就不同了。调用构造函数时会为实例添加一个[[Prototype]]指针，把原型修改为另一个对象，就相当于切断了构造函数与最初原型之间的联系。
```js
function Person(){}
var p = new Person();
Person.prototype = {
	constructor : Person,
	name : "staven",
	say : function(){
		console.log("My name is "+this.name);
	}
};
p.say();	//Uncaught TypeError: p.say is not a function
```
### 原型对象的缺点
&emsp;&emsp;省略了为构造函数传递初始化参数，结果所有实例在默认情况下都将取得相同的属性值。
&emsp;&emsp;由于原型的属性共享，若在实例上添加一个同名的包含引用类型值得的属性，其他实例该属性也会被改变。
```js
function Person(){}
Person.prototype = {
	books:["html5","css3","js"]
}
var p1 = new Person();
var p2 = new Person();
p1.books.pop();
console.log(p1.books);		//["html5", "css3"]
console.log(p2.books);		//["html5", "css3"]
```
