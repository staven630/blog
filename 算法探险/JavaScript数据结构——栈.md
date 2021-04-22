# 概念
&emsp;&emsp;栈是一种遵从后进先出(LIFO)原则的有序集合。新添加的或带删除的元素都保存在栈的同一端，称为栈顶。后添加的元素保存在栈底。

# 模拟栈

```
const Stack = (function () {
  const items = new WeakMap();

  class Stack {
    constructor() {
      items.set(this, []);
    }

    // 添加元素
    push(element) {
      items.get(this).push(element);
    }

    // 删除元素
    pop() {
      return items.get(this).pop();
    }

    // 栈顶元素
    peek() {
      const st = items.get(this);
      return st[st.length - 1];
    }

    // 栈的长度
    size() {
      return items.get(this).length;
    }

    // 检查栈是否为空
    isEmpty() {
      return items.get(this).length === 0;
    }

    // 清空栈
    clear() {
      let s = items.get(this);
      s.length = 0;
    }

    // 显示栈
    print() {
      return items.get(this).toString();
    }
  }

  return Stack;
})();
```

# 应用

### 进制转换

```
function baseConverter(decNumber, base) {
  const remStack = new Stack();
  const digits = '0123456789ABCDEFG';
  let rem;
  let value = '';

  while (decNumber > 0) {
    rem = Math.floor(decNumber % base);
    remStack.push(rem);
    decNumber = Math.floor(decNumber / base);
  }

  while (!remStack.isEmpty()) {
    value += digits[remStack.pop()];
  }

  return value;
}
```

### 平衡圆括号

```
function isBracketBalanced(str) {
  const pattern = /^(\(|\))*$/;
  if (!pattern.test(str)) {
    throw new Error('Your parameter can only include () character');
  }
  const stack = new Stack();
  for (let i = 0; i < str.length; ++i) {
    if (str[i] === '(') {
      stack.push('(');
    } else if (!stack.pop()) {
      return false;
    }
  }
  return stack.isEmpty();
}
```