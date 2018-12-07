# 定义
&emsp;&emsp;一个目标(Observable)管理所有依赖它的观察者对象(Observer),解决主体对象与观察者功能之间的耦合。

&emsp;&emsp;一对多的关系。多个观察者同时监听一个目标对象。当这个目标对象的状态发生改变会通知所有观察者对象，观察者对象各自接收到通知主动更新自身的状态。

# 优缺点
### 优点
* 支持简单的广播通信，自动通知所有已经订阅过的对象

* 目标对象与观察者之间耦合关系能够单独扩展及重用

* 在异步编程中，使用观察者模式，无须关注对象在异步运行期间的状态，只需要订阅响应的事件

### 缺点
* 一个目标对象有很多直接、简介观察者的话，要通知到所有的观察者会花费很长时间

* 如果在目标和观察者之间有循环依赖，可能会导致系统循环调用

# js中的观察者模式
* 在类或自执行函数中，一个对象类型的私有变量messages作为缓存列表，管理着不同类型的观察者。属性是不同类型的观察者，属性对应的数组是一个事件队列。

* 通过register(type, action)方法将不同类型(type)的观察者及其响应事件(action)添加到缓存列表(messages)中

* 通过publish(type, message)方法发布消息(message)，并遍历同类型(type)观察者， 将消息(message)传递给各观察者，调用其响应事件(action)

* 通过remove(type, action)方法取消订阅某类型(type)的观察者

es5:
```
var Observable = (function() {
  var _messages = {};
  return {
    register: function(type, action) {
      if (typeof action !== 'function') throw new Error("action必须是function");
      typeof _messages[type] === 'undefined' 
        ? _messages[type] = [action] : 
        _messages[type].push(action);
    },
    publish: function(type, message) {
      if (!_messages[type]) return;
      for (var i = 0; i < _messages[type].length; i++) {
        _messages[type][i].call(this, {type: type, message: message});
      }
    },
    remove: function(type, action) {
      if (_messages[type] instanceof Array) {
        for (var i = _messages[type].length - 1; i > 0; i--) {
          _messages[type][i] === action && _messages[type].splice(i, 1);
        }
      }
    }
  }
})();

Observable.register('test', function(e) {
  console.log(e)
});

Observable.publish('test', '消息1')
Observable.publish('test', '消息2')
```

es6:
```
class Observable {
  constructor() {
    this.messages = {};
  }

  register(type, action) {
    if (typeof action !== 'function') throw new Error("action必须是function");
    typeof this.messages[type] === 'undefined' ?
      this.messages[type] = [action] :
      this.messages[type].push(action);
  }

  publish(type, message) {
    if (!this.messages[type]) return;
    this.messages[type].forEach(fn => {
      fn.call(this, message);
    });
  }

  remove(type, action) {
    if (this.messages[type] instanceof Array) {
      this.messages[type] = this.messages[type].filter(fn => {
        return fn === action;
      });
    }
  }

}

var p = new Observable();

function actionA(message) {
  console.log("actionA send " + message);
}

function actionB(message) {
  console.log("actionB send " + message);
}

p.register('test', actionA);
p.register('test', actionB);

p.publish("test", "你好！")
```