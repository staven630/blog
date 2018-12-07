# 概述
&emsp;&emsp;Observable作为被观察目标，是一个值或事件的流集合。而Observer是观察者。

&emsp;&emsp;Observable提供的subscribe()是二者连接的桥梁，Observer通过subscribe()来订阅Observable。

&emsp;&emsp;Observable通过调用observer.next()方法向Observer发布事件。

# 设计模式
&emsp;&emsp;Observable实现了两种是设计模式：
* [观察者模式](https://github.com/staven630/blog/blob/master/%E6%82%9F%E9%80%8FJavaScript%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/%E6%82%9F%E9%80%8FJavaScript%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%E2%80%94%E2%80%94%E8%A7%82%E5%AF%9F%E8%80%85%E6%A8%A1%E5%BC%8F.md)
* [迭代器模式](https://github.com/staven630/blog/blob/master/%E6%82%9F%E9%80%8FJavaScript%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/%E6%82%9F%E9%80%8FJavaScript%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%E2%80%94%E2%80%94%E8%BF%AD%E4%BB%A3%E5%99%A8%E6%A8%A1%E5%BC%8F.md)

# 解析
```
import { Observable } from 'rxjs';

const subscription = observer => {
  let number = 1;
  const handler = setInterval(() => {
    observer.next(number++);
    if (number > 3) {
      observer.complete();
    }
  }, 3000);
  return {
    unsubscribe: () => {
      clearInterval(handler);
    }
  }
};

const observable = new Observable(subscription);
const observer = {
  next: item => console.log(item),
  error: () => console.log('出错啦!'),
  complete: () => console.log('结束啦!')
}

observable.subscribe(observer);
```
* subscription是事件源，产生事件流的主体。是一个函数，包含了事件产生的逻辑，并返回一个对象，该对象中包含了unsubscribe方法，用于取消订阅。
* observer是观察者，是一个对象，包含了处理事件next(),完成事件complete(),错误处理事件error()等方法。
* observable是被观察者，实质上是一个Observer对象(包含error、next、complete属性)作为参数，返回取消订阅(unsubscribe)的函数。
