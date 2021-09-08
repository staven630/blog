## 依赖注入方式

&emsp;&emsp;Spring 中有两种常见的依赖注入方式：属性注入和构造器注入。

### 构造函数注入

&emsp;&emsp;在 Bean 的配置中，使用 constructor-arg 的子元素配置依赖的对象，对应的 Bean 类需具备对应参数的构造函数。容器反射调用带参数的构造函数进行依赖对象的初始化。

> UserDao.java

```java
package com.staven.ssm;

public class UserDao {
    public void sayHello(User user) {
        System.out.println("Hello: " + user.getName() );
    }
}
```

> UserService.java

```java
package com.staven.ssm;

public class UserService {
    private UserDao userDao;

    public UserService(UserDao userDao) {
        this.userDao = userDao;
    }

    public void add(String name) {
        User user = new User();
        user.setName(name);
        userDao.sayHello(user);
    }
}
```

> applicationContext.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    <bean id="userDao" class="com.staven.ssm.UserDao" />
    <bean id="userService" class="com.staven.ssm.UserService">
        <constructor-arg ref="userDao"></constructor-arg>
    </bean>
</beans>
```

&emsp;&emsp;constructor-arg 配置子元素对应到构造函数的参数，在 ref 子元素的 bean 属性中设置依赖 bean 的 id。

### 设置值注入

&emsp;&emsp;设置值注入使用的是属性的 setter 方法来注入依赖对象。

> UserService.java

```java
package com.staven.ssm;

public class UserService {
    private UserDao userDao;

    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }

    public void add(String name) {
        User user = new User();
        user.setName(name);
        userDao.sayHello(user);
    }
}
```

> applicationContext.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    <bean id="userDao" class="com.staven.UserDao" />
    <bean id="userService" class="com.staven.UserService">
        <property name="userDao" ref="userDao" />
    </bean>
</beans>
```

&emsp;&emsp;property 子元素注入依赖对象，name 对应 bean 类中的属性名，ref 设置为依赖 bean 的 id。

### 总结

&emsp;&emsp;Spring 官方推荐使用构造器注入方式。实际项目中，推荐使用构造器注入方式注入强制依赖项，使用设置值方式注入可选依赖项。
