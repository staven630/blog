<span id="top"></span>
- [原始数据类型](#primitive)
  - [布尔值](#boolean)
  - [数值](#number)
  - [字符串](#string)
  - [null与undefined](#null)
  - [symbol](#symbol)
- [引用类型](#obj)
  - [对象](#object)
  - [数组](#array)
  - [元祖](#tuple)
  - [枚举](#enum) 
- [其他类型](#other)
  - [any](#any)
  - [void](#void)
  - [never](#never)
  

# <span id="primitive">原始数据类型</span>

### <span id="boolean">布尔值</span>
```typescript
let isDone: boolean = false;
```
&emsp;&emsp;使用包装类 Boolean 创建的值，不是布尔值, 而是 Boolean 对象。（包装类 Number、String 同理）

```typescript
// 不能将类型“Boolean”分配给类型“boolean”。
// “boolean”是基元，但“Boolean”是包装器对象。如可能首选使用“boolean”。
let isDone: boolean = new Boolean(1)
```

&emsp;&emsp;直接调用 Boolean()方法，返回的是 boolean 类型。
```typescript
let isDone: boolean = Boolean(1)
```
[▲ 回顶部](#top)

### <span id="number">数值</span>
&emsp;&emsp;与JavaScript一样，TypeScript里所有数字都是浮点数。
```typescript
// 十进制
let dec: number = 1;
// 二进制
let binary: number = 0b0001;
// 八进制
let oct = 0o0001;
// 十六进制
let hex = 0x0001;
```

[▲ 回顶部](#top)

### <span id="string">字符串</span>
&emsp;&emsp;和JavaScript一样，可以使用双引号（ "）或单引号（'）表示字符串。
```ts
let name: string = 'staven'
let author: string = "staven"
```

[▲ 回顶部](#top)

### <span id="null">null与undefined</span>
&emsp;&emsp;默认情况下，null与undefined是所有类型的子类型。
```ts
let age: number = null
```
&emsp;&emsp;tsconfig.ts中strictNullChecks字段设为true，null和undefined只能赋值给void和它们各自。

&emsp;&emsp;null与undefined都不能当做类型来约束变量。

[▲ 回顶部](#top)

### <span id="symbol">symbol</span>
&emsp;&emsp;同es6

[▲ 回顶部](#top)

# <span id="obj">对象类型</span>
### <span id="object">对象</span>
[▲ 回顶部](#top)

### <span id="array">数组</span>
&emsp;&emsp;数组常见的两种定义方式：

1. 类型 + []
  ```ts
  let list: number[] = [1, 2, 3]
  ```
2. 使用数组泛型: Array<类型>
  ```ts
  let list: Array<number> = [1, 2, 3]
  ```
&emsp;&emsp;除此之外，还可以使用接口来定义数组：
```ts
interface NumberArray {
  [index: number]: number
}

let list: NumberArray = [1, 2]
```

[▲ 回顶部](#top)

### <span id="tuple">元祖</span>
&emsp;&emsp;元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。 
```ts
const [count, setCount]: [number, Function]  = useState(0)
```

[▲ 回顶部](#top)

### <span id="enum">枚举</span>
```ts
enum Color {Red, Green, Blue}
let c: Color = Color.Green;
```
[▲ 回顶部](#top)

# <span id="other">其他类型</span>
### <span id="any">any</span>
&emsp;&emsp;any 表示可以赋值为任意类型。

- 普通类型不能在赋值后改变类型

```typescript
let user: boolean = Boolean(1);
// 不能将类型“"staven"”分配给类型“boolean”。
user = "staven";
```

&emsp;&emsp;但是 any 类型值，赋值后可以再次被赋值为任意值。

```typescript
let user: any = Boolean(1);
user = "staven";
```

- 任意值的属性和方法

&emsp;&emsp;访问 any 修饰的任意值的属性和方法都是被允许的。

```typescript
let user: any = "staven";
console.log(user.name);
```

- any 修饰的值，对其的任意操作，返回的类型都是任意值。

- 未声明类型的变量

&emsp;&emsp;如果变量在声明时未指定类型，它会被推断为 any 类型而完全不被类型检查。

```typescript
let user;
user = "staven";
user = 7;
```
[▲ 回顶部](#top)

### <span id="void">void</span>
&emsp;&emsp;void 表示没有任何返回值。不能赋值给其他类型的值。
```ts
function warnUser(): void {
    console.log("This is my warning message");
}
```

[▲ 回顶部](#top)

### <span id="never">never</span>
&emsp;&emsp;never类型表示的是那些永不存在的值的类型。

&emsp;&emsp;never类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）。 即使 any也不可以赋值给never。

```ts
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
    while (true) {
    }
}
```

[▲ 回顶部](#top)
