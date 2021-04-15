> new Map([iterable])

&emsp;&emsp;Map是一个带键的数据项的集合。Map对象保存键值对，并且能够记住键的原始插入顺序。任何值(对象或者原始值)都可以作为一个键或一个值。

&emsp;&emsp;构造函数Map可以接受一个数组或者其他iterable对象作为参数，其元素为键值对(两个元素的数组，例如: [[ 1, 'one' ],[ 2, 'two' ]])。null会被当做 undefined。

```js
const map = new Map();
map.set('name', 'staven');
```

### 属性

| 属性 | 描述                          |
| :--- | :---------------------------- |
| size | 返回Map对象包含键值对的数量。 |

```js
map.set('age', 11);
console.log(map.size); // 2
```

### 方法
| 方法                 | 描述                                                                                                        |
| :------------------- | :---------------------------------------------------------------------------------------------------------- |
| set(key, value)      | 存储键值。返回该Map对象。                                                                                   |
| get(key)             | 返回键对应的值，如果不存在，则返回undefined。                                                               |
| has(key)             | 如果key存在返回true，否则返回false。                                                                        |
| delete(key)          | 如果Map对象中存在该元素，则移除它并返回true；否则如果该元素不存在则返回false。                              |
| clear()              | 清空Map对象。                                                                                               |
| keys()               | 返回一个新的Iterator对象，它按插入顺序包含了Map对象中每个元素的键。                                         |
| values()             | 返回一个新的Iterator对象，它按插入顺序包含了Map对象中每个元素的值。                                         |
| forEach(cb, thisArg) | 按插入顺序，为Map对象里的每一键值对调用一次cb函数。如果为forEach提供了thisArg，它将在每次回调中作为this值。 |
| entries()            | 返回一个新的Iterator对象，它按插入顺序包含了Map对象中每个元素的[key, value]数组。                           |

```js
console.log(map.get('name')) // 'staven'
console.log(map.has('name')) // true
console.log(map.keys()); // MapIterator {"name", "age"}
console.log(map.values()); // MapIterator {"staven", 11}
console.log(map.entries()); // MapIterator {"name" => "staven", "age" => 11}
map.delete('age')
map.clear()

let user = {name: 'tom'};
map.set(user, 'haha');
```

### 特性
##### 键的相等
* Map是基于SameValueZero算法来比较键的是否相等。和"==="差不多，但区别是NaN被看成等于NaN。
```js
map.set(NaN, 111)
console.log(map.get(NaN)) // 111
```
* 在目前ECMAScript规范中，-0和+0被认为是相等的。

##### 链式调用
&emsp;&emsp;map.set调用会返回Map本身，所以支持链式调用。
```js
map.clear()

map.set('name', 'staven')
  .set('age', 11);
```

##### Map迭代
&emsp;&emsp;Map对象的迭代的顺序与插入值的顺序相同。一个for...of循环在每次迭代后会返回[key, value]形式的数组。
* map.keys()
* map.values()
* map.entries()
* for...of
* forEach
```js
for (let key of map.keys()) {
  console.log(key);
}

for (let value of map.values()) {
  console.log(value);
}

for (let [key, value] of map.entries()) {
  console.log(key, value);
}

for (let [key, value] of map) {
  console.log(key, value);
}

map.forEach((value, key, map) => {
  console.log(key, value);
})
```
### Map与其他类型的转换
1. Array转换为Map
```js
let map1 = new Map([
  ['name', 'staven'],
  ['age', 11]
])
```
2. Map转换为数组
```js
let arr1 = [...map1];
// or
arr1 = Array.from(map1);
```
3. Object转换为Map
```js
let person = {
  name: "staven",
  age: 11
};

let map2 = new Map(Object.entries(person));
```
4. Map转换为Object
```js
Object.fromEntries(map2.entries())

// or
Object.fromEntries(map2)

// or
let obj = {};
for (let [key, value] of map2) {
  obj[key] = value;
}
```

### Object与Map的比较
* Object的键只能是为String类型或者Symbol类型，Ma的键可以是任意类型。
* 需要手动获取Object的长度，Map内置了size属性。
* Map的键值是有序的，而Object的键值不是。
* Object都有自己的原型，所以映射中有一些缺省的键名(原型链上有可能存在于自定义相同的键名而产生冲突，可以用 map = Object.create(null) 来避免）。