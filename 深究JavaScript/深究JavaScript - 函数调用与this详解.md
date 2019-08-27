# 概述
&emsp;&emsp;JavaScript的this总是指向一个对象,而这个对象是基于函数运行时动态绑定的，并非函数声明时绑定。

# 函数参数
&emsp;&emsp;所有函数调用都会传递两个隐式参数：arguments和this。

&emsp;&emsp;所谓隐式，也就意味着这些参数不会显示列在函数签名里，但是它们默默地传递给函数并存在于函数作用域内。在函数内部，它们可以像其他显式命名的参数一样使用。
 
### arguments参数
&emsp;&emsp;arguments参数是传递给函数的所有参数的一个集合。该集合有一个length属性，其值是全部参数的个数，单个参数值可以像访问数组索引一样进行获取。

&emsp;&emsp;但要避免将arguments参数作为数组进行调用。可以利用Array.prototype.slice.call(arguments, 0)将arguments参数转换为数组;

### this参数
&emsp;&emsp;this参数引用了与该函数调用进行隐式关联的一个对象，被称之为函数上下文。


# 函数调用方式
1. 作为普通函数进行调用
2. 作为对象的方法调用
3. 作为构造器进行调用
4. 通过apply()或call()方法进行调用

### 作为普通函数进行调用
&emsp;&emsp;作为普通函数调用，函数的上下文是当前全局上下文(浏览器中是window对象)。
```js
window.name = 'global'

function getName() {
    return this.name;
}

console.log(getName()) // 'global'
```
&emsp;&emsp;常见情形是，函数中的某个函数内部的this指向的是全局对象。解决方法：
* var that = this;内部函数使用that代替this
* 使用箭头函数

### 作为对象方法进行调用
&emsp;&emsp;当函数作为对象的方法被调用时，this指向该对象。该对象就成了函数上下文。
```js
window.name = 'global';

const obj = {
	name: 'staven',
	getName: function () {
		return this.name;
	}
};
//作为对象方法调用
console.log(obj.getName());   //staven
```

### 作为构造器进行调用
&emsp;&emsp;将函数作为构造器进行调用。其上下文是新创建的对象实例。

&emsp;&emsp;构造器调用时，如下特殊行为会发生：
 - 创建一个新的空对象
 - 传递给构造器的对象是this参数，从而成为构造器的函数上下文。
 - 如果没有显式定义返回值，则返回当前创建的对象实例作为返回值。
 
```js
const Person = function () {
	this.name = "staven";
};

var obj = new Person();
console.log(obj.name);  //staven
```
&emsp;&emsp;如果构造器显式返回了一个对象，那么此次运算最终返回这个对象，而不是this。
```js
const Person = function () {
	this.name = "staven";
	return {
		name: '赫连小妖'
	}
};

const obj = new Person();
console.log(obj.name);  // '赫连小妖'
```

### apply()或call()方法进行调用

&emsp;&emsp;通过call或apply调用函数，可以将this绑定成指定的值。

&emsp;&emsp;通过函数的apply()方法来调用函数，我们要给apply()传入两个参数：一个是作为函数上下文的对象，另外一个是作为函数参数所组成的数组。call()方法的使用方式类似，唯一不同的是，给函数传入的参数是一个参数列表，而不是单个数组。

&emsp;&emsp;当使用 call 或者 apply 的时候，如果我们传入的第一个参数为null，函数体内的 this 会指向默认的宿主对象。
```js
const obj1 = {
	name: 'jsor',
	getName: function () {
		return this.name;
	}
};

const obj2 = {
	name: 'staven'
};

console.log(obj1.getName());        //jsor
console.log(obj1.getName.call(obj2));   //staven
```