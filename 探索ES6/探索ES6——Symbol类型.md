# 基础知识
&emsp;&emsp;Symbol值通过Symbol函数生成的。
  > var s = Symbol('foo');

&emsp;&emsp;Symbol是原始类型，不是对象。因此，Symbol函数前不能使用new创建，也不能添加属性。

&emsp;&emsp;相同参数的Symbol函数返回值是不相等的。
```
let s1 = Symbol('s')
let s2 = Symbol('s')
console.log(s1 == s2) // false
console.log(s1 === s2)  // false
```
&emsp;&emsp;Symbol类型值与其他类型值不能进行运算。
```
let s = Symbol();
console.log(s + '');  // TypeError: Cannot convert a Symbol value to a string
```
&emsp;&emsp;Symbol可以转换为字符串、布尔值，但不能转换为数值。
```
let s = Symbol('staven');
console.log(s.toString());  // 'Symbol(staven)'
console.log(Boolean(s));  // true
```
&emsp;&emsp;Symbol作为属性名，不能使用.操作符。

# 方法
### Object.getOwnPropertySymbols
```
let obj = {
  name: 'staven'
}

let foo = Symbol('foo')

Object.defineProperty(obj, foo, {
  value: 'foobar'
})

console.log(Object.getOwnPropertySymbols(obj)); // [ Symbol(foo) ]
```
### Reflect.ownKeys
```
let obj = {
  name: 'staven'
}

let foo = Symbol('foo')

Object.defineProperty(obj, foo, {
  value: 'foobar'
})

console.log(Reflect.ownKeys(obj));  // [ 'name', Symbol(foo) ]
```
### Symbol.for()

&emsp;&emsp;接收一个字符串作为参数，搜索有没有以该参数作为名称的Symbol，有则直接返回该Symbol值，否则就新建并返回新的Symbol值。

&emsp;&emsp; Symbol.for()登记的名字是全局环境，可以在不同的iframe或service worker中驱动同一个值。

```
let s1 = Symbol.for('s')
let s2 = Symbol.for('s')
console.log(s1 === s2)  // true
```

### Symbol.keyFor()

&emsp;&emsp;返回一个已登记的Symbol类型值的key。
```
let s = Symbol.for('staven')

console.log(Symbol.keyFor(s));  // staven
```

# 使用场景
### 消除魔术字符串
```
const TYPES = {
  increment: Symbol(),
  decrement: Symbol()
};

const computed = (type, state, count) => {
  switch(type) {
    case TYPES.increment:
      return state + count;
    case TYPES.decrement:
      return state - count;
    default:
      return state;
  }
}

console.log(computed(TYPES.increment, 100, 5));
```

### 单例模块
```
const KEY = Symbol();

function foo() {
  this.name = 'staven';
}

if (!global[KEY]) {
  global[KEY] = new foo();
}

module.exports = global[KEY];
```