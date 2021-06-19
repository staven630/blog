## 布尔值

```ts
let isBool: boolean = false;
```

## 数字

&emsp;&emsp;和 JavaScript 一样，TypeScript 中所有数字都是浮点数。这些浮点数的类型是 number。

```ts
let dec: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
```

## 字符串

&emsp;&emsp;可以使用单引号(')或双引号(")表示字符串。

```ts
let name = "Brendan";
let username = "Eich";
```

&emsp;&emsp;还可以使用末班字符串反引号(`)来定义多行文本和内嵌表达式(\${expr})。

```ts
let firstName = "Brendan";
let lastName = "Eich";
let name = `${firstName} ${lastName}`;
```

## 数组

&emsp;&emsp;在 TypeScript 中有两种方式定义数组:

1. 类型[]

```ts
let array: number[] = [1, 2, 3];
```

2. 数组泛型：Array<类型>

```ts
let array: Array<number> = [1, 2, 3];
```

## 元组 Tuple

&emsp;&emsp;元组类型表示一组长度与类型固定的数据，各元素的类型不必相同。

```ts
let member: [string, number];

member =  = ["Tom", 23]; // ok
member = [23, "Tom"]; // Error
```

&emsp;&emsp;访问已知索引的元素，会得到正确的类型。

```ts
member[0].substr(1); // ok
member[1].substr(1); // Error,  'number' does not have 'substr'
```

&emsp;&emsp;元祖长度不能越界。

## 枚举 enum

&emsp;&emsp;

```ts
enum Color {
  Red,
  Green,
  Blue,
}
let a: Color = Color.Green;
```

&emsp;&emsp;默认下标从 0 开始，也可以手动指定成员的下标。

```ts
enum Color {
  Red = 1,
  Green,
  Blue,
}
```

## 任意值 any

&emsp;&emsp;

## 空值 void

&emsp;&emsp;表示没有任何类型。

&emsp;&emsp;声明 void 类型的变量没有什么大用，因为你只能为它赋予 undefined 和 null。

```ts
let fn: void = undefined;
```

## Null 和 Undefined

&emsp;&emsp;默认情况下，null 和 undefined 是所有类型的子类型，也就是说可以把 null 和 undefined 赋值给其他类型的变量。

&emsp;&emsp;如果指定了--strictNullChecks 标记，null 和 undefined 只能赋值给 void 和它们各自。

## Never

&emsp;&emsp;never 类型表示的是那些永不存在的值的类型。

&emsp;&emsp;never 类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是 never 的子类型或可以赋值给 never 类型（除了 never 本身之外）。 即使 any 也不可以赋值给 never。

```ts
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message);
}
```
