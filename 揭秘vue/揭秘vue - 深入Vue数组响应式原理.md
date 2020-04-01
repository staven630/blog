# 概念
&emsp;&emsp;对象的变更检测是通过getter/setter实现的，但是数组操作并不会触发getter/setter。

&emsp;&emsp;在ES6之前，JavaScript没有提供元编程的能力，因此没有提供可以拦截原型方法的能力。但是可以使用一个自定义的拦截器来覆盖数组的原型对象(Array.prototype)。这样才操作数组方法时，会执行拦截器中提供的方法,来完成变更检测。

# 定义拦截器
&emsp;&emsp;Array原型中可以改变数组本身的方法有7个：push、pop、unshift、shift、splice、sort、reverse。
> ArrayProto.js
```
const arrayProto = Array.prototype;
export const arrayWrapper = Object.create(arrayProto);

['push', 'pop', 'unshift', 'shift', 'splice', 'sort', 'reverse'].forEach(method => {
  const original = arrayProto[method];
  Object.defineProperty(arrayWrapper, method, {
    writable: true,
    enumerable: false,
    configurable: true,
    value: function mutator(...args) {
      return original.apply(this, args);
    }
  });
});
```

# 覆盖Array原型
&emsp;&emsp;通过__proto__实现数组原型的覆盖。

&emsp;&emsp;如果浏览器不支持__proto__，直接将拦截器方法挂载到数组本身。

> Observer.js
```
import { arrayWrapper } from "./arrayProto";

const def = (obj, key, val, enumerable) => {
  Object.defineProperty(obj, key, {
    writable: true,
    enumerable: !!enumerable,
    configurable: true,
    value: val
  });
};

const overrideMethod = (obj, wrapper) => {
  if ('__proto__' in {}) { // 判断浏览器是否支持__proto__
    obj.__proto__ = wrapper; // 直接使用wrapper覆盖数组原型
  } else {
    const methods = Object.getOwnPropertyNames(wrapper);
    for (let i = 0; i < methods.length; i++) {
      const method = methods[i];
      def(obj, method, wrapper[method]);
    }
  }
};

export class Observer {
  constructor(value) {
    this.value = value;
    if (Array.isArray(value)) {
      overrideMethod(value, arrayWrapper)
    } else {
      // 处理对象变更检测
    }
  }
}
```

# 收集依赖
> arrayProto.js
```
import { def } from "./Observer";

const arrayProto = Array.prototype;
export const arrayWrapper = Object.create(arrayProto);

['push', 'pop', 'unshift', 'shift', 'splice', 'sort', 'reverse'].forEach(method => {
  const original = arrayProto[method];
  def(arrayWrapper, method, function mutator(...args) {
    const result = original.apply(this, args);
    const ob = this.__ob__;
    let inserted;
    switch(method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break;
      case 'splice':
        inserted = args.slice(2);
        break;
    }
    if (inserted) {
      ob.observeArray(inserted);
    }
    ob.dep.notify();
    return result;
  });
});
```
> Observe.js
```
export function Observe(value, asRootData) {
  if (!isObject(value)) {
    return;
  }
  let ob;
  // 如果实例Observer已经存在，直接返回，否则创建新实例
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__
  } else {a
    ob = new Observer(value)
  }
  return ob;
}
```
> Observer.js
```
import { arrayWrapper } from "./arrayProto";
import { Observe } from "./Observe";

export const def = (obj, key, val, enumerable) => {
  Object.defineProperty(obj, key, {
    writable: true,
    enumerable: !!enumerable,
    configurable: true,
    value: val
  });
};

const overrideMethod = (obj, wrapper) => {
  if ('__proto__' in {}) { // 判断浏览器是否支持__proto__
    obj.__proto__ = wrapper; // 直接使用wrapper覆盖数组原型
  } else {
    const methods = Object.getOwnPropertyNames(wrapper);
    for (let i = 0; i < methods.length; i++) {
      const method = methods[i];
      def(obj, method, wrapper[method]);
    }
  }
};

export class Observer {
  constructor(value) {
    this.value = value;
    // 数组是在getter中收集依赖，在拦截器中触发依赖
    // 因此，在getter与拦截器中都能访问到依赖列表
    this.dep = new Dep();
    // 定义__ob__标识，可以通过__ob__来避免Observer实例重复创建
    def(value, '__ob__', this);

    if (Array.isArray(value)) {
      overrideMethod(value, arrayWrapper)
      this.observeArray(value);
    } else {
      // 处理对象变更检测
    }
  }

  observeArray(array) {
    for (let i = 0; i < array.length; i++) {
      observe(array[i]);
    }
  }

  defineReactive(obj, key, val) {
    let childOb = Observe(val);
    let dep = new Dep();
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: function() {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
        }
        return val;
      },
      set: function(newVal) {
        if (val === newVal) {
          return;
        }
        val = newVal;
        dep.notity();
      }
    });
  }
}
```