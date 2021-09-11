### 任意值 any

&emsp;&emsp;指定 any 为类型可以忽略来自 TypeScript 的所有类型检查。any 除非必须（通常是为了向后兼容），否则不要使用。

### unknown

&emsp;&emsp;在实际上不知道类型并希望确保类型安全时使用 unknown 修饰变量。

&emsp;&emsp;使用 unknown 时，可以将所有类型关联到一个变量，但不能使用 unknown 类型转换为具有其他类型的变量。
