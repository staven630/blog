# 概念
&emsp;&emsp;当把一个普通的js对象传入Vue实例作为data选项，Vue将遍历此对象的所有属性，并使用Object.defineProperty把这些属性全转为getter/setter。
 
&emsp;&emsp;Object.defineProperty是ES5中一个无法shim的特性，这也就是Vue不支持IE8以及更低版本浏览器的原因。

&emsp;&emsp;受现代JavaScript的限制（而且Object.observe也几经被废弃），vue无法检测到对象属性的添加或删除。由于Vue会在初始化实例时对属性执行getter/setter转化，所以属性必须在data对象上存在才能让Vue将它转换为响应式的。

# Observer
&emsp;&emsp;对数据进行观测。

&emsp;&emsp;通过Object.defineProperty将数据属性变为getter/setter模式，读取数据时会触发getter，修改数据时会触发setter。同时也会为该数据属性创建一个Dep对象，用于依赖管理。

> Observer.js
```
class Observer {
  constructor(value) {
    this.value = value;
    if (!Array.isArray(value)) {
      this.walk(value);
    }
  }
  
  walk(obj) {
    const keys = Object.keys(obj);
    for (let i = 0, len = keys.length; i < len; i++) {
     this.defineReactive(obj, keys[i], obj[keys[i]]);
    }
  }

  defineReactive(obj, key, val) { // 将obj属性getter/setter化
    if (obj !== null && typeof val === 'object') {
      new Observer(val);
    }
    const dep = new Dep();
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: function() {
        dep.depend();
        return val;
      },
      set: function(newVal) {
        if (val === newVal) return;
        val = newVal;
        dep.notity();
      }
    });
  }
}
```

# Dep
&emsp;&emsp;用来收集依赖、调度响应。

&emsp;&emsp;每个Dep实例都维护一个订阅者列表，订阅者是Watcher实例

> Dep.js
 ```
 class Dep {
  constructor() {
    this.subs = new Set();  // 订阅者列表，依赖集合
  }

  addSub(sub) {
    this.subs.add(sub);
  }

  removeSub(sub) {
    this.subs.delete(sub);
  }

  depend() {
    if (Dep.target) { // 将Watcher实例添加到依赖中
      this.addSub(Dep.target);
    }
  }

  notity() {  // 向订阅者派发响应
    this.subs.forEach(sub => sub.update());
  }

}
 ```

# Watcher
&emsp;&emsp;Watcher就是所谓的依赖。

&emsp;&emsp;只有Watcher触发的getter才会收集依赖，当数据发生变化时，会遍历依赖列表，通知所有相关依赖进行响应。

&emsp;&emsp;Watcher的原理:先将自身添加到Dep.target上，然后读取数据,就会触发渲染数据的getter，将当前Watcher实例添加到依赖列表中，当数据发生变化，就会遍历所有依赖派发更新，最后再通过回调函数来更新视图。这样就能主动订阅任意一个数据的变化。

> Watcher.js
```
class Watcher {
  constructor(getter, cb) {
    this.getter = getter;
    this.cb = cb;
    this.value = this.get(); 
  }

  get() { 
    Dep.target = this;  // 将当前Watcher添加到公共位置（Dep.target）作为标识
    const value = this.getter();  // 触发数据getter，完成自身依赖收集
    Dep.target = undefined; // 还原公共位置
    return value;
  }

  update() {  // 更新数据
    const oldVal = this.value;
    this.value = this.get();
    this.cb(this.value, oldVal);  // 更新视图
  }
}
```

# 总结

* Observer与Dep是一对一的关系，Dep与Watcher是多对多的关系，Dep是Observer与Watcher之间的纽带。 
  
*  Vue 中模板编译过程中的指令或者数据绑定都会实例化一个 Watcher 实例，实例化过程中会触发 get() 将自身指向 Dep.target
  
* 实例在初始化过程中，Observer类会将数据的属性转换为getter/setter模式，同时也会创建一个Dep类，用来管理依赖。在模板渲染过程中，Watcher类会先将自省添加到一个公共的位置（如：Dep.target），通过触发渲染的数据属性getter，将Watcher自身添加到Dep列表，完成依赖收集。在修改数据属性时，会触发其setter，从而向Dep对象中收集的所有依赖派发变更信息，最后Watcher类再通过回调函数来更新视图。