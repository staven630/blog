## **this绑定时间**
&emsp;&emsp;js的this总是指向一个对象,而这个对象是基于函数运行时动态绑定的，并非函数声明时绑定。

----------
## **函数调用方式**

 1. 作为对象的方法调用
 2. 作为普通函数进行调用
 3. 作为构造器进行调用
 4. 通过apply()或call()方法进行调用

----------
## **函数参数**
&emsp;&emsp;所有函数调用都会传递两个隐式参数：arguments和this。
&emsp;&emsp;所谓隐式，也就意味着这些参数不会显示列在函数签名里，但是它们默默地传递给函数并存在于函数作用域内。在函数内部，它们可以像其他显式命名的参数一样使用。 
### arguments参数
&emsp;&emsp;arguments参数是传递给函数的所有参数的一个集合。该集合有一个length属性，其值是全部参数的个数，单个参数值可以像访问数组索引一样进行获取。
&emsp;&emsp;但要避免将arguments参数作为数组进行调用。可以利用Array.prototype.slice.call(arguments, 0)将arguments参数转换为数组;
### this参数
&emsp;&emsp;this参数引用了与该函数调用进行隐式关联的一个对象，被称之为函数上下文。

----------
## **this指向**
### 作为对象方法进行调用
&emsp;&emsp;当函数作为对象的方法被调用时，this指向该对象。该对象就成了函数上下文。
```
window.name = 'global';

var obj = {
	name: 'staven',
	getName: function () {
		return this.name;
	}
};
//作为对象方法调用
console.log(obj.getName());   //staven

```
### 作为普通函数进行调用
&emsp;&emsp;一种方式调用，函数的上下文时全局上下文——window对象。
```
window.name = 'global';

var obj = {
	name: 'staven',
	getName: function () {
		return this.name;
	}
};
//作为对象方法调用
console.log(obj.getName());   //staven
//将函数引用指针赋给getName变量
var getName = obj.getName;
//作为普通函数调用
console.log(getName());   //global
```
&emsp;&emsp;常见的一种情形是，函数中的某个函数内部的this指向的是全局对象。解决这种问题，可var that = this;内部函数使用that代替this。

### 作为构造器进行调用
&emsp;&emsp;将函数作为构造器进行调用，我们要在函数调用前使用new关键字。其上下文是新创建的对象实例。
&emsp;&emsp;造器调用时，如下特殊行为会发生：

 - 创建一个新的空对象
 - 传递给构造器的对象是this参数，从而成为构造器的函数上下文。
 - 如果没有显式的返回值，新创建的对象则作为构造器的返回值进行返回。
 
&emsp;&emsp;构造器的目的是要创建一个新对象并对其进行设置，然后将其作为构造器的返回值进行返回，是通过函数调用初始化创建新对象。
```
var Person = function () {
	this.name = "staven";
};

var obj = new Person();
console.log(obj.name);  //staven
```
&emsp;&emsp;如果构造器显式返回了一个对象，那么此次运算最终返回这个对象，而不是this。
```
var Person = function () {
	this.name = "staven";
	return {
		name: 'backedName'
	}
};

var obj = new Person();
console.log(obj.name);  //backedName
```
&emsp;&emsp;如果构造器不显式返回任何数据，或返回的非对象数据，就不会存在上述问题。
```
var Person = function () {
	this.name = "staven";
	return 'backedName';
};

var obj = new Person();
console.log(obj.name);  //staven
```
### apply()或call()方法进行调用
&emsp;&emsp;通过call或apply调用函数，被调用的函数的this指向第一个参数指向的this。上下文可设为任意值。每个函数都有apply()和call()方法，使用其中一个方法，都可以显示指定任何一个对象作为其函数上下文。
&emsp;&emsp;通过函数的apply()方法来调用函数，我们要给apply()传入两个参数：一个是作为函数上下文的对象，另外一个是作为函数参数所组成的数组。call()方法的使用方式类似，唯一不同的是，给函数传入的参数是一个参数列表，而不是单个数组。
&emsp;&emsp;当使用 call 或者 apply 的时候，如果我们传入的第一个参数为null，函数体内的 this 会指向默认的宿主对象。
```
var obj1 = {
	name: 'jsor',
	getName: function () {
		return this.name;
	}
};

var obj2 = {
	name: 'staven'
};

console.log(obj1.getName());        //jsor
console.log(obj1.getName.call(obj2));   //staven
```
