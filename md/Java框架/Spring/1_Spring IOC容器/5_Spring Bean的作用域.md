&emsp;&emsp;scope 属性用来进行 Bean 的作用域配置，可以配置 6 种类型的作用域：

- singleton
- prototype
- request
- session
- application
- websocket

## singleton（单例作用域）

&emsp;&emsp;Spring IoC 容器只创建和维护一个该类型的 Bean 实例，并将这个实例存储到单例缓存中(singleton cache)中，针对该 Bean 的请求和引用，使用的都是用一个实例。从容器启动或者第一次调用实例化开始，只要容器没有退出或者销毁，该类型的单一实例就会一直存活。

&emsp;&emsp;Spring 中同一个类可以进行多个单例 Bean 的配置，也就是一个类可以对应到多个不同的 id 对象。

&emsp;&emsp;singleton 是最常用的作用域，也是默认的类型。也就是说，如果没有设置 Bean 的 scope 属性，则默认就是单例作用域。

```xml
<bean id="singletonBean" class="com.staven.SingletonBeanService" scope="singleton" />
```

## prototype（原型作用域）

&emsp;&emsp;原型作用域的 Bean 在使用容器的 getBean()方法获取的时候，每次得到的都是一个新的对象。作为依赖对象注入到其他 Bean 的时候也会产生一个新的类对象。在代码层级来看，相当于每次使用都是使用 new 的操作符来层创建一个新的对象。

&emsp;&emsp;容器不负责原型作用域 Bean 实例的完整生命周期，在初始化或装配完该 Bean 的类对象之后，容器就不再对该对象进行管理，而需要由客户端对该对象进行管理，特别是如果该对象占用了一些昂贵的资源，就需要手动释放。此外，对于 singleton 类型的 Bean，如果有配置对象的生命周期回调方法，则容器会根据配置进行调用，类似于 singleton Bean 使用后置处理器释放被 Bean 占用的资源，而 prototype Bean 即使配置了回调方法也不会调用。

## request——请求作用域

&emsp;&emsp;针对每次 HTTP 请求，Spring 都会创建一个 Bean 实例。

## session——会话作用域

&emsp;&emsp;适用于 HTTP Session，同一个 session 共享同一个 Bean 实例。

## application——应用作用域

&emsp;&emsp;整个 Web 应用，也就是在 ServletContext 生命周期中使用一个 Bean 实例。

## websocket

&emsp;&emsp;WebSocket 作用域的配置是在一个 WebSocket 连接的生命周期中共用一个 Bean 实例。
