# 定义函数
```
def 函数标识符(参数):
  函数体
```

# 参数

### 参数传递
* 不可变类型参数：整型、字符串、元组。
&emsp;&emsp;函数内对参数进行修改并不影响函数外参数本身。
```
def test(a):
    a = 10

x = 5
test(x)
print(x)    # 5
```

* 可变类型参数：列表、字典。
&emsp;&emsp;函数内对参数进行修改会影响函数外参数。
```
def test(lst):
    lst.append(11)

arr = [1, 2, 3]
test(arr)
print(arr)  # [1, 2, 3, 11]
```

### 必需参数
&emsp;&emsp;必需参数须以正确的顺序传入函数。调用时的数量必须和声明时的一样。

### 关键字参数
&emsp;&emsp;关键字参数使用关键字参数来确定传入的参数值。使用关键字参数允许函数调用时参数的顺序与声明不一致，python解释器能够用参数名匹配参数值。
```
def test(name, age):
    print('name:', name)
    print('age:', age)

test(age = 10, name = 'staven')
```

### 默认参数
&emsp;&emsp;可以为参数提供默认值。
```
def test(name, age = 10):
    print('name:', name)
    print('age:', age)

test(name = 'staven')
```

### 不定长参数
&emsp;&emsp;使用前缀*来表示不定长参数
```
def test(arg, *val):
    print(arg) 
    print(val)  

test(10, 20, 30) # 10  # （20, 30）
```
&emsp;&emsp;如果没有传入不定长的参数相符合，*修饰的参数将是一个空元组
```
def test(*val):
    print(val)  

test() # （）
```
&emsp;&emsp;两个**修饰的参数将以字典的形式导入。
```
def test(**val):
    print(val) 

test(a = 10, b = 'staven') # {'a': 10, 'b': 'staven'}
```
&emsp;&emsp;*可以单独出现在参数里，不加任何标识符。后续参数必需使用关键字参数
```
def test(a, *, b):
    print(b)

test(10, b = 'staven') # staven
```

# 匿名函数
&emsp;&emsp;lambda函数拥有自己的命名空间，且不能访问自己参数列表之外或全局命名空间里的参数。
```
sum = lambda a, b: a + b
print(sum(2,3)) # 5
```

# 变量作用域
### 作用域分类
* 局部作用域（Local）
* 闭包函数外的函数中作用域（Enclosing）
* 全局作用域（Global）
* 内置作用域(内置函数所在builtin标准模块)，需要导入import builtins（Built-in）
  
### 作用域
&emsp;&emsp;Python中只有模块、类、函数才会引入新的作用域。其他代码块不会引入新的作用域。

&emsp;&emsp;局部作用域内能访问全局作用域变量及操作，但不能对全局作用域进行修改。

### global和nonlocal关键字
&emsp;&emsp;global和nonlocal可以将局部作用域变量修改成全局作用域变量。
```
num = 0
def test():
    global num
    num = 10
    print(num)  # 10
test()
print(num)  # 10
```
&emsp;&emsp;如果要修改嵌套作用域（Enclosing）中的变量则需要用nonlocal关键字了。
```
def outer():
    num = 10
    def inner():
        nonlocal num
        num = 100
        print('inner', num)     # inner 100
    inner()
    print('outer', num)  # outer 100
outer()
```
