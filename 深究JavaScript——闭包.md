###  概念
&emsp;&emsp;闭包是指能够引用外部函数中的局部变量的函数，并导致外部函数调用后函数对象与局部变量无法及时销毁。函数是JavaScript中唯一拥有自身作用域的结构，因此闭包的创建依赖于函数。
```
 var Foo = function() {
 	var name = 'staven';
 	this.getName = function() {
 		return name;
 	};
 };
 var foo = new Foo();
 console.log(foo.name); 			//undefined
 console.log(foo.getName()); 	//staven
```
 
### 闭包中的循环
&emsp;&emsp; 作用域链的这种配置机制引出了一个值得注意的副作用，即闭包只能取得包含函数中任何变量的最后一个值。
```
for(var i = 0; i < 10; i++) {
    setTimeout(function() {
        console.log(i);  //10次输出10
    }, 1000);
}
```
&emsp;&emsp;为了正确的获得循环序号，最好使用自执行匿名函数。
```
for(var i = 0; i < 10; i++) {
    (function(e) {
        setTimeout(function() {
            console.log(e);  
        }, 1000);
    })(i);
}
```
### 闭包中的this
&emsp;&emsp;匿名函数的执行环境具有全局性，因此其 this 对象通常指向 window（在通过 call()或 apply()改变函数执行环境的情况下， this 就会指向其他对象）。
```
var name = '全局';
var obj = {
	name: '局部',
	getName: function(){
	    var that = this;
		return function(){
			return that.name;
		}
	}
};
console.log(obj.getName()());   //局部
```
&emsp;&emsp;把外部作用域中的 this 对象保存在一个闭包能够访问到的变量里，就可以让闭包访问该对象了。
```
var name = "全局";
var obj = {
	name: "局部",
	getName: function() {
		var that = this;
		return function() {
			return that.name;
		};
	}
};
console.log(obj.getName()());  //"局部"
```
### 闭包的作用
##### 模拟块级作用域:
&emsp;&emsp;只要我们临时需要一些变量，都可以使用块级作用域（私有作用域）。当匿名函数执行完毕，其作用域链立即销毁，从而可以减少闭包占用资源问题。  
```
(function($, window, document, undefined){
	var name = "staven";
	$.fn.getName = function(){
		
	};
})(jQuery, window, document);
```
##### 在内存中保存变量:
&emsp;&emsp;缓存数据、柯里化

#####  模拟私有属性和私有方法:
```
//利用闭包实现
var Book = (function(){
	//静态私有变量
	var bookNum = 0;
	//静态私有方法
	function checkBook(name){
		console.log("checking Book……");
	}
	//创建类
	function _book(newId, newName, newPrice){
        if(this instanceof _book){
        	//私有变量
			var name, price;
			//私有方法
			function checkID(id){
				console.log("checking id……");
			}
			//特权方法
			this.getName = function(){};
			this.getPrice = function(){};
			this.setName = function(){};
			this.setPrice = function(){};
			//公有属性
			this.id = newId;
			//公有方法
			this.copy = function() {
				console.log("copying……")
			};
			bookNum++;
			if(bookNum > 100){
				throw new Error('我们仅出版100本书');
			}
			//构造器
			this.setName(name);
			this.setPrice(price);
        }else{
        	return new _book(newId, newName, newPrice);
        }
		
	}
	//构建原型
	_book.prototype = {
		//静态共有属性
		isJSBook:false,
		//静态共有方法
		show:function(){
			console.log("showing……");
		}
	};
	//返回类
	return _book;
})();
Book(21,'staven',23).show();		//showing……
Book(21,'staven',23).copy();		//copy……
var book = new Book(21,'staven',23);
book.show();	//showing……
book.copy();	//copying…… 
```
&emsp;&emsp;由于闭包会携带包含它的函数的作用域，因此会比其他函数占用更多的内存。过度使用闭包可能会导致内存占用过多，建议只在绝对必要时再考虑使用闭包。
