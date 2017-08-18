### prototype、constructor、[[Prototype]]
&emsp;&emsp;创建每个函数都有一个ptototype属性，这个属性是一个指针，指向一个对象，而这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法。

```
function Person(){}
Person.prototype.name = "staven";
Person.prototype.say = function(){
	console.log("My name is "+this.name);
}
var p = new Person();
p.say();  //My name is staven
var p1 = new Person();
console.log(p.say == p1.say);  //true
```
&emsp;&emsp;只要创建了一个函数，函数就会创建一个prototype属性指向函数的原型对象。原型对象可以让所有对象实例共享它所包含的属性和方法。

&emsp;&emsp;所有原型对象都会自动获得一个constructor（构造函数）属性，这个属性包含一个指向prototype属性所在函数的指针。通过这个constructor（构造函数），还可以继续为原型对象添加其他属性和方法。

&emsp;&emsp;通过构造函数创建的实例内部都包含一个指针[[Prototype]]，仅仅指向了prototype，这个连接存在于实例与构造函数的原型对象(而不是构造函数)之间，也就是说实例对象与构造函数没有直接关系。并且，实例并不包含属性与方法，实例之所以能够调用原型上的方法，是依赖于查找对象属性的过程来实现的。

&emsp;&emsp;虽然无法访问到[[Prototype]]，可以通过isPrototypeOf()方法来确定对象之间是否存在这种关系，如果[[Prototype]]指向调用该方法的对象的prototype，返回true。
```
console.log(Person.prototype.isPrototypeOf(p)); //true;
```
![原型解构图](http://img.blog.csdn.net/20170308230430956?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3RhdmVuY3Nkbg==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
&emsp;&emsp;每当代码读取某个对象属性时，首先从对象实例开始，如果找到给定名字属性，返回该值；如果没有找到，继续搜索指针指向的原型对象。虽然能通过实例访问原型中的值，但不能通过对象实例重写原型中的值。

&emsp;&emsp;当为对象实例添加一个属性时，这个属性就会屏蔽原型对象中保存的同名属性；换句话说，添加这个属性只会阻止我们访问原型中的那个属性，但不会修改那个属性。即使将这个属性设置为 null，也只会在实例中设置这个属性，而不会恢复其指向原型的连接。不过，使用 delete 操作符则可以完全删除实例属性，从而让我们能够重新访问原型中的属性。
```
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

&emsp;&emsp; for(x in xxx)既可以检测实例属性，也可以检测自定义属性。
```
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
```
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
```
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
```
Person.prototype = {
	name : "staven",
	say : function(){
		console.log("My name is "+this.name);
	}
};
```
&emsp;&emsp;此时constructor属性不再指向Person。尽管 instanceof操作符还能返回正确的结果，但通过 constructor 已经无法确定对象的类型了。
```
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
```
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
```
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
&emsp;&emsp;省略了为构造函数传递初始化参数，结果所有实例在默认情况下豆浆取得相同的属性值。
&emsp;&emsp;由于原型的属性共享，若在实力上添加一个同名的包含引用类型值得的属性，其他实例该属性也会被改变。
```
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
### 单体内置对象的方法扩展
```
Function.prototype.addMethod = function(name, fn){
    this.prototype[name] =  fn;
}
var method = function(){};
method.addMethod('checkName',function(){
    //验证姓名
    return this;
}).addMethod('checkEmail',function(){
    //验证邮箱
    return this;
}).addMethod('checkPassword',function(){
    //验证密码
    return this;
});
var m = new Method();
m.checkName();
```




