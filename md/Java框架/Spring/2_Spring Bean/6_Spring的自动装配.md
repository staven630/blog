&emsp;&emsp;Spring 提供了自动装配的功能，可以在全局范围内设定，也可以对单个 Bean 进行个别设定。

## 全局设定

&emsp;&emsp;在 beans 的根元素设置 default-autowire 的值可以开启整个应用中配置 Bean 的依赖自动注入，容器会根据 default-autowire 设置的匹配类型自动查找符合的 Bean 实例进行注入。

&emsp;&emsp;default-autowire 属性可以设置为：

- byName: 根据 Bean 的标识(id, name 和别名)查找
- byType: 根据 Bean 的 type 类型查找
- constructor: 根据构造器中的参数类型查找

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd"
    default-autowire="byName">

    <bean id="foo" class="com.staven.Foo" />
    <bean id="bar" class="com.staven.Bar" />

</beans>
```

&emsp;&emsp;如果某一个 Bean 不作为依赖被其他 Bean 使用，可以添加 autowire-candidate 的属性值为 false。

## 个别设定

&emsp;&emsp;不推荐全局设置，可以通过配置<bean\>的 autowire 属性来指定单个依赖的自动装配。

```xml
<bean id="foo" class="com.staven.Foo" autowire="byName" />
```
