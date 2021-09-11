### 枚举 enum

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
