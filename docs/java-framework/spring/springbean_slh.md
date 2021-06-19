### 静态内部类

> OuterClass.java

```java
package com.staven;

public class OuterClass {
    static class InnerClass {
        public void innerMethod() {
            System.out.println("This is InnerClass's Innermethod");
        }
    }
}
```

> applicationContext.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    <bean id="innerObject" class="com.staven.OuterClass $InnerClass" />
</beans>
```

### 静态工厂方法

&emsp;&emsp;静态工厂方法使用该类的一个静态方法返回类的唯一对象，静态对象在整个应用中是唯一的。在类加载的时候产生，使用"类名.静态方法"的方式引用，速度相对比较快。对于高频使用且全局唯一的某些对象，比如配置类的实例，就可以使用这种方式。

> StaticFactoryService.java

```java
package com.staven;

public class StaticFactoryService {
    public static StaticFactoryService service = new StaticFactoryService();

    public static StaticFactoryService getInstance() {
        return service;
    }
}
```

> applicationContext.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    <bean id="staticFactoryService" class="com.staven.StaticFactoryService" factory-method="getInstance" />
</beans>
```

&emsp;&emsp;使用静态工厂方法配置的 Bean 也可以配置 Bean 的 constructor-org 元素进行构造函数参数的注入。

### 实例工厂方法

&emsp;&emsp;将目标类实例的创建放在两外一个工厂类的方法中，通过配置工厂类的 Bean 实例和方法得到目标类实例。

> Foo.java

```java
public class Foo {}
```

> InstanceFactory.java

```java
public class InstanceFactory {
    public static Foo foo = new Foo();

    public Foo getFooInstance() {
        return foo;
    }
}
```

> applicationContext.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    <bean id="instanceFactory" class="com.staven.InstanceFactory" />
    <bean id="foo" factory-bean="instanceFactory" factory-method="getFooInstance" />
</beans>
```

&emsp;&emsp;在配置文件中，需要配置工厂类的 Bean 和目标类的 Bean。工厂类的 Bean 按一般配置即可，目标类的 Bean 配置不需要 class 属性，但需要使用 factory-method 属性指定获取对象实例的工厂类的方法。
