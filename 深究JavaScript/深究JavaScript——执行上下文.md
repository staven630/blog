## 定义
> 执行上下文（也称执行环境execution context）（简称：EC）是个抽象的概念，是在函数被调用时，但是在函数体被真正执行以前所创建的。每个执行上下文都有一个变量对象(variable object)，保存着当前环境中所有的变量、函数声明、形参arguments以及this。

&emsp;&emsp; 一系列活动的执行上下文从逻辑上形成一个栈。栈底总是全局上下文，栈顶是当前（活动的）执行上下文。当执行流进入函数时，函数的环境就会被推入一个环境栈中，在函数执行之后，栈再将其环境弹出，把控制权返回给之前的执行环境。

&emsp;&emsp; 代码在一个环境中执行，会创建变量对象的一个作用域链，作用域链保证了执行的顺序。

## 三种运行环境
* 全局：
  
&emsp;&emsp; 只存在一个全局的上下文，该上下文能被任何其它的上下文所访问到。

* 函数：
  
&emsp;&emsp; 每调用执行一个函数时，引擎就会自动新建出一个函数执行上下文，就是新建一个局部作用域，可以在该局部作用域中声明私有变量等，在外部的上下文中是无法直接访问到该局部作用域内的元素的。

&emsp;&emsp; 当在全局上下文中调用执行一个函数时，程序流就进入该被调用函数内，此时引擎就会为该函数创建一个新的执行上下文（即使是调用自身函数），并且将其压入到执行上下文堆栈的顶部。浏览器总是执行当前在堆栈顶部的上下文，一旦执行完毕，该上下文就会从堆栈顶部被弹出，然后，进入最新的堆栈顶部的上下文执行代码。堆栈中的上下文就会被依次执行并且弹出堆栈，直到回到全局的上下文。

* eval函数
  
&emsp;&emsp;在eval函数内运行的代码。

## 执行上下文建立、运行过程
### 建立阶段：
> 发生在调用一个函数时，但是在执行函数体内具体的代码以前。

#### 建立variable Object对象
> 先是处理arguments参数，接着是函数的声明，最后是变量的声明。

&emsp;&emsp;建立arguments对象，检查当前上下文中的参数，建立该对象下的属性以及属性值。每个执行环境都有一个与之关联的变量对象（variable object），环境中定义的所有变量和函数都保存在这个对象中。虽然我们编写的代码无法访问这个对象，但解析器在处理数据时会在后台使用它。

&emsp;&emsp;检查当前上下文中的函数声明：使用 function 关键字声明的函数，就在variable Object下面用函数名建立一个属性，属性值就是指向该函数在内存中的地址的一个引用；如果上述函数名已经存在于variable Object下，那么对应的属性值会被新的引用所覆盖。

&emsp;&emsp; 检查当前上下文中的变量声明：每找到一个变量的声明，就在variable Object下，用变量名建立一个属性，属性值为undefined。如果该变量名已经存在于variable Object属性中，直接跳过(防止指向函数的属性的值被变量属性覆盖为undefined)，原属性值不会被修改。

#### 初始化作用域链

&emsp;&emsp;当代码在一个环境中执行时，会创建变量对象的一个作用域链（scope chain）。作用域链的用途，是保证对执行环境有权访问的所有变量和函数的有序访问。作用域链的前端，始终都是当前执行的代码所在环境的变量对象。如果这个环境是函数，则将其活动对象（activation object）作为变量对象。活动对象在最开始时只包含一个变量，即 arguments 对象（这个对象在全局环境中是不存在的）。作用域链中的下一个变量对象来自包含（外部）环境，而再下一个变量对象则来自下一个包含环境。这样，一直延续到全局执行环境；全局执行环境的变量对象始终都是作用域链中的最后一个对象。

#### 确定上下文中this的指向对象

&emsp;&emsp;确定this指向window或当前对象。

###  代码执行阶段
1. 给variableObject中的变量赋值
```
function aoo(i){
    var a = 'staven';
    var b = function boo(){
        
    };
    function coo(){
        
    }
}
aoo(1);
```
2. 调用aoo(1)，建立阶段执行下上文对象：
```
aooExecutionContext = {
    variableObject:{
        arguments:{
            0:1,
            length:1
        },
        i:1,
        coo:(指向function coo()),
        a:undefined,
        b:undefined
    },
    scopeChain:{……},
    this:{……}
};
```

3. 运行阶段，执行上下文对象：
```
aooExecutionContext = {
    variableObject:{
        arguments:{
            0:1,
            length:1
        },
        i:1,
        coo:(指向function coo()),
        a:"staven",
        b:(指向function boo())
    },
    scopeChain:{……},
    this:{……}
};
```

## 解析变量提升
```
(function(){
    console.log(typeof foo);  //function
    console.log(typeof bar); //undefined
    
    var foo = 'hello',
        bar = function(){
            return "staven";
        };
    function foo(){
        return "hello";
    }
    console.log(typeof foo); //string
    console.log(typeof bar); //function
}());
```
&emsp;&emsp;因为在上下文的建立阶段，先是处理arguments, 参数，接着是函数的声明，最后是变量的声明。那么，发现foo函数的声明后，就会在variableObject下面建立一个foo属性，其值是一个指向函数的引用。当处理变量声明的时候，发现有var foo的声明，但是variableObject已经具有了foo属性，所以直接跳过。当进入代码执行阶段的时候，就可以通过访问到foo属性了，因为它已经就存在，并且是一个函数引用。

&emsp;&emsp;bar是变量的声明，在建立阶段的时候，被赋予的默认的值为undefined。由于它只要在代码执行阶段才会被赋予具体的值，所以，当调用typeof(bar)的时候输出的值为undefined。
***
[☞☞☞深究JavaScript系列☜☜☜](https://github.com/staven630/blog/tree/master/%E6%B7%B1%E7%A9%B6JavaScript)
***