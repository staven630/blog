&emsp;&emsp;Set对象可以存储任何类型的唯一值，无论是原始值或者对象引用。

&emsp;&emsp;Set对象是值的集合，你可以按照插入的顺序迭代它的元素。Set中的元素只会出现一次，即Set中的元素是唯一的。
```js
let set = new Set();
set.add('staven');
set.add(1);
set.add({name: 'Tom'});
```

### 属性

| 属性 | 描述                    |
| :--- | :---------------------- |
| size | 返回Set对象中值的个数。 |

```js
console.log(set.size); // 3
```

### 方法
| 方法                 | 描述                                                                                                                                                  |
| :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| add(value)           | 向Set对象内添加一个元素。返回该Set对象。                                                                                                              |
| delete(value)        | 删除Set一个元素，如果该元素存在返回true，否则返回false。                                                                                              |
| has(value)           | 如果值在Set中存在，则返回true，否则返回false。                                                                                                        |
| clear()              | 清空Set                                                                                                                                               |
| keys()               | 返回一个新的迭代器对象，该对象包含Set对象中的按插入顺序排列的所有元素的。                                                                             |
| values()             | 与Set.keys()作用相同                                                                                                                                  |
| entries()            | 返回一个新的迭代器对象，该对象包含Set对象中的按插入顺序排列的所有元素的值的[value, value]数组。为了使这个方法和Map对象保持相似， 每个值的键和值相等。 |
| forEach(cb, thisArg) | 按照插入顺序，为Set对象中的每一个值调用一次cb。如果提供了thisArg参数，回调中的this会是这个参数。                                                      |
```js
console.log(set.has('staven')); // true
set.delete('staven');
set.clear();
```

### 特性
##### 等值判断
&emsp;&emsp;NaN和undefined都可以被存储在Set中，NaN之间、-0、+0被认为是相同的。

##### 唯一性
&emsp;&emsp;同一个值重复调用set.add(value)无效，Set里的值都只会出现一次。


##### Set迭代
&emsp;&emsp;Set对象的迭代的顺序与插入值的顺序相同。
* set.keys()
* set.values()
* set.entries()
* for...of
* forEach
```js
for (let val of set.keys()) {
  console.log(val);
}

for (let val of set.values()) {
  console.log(val);
}

for (let [val, val] of set.entries()) {
  console.log(val);
}

for (let [val, val] of set) {
  console.log(val);
}

set.forEach((value, value, set) => {
  console.log(value);
})
```

### 使用案例
* 数组去重
```js
function unique(arr) {
  return Array.from(new Set(arr));
}
```
* 超集

&emsp;&emsp;如果一个集合b中的每一个元素都在集合a中，则集合a就是b的一个超集
```js
function isSuperset(a, b) {
  for (let item of b) {
    if (!a.has(item)) {
      return false;
    }
  }
  return true;
}
```
* 并集
```javascript
function union(a, b) {
  let _union = new Set(a);
  for (let item of b) {
    _union.add(b);
  }
  return _union;
}

// or
function union(a, b) {
  return new Set([...a, ...b]);
}
```
* 交集
```javascript
function intersection(a, b) {
  let _intersection = new Set();
  for (let item of b) {
   if (a.has(item)) {
     _intersection.add(item);
   }
  }
  return _intersection;
}

// or
function intersection(a, b) {
  return new Set([...a].filter(x => b.has(x)));
}
```
* 差集
```javascript
function difference(a, b) {
  let _difference = new Set(a);
  for (let item of b) {
     _difference.delete(item);
  }
  return _difference;
}

// or
function difference(a, b) {
  return new Set([...a].filter(x => !b.has(x)));
}
```
* 补集
```javascript
function symmetricDifference(a, b) {
  let _difference = new Set(a);
  for (let item of b) {
   if (_difference.has(item)) {
     _difference.delete(item);
   } else {
     _difference.add(item);
   }
  }
  return _difference;
}
```
