### BigInt

&emsp;&emsp;从 ES2010 开始，JavaScript 提供了一种内置对象：BigInt，它提供了一种方法来表示大于 a<sup>53</sup> - 1 的整数（原本是 js 中可以用 Number 表示的最大数字）。BigInt 可以表示任意大的整数。

##### 表示方法

- 整数字面量后面加 n

```ts
const theBiggestInt = 9007199254740991n;
```

- 调用 BigInt()

```ts
const alsoHuge = BigInt(9007199254740991);
```

##### 与 Number 不同点

- 不能用于 Math 对象中的方法
- 不能和任何 Number 实例混合运算，两者必须转换成同一种类型。转换时需要注意，因为 BigInt 变量在转换成 Number 变量时可能丢失精度。

##### 类型信息

&emsp;&emsp;使用 typeof 测试时，BigInt 对象返回“bigint”：

```ts
typeof 1n === "bigint"; // true

typeof BigInt("1") === "bigint"; // true
```

&emsp;&emsp;使用 Object 包装后，BigInt 被认为是一个普通“object”：

```ts
typeof Object(1n) === "object"; // true
```

##### 运算

&emsp;&emsp;+、-、\*、\*\*、%这些操作符可以和 BigInt 一起使用。

&emsp;&emsp;除>>>(无符号右移)之外的位操作也可以支持。因为 BigInt 都是有符号的，除>>>(无符号右移)不能用于 BigInt。

```ts
const previousMaxSafe = BigInt(Number.MAX_SAFE_INTEGER); // ↪ 9007199254740991n

const theFuture = previousMaxSafe + 2n; // ↪ 9007199254740993n

const multi = previousMaxSafe * 2n;// ↪ 18014398509481982n

const subtr = multi – 10n; // ↪ 18014398509481972n

const mod = multi % 10n; // ↪ 2n

const bigN = 2n ** 54n; // ↪ 18014398509481984n

bigN * -1n; // ↪ –18014398509481984n
```

&emsp;&emsp;当使用 BigInt 时，带小数的运算会被取整。

```ts
const expected = 4n / 2n; // 2n

const rounded = 5n / 2n; // 2n
```

##### 比较

- 相等性
  &emsp;&emsp;BigInt 和 Number 不是严格相等的，但是是宽松相等的。

```ts
0n === 0; // false

0n == 0; // true
```

- 大小

```ts
1n < 2; // true

2n > 1; // true

2n > 2; // false

2n >= 2; // true
```

- 排序

```ts
const mixed = [4n, 6, -12n, 10, 4, 0, 0n];
mixed.sort(); // [-12n, 0, 0n, 10, 4n, 4, 6]
```

- 条件

```ts
if (0n) {
  console.log(true);
}

// true
```
