# 概念
### 接口(Interface)
&emsp;&emsp;接口主要用于类型检查，它只是一个结构契约，定义了具有相似的名称和类型的对象结构。除此之外，接口还可以定义方法和事件。

### 类型别名(Type Alias)
&emsp;&emsp;不同于interface只能定义对象类型，type声明还可以定义基础类型、联合类型或交叉类型。

# 差异点
### 1. 定义类型范围
&emsp;&emsp;interface只能定义对象类型。

&emsp;&emsp;而type声明可以声明任何类型，包括基础类型、联合类型或交叉类型。

* 基本类型
```ts
type person = string
```
* 联合类型
```ts
interface Dog {
  name: string;
}

interface Cat {
  age: number;
}

type animal = Dog | Cat
```
* 元祖
```ts
interface Dog {
  name: string;
}

interface Cat {
  age: number;
}

type animal = [Dog, Cat]
```

### 2. 扩展性
&emsp;&emsp;接口可以extends、implements,从而扩展多个接口或类。类型没有扩展功能。

* interface extends interface
```ts
interface Person {
name: string
}

interface User extends Person {
age: number
}
```

* interface extends type
```ts
type Person = {
name: string
}


interface User extends Person {
age: number
}
```
&emsp;&emsp;但是type可以使用交叉类型&，来使成员类型合并
* type & type
```ts
type Person = {
name: string
}

type User = Person & { age: number }
```

* type & interface
```ts
interface Person {
name: string
}

type User = {
age: number
} & Person
```

### 3. 合并声明
&emsp;&emsp;定义两个相同名称的接口会合并声明。

&emsp;&emsp;定义两个同名的type会出现异常。

```ts
interface Person {
  name: string
}

interface Person {
  age: number
}
// 合并为:
interface Person {
  name: string
  age: number
} 
```

### 4. typeof
&emsp;&emsp;type可以使用typeof获取实例类型

```ts
let div = document.createElement('div');
type B = typeof div
```

### 最佳实践
&emsp;&emsp;由于声明合并的支持，接口更易扩展，编写面向对象或第三方库的代码时，推荐使用接口。

&emsp;&emsp;类型别名更易组合，可以组合出很多类似Partial、Exclude、Omit等组合类型，编写功能代码时推荐使用类型别名。