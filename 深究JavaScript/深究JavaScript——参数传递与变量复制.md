&emsp;&emsp; ECMAScript 变量可能包含两种不同数据类型的值：基本类型值和引用类型值。 基本类型值指的是简单的数据段，而引用类型值指那些可能由多个值构成的对象。

&emsp;&emsp;5 种基本数据类型： Undefined、 Null、 Boolean、 Number 和 String。这 5 种基本数据类型是按值访问的，因为可以操作保存在变量中的实际的值。ES6有多出一种Symbol类型。

&emsp;&emsp;引用类型的值是保存在内存中的对象，JavaScript 不允许直接访问内存中的位置，也就是说不能直接操作对象的内存空间。在操作对象时，实际上是在操作对象的引用而不是实际的对象。为此，引用类型的值是按引用访问的。

### 复制变量值
* 【复制变量值】复制基本类型变量的值，会在该变量对象上创建一个新值，然后把该值复制到新变量分配的位置上。任一变量值操作互不影响。
* 【复制引用指针】复制引用类型变量的值，同样会将存储在变量对象中的值复制一份放到新变量分配的空间中，不同的是这个值的副本实际上一个指针，而这个指针指向存储在堆中的一个对象。复制后，两个变量实际上将引用同一个对象。因此，改变任意变量，都会影响另一个变量。

### 参数传递
&emsp;&emsp;ECMAScript 中所有函数的参数都是按值传递的。访问变量有按值和按引用两种方式，而参数只能按值传递。
&emsp;&emsp;

* 基本类型参数传递：传给函数的是数值的一个复制，函数中对其的修改外部不可见。
```
var a = 1;
var b = 2;
function change(a, b) {
    var c = a;
    a = b;
    b = c;
    console.log(a);    //2
    console.log(b);    //1
}
change(a, b);
console.log(a);    //1
console.log(b);    //2
```
*  引用类型参数传递：传给函数的是数值的一个引用，函数中对其属性的修改外部可见，但用新引用覆盖其则在外部不可见
```
var a = [1, 2, 3];
var b = [5, 6];
function change(a,b) {
  a[0] = 4;    //对其属性的修改外部可见 
  var c = a;
  a = b;      //用新引用覆盖
  b = c;
  console.log(a);  //"5,6"        
  console.log(b);  //"4,2,3"
}
change(a,b);
console.log(a);    //"4,2,3"
console.log(b);    //"5,6"
```

&emsp;&emsp;a，b是change函数中的变量，在调用函数时传递了a，b的引用赋给了这两个变量，但是并不能改变全局中的a，b。因为用新引用覆盖在外部不可见，因为函数只是拿到了引用 并没有权力更改引用。

```
var a = [1, 2, 3];
var b = [5, 6];
function change() {
  var c = a;
  a[0] = 4;    //对其属性的修改外部可见 
  a = b;      //用新引用覆盖
  b = c;
}
change(a,b);
console.log(a);  //"5,6" 
console.log(b);  //"4,2,3"
```

&emsp;&emsp;因为js没有块级作用域，所以它在change里找不到变量a，b就会自觉的到上层去找，所以这里的a，b是全局变量的引用。

***
[☞☞☞深究JavaScript系列☜☜☜](https://github.com/staven630/blog/tree/master/%E6%B7%B1%E7%A9%B6JavaScript)
***