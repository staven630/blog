&emsp;&emsp;配置 Bean 的 class 属性，Spring 容器启动的时候使用反射机制调用该类的构造函数创建一个类的对象。

&emsp;&emsp;除了使用构造器实例化 Bean 外，还可以使用以下方式进行 Bean 的实例化。

- 静态内部类
- 静态工厂方法
- 实例工厂方法

&emsp;&emsp;在处理第三方或他人提供的工厂方法类，会使用到以上方式。

## 静态内部类

&emsp;&emsp;静态内部类是类的内部使用 static 关键字修饰的类，可以通过“外部类名.静态内部类名”的方式访问。

> OuterClass.java

```java
package com.staven;

public class OuterClass {
    static class InnerClass {
        public void innerMethod() {
            System.out.println("InnerClass's Innermethod");
        }
    }
}
```

&emsp;&emsp;使用一般方式实例化：

```java
OuterClass.InnerClass  inner = new OuterClass.InnerClass();
inner.innerMethod();
```

&emsp;&emsp;使用 Spring 容器实例化，使用"\$"链接父子类：

```xml
<bean id="innerInstance" class="com.staven.OuterClass $InnerClass" />
```

## 静态工厂方法

&emsp;&emsp;静态工厂方法使用该类的一个静态方法返回类的唯一对象，静态对象在整个应用中是唯一的。在类加载的时候产生，使用"类名.静态方法"的方式引用，速度相对比较快。对于高频使用且全局唯一的某些对象，比如配置类的实例，就可以使用这种方式。

> StaticFactoryService.java

```java
package com.staven;

public class StaticFactory {
    public static StaticFactory service = new StaticFactory();

    public static StaticFactory getInstance() {
        return service;
    }
}
```

&emsp;&emsp;使用 Spring 容器实例化：

```xml
<bean id="staticFactory" class="com.staven.StaticFactory" factory-method="getInstance" />
```

&emsp;&emsp;使用静态工厂方法配置的 Bean 也可以配置 Bean 的 constructor-org 元素进行构造函数参数的注入。

## 实例工厂方法

&emsp;&emsp;将目标类实例的创建放在另外一个工厂类的方法中，通过配置工厂类的 Bean 实例和方法得到目标类实例。

> Foo.java

```java
public class Foo {}
```

> InstanceFactory.java

```java
public class InstanceFactory {
    public static Foo foo = new Foo();

    public Foo getFoo() {
        return foo;
    }
}
```

&emsp;&emsp;使用 Spring 容器实例化：

```xml
<bean id="instanceFactory" class="com.staven.InstanceFactory" />
<bean id="foo" factory-bean="instanceFactory" factory-method="getFoo" />
```

&emsp;&emsp;需要配置工厂类的 Bean 和目标类的 Bean。工厂类的 Bean 按一般配置即可，目标类的 Bean 配置不需要 class 属性，但需要使用 factory-method 属性指定获取对象实例的工厂类的方法。

&emsp;&emsp;实例工厂方法使用专门的工具类的方法获取实例，获取实例的方法可以不是静态的。
