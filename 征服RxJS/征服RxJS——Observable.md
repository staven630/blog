# 概述
&emsp;&emsp;Observable作为被观察目标，是一个值或事件的流集合。Observer是观察者。
&emsp;&emsp;Observer通过Observable提供的subscribe()方法订阅Observable。
&emsp;&emsp;Observable通过next()方法向Observer发布事件

# Observable原理
&emsp;&emsp;Observable实质上是一个Observer对象(包含error、next、complete属性)作为参数，返回取消订阅(unsubscribe)的函数。
&emsp;&emsp;
```
class DataSource {
  constructor(limit) {
    let i = 0;
    this.limit = limit;
    this.timer = setInterval(() => this.emit(i++), 100)
  }

  emit(n) {
    this.onNext && this.onNext(n);
    if (n === this.limit) {
      this.onComplete && this.onComplete();
      this.destory();
    }
  }

  destory() {
    clearInterval(this.timer);
  }
}

function Observable(observer) {
  const obj = new DataSource(100);
  obj.onNext = (e) => observer.next(e);
  obj.onError = (err) => observer.error(err);
  obj.onComplete = () => observer.complete();
  return () => {
    obj.destory();
  }
}

const ob = Observable({
  next(data) {console.log(data)},
  error(err) {console.log(err)},
  complete() {console.log('complete!')}
})
```

# RxJS中的Observable
* 传入的Observer对象可以不实现next、error、complete方法。
* error、complete方法触发后或取消订阅后无法再调用next方法
* error、complete方法触发后，自动取消订阅
