### 空值 void

&emsp;&emsp;表示没有任何类型。

&emsp;&emsp;声明 void 类型的变量没有什么大用，因为你只能为它赋予 undefined 和 null。

```ts
let fn: void = undefined;
```

### Never

&emsp;&emsp;never 类型表示的是那些永不存在的值的类型。

&emsp;&emsp;never 类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是 never 的子类型或可以赋值给 never 类型（除了 never 本身之外）。 即使 any 也不可以赋值给 never。

```ts
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message);
}
```
