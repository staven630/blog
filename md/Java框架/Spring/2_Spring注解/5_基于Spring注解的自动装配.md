## @Autowired

&emsp;&emsp;@Autowired 注解可以使用在类构造器、属性和属性 Setter 方法甚至一般的方法上，也可以混合使用。

### 构造器中使用@Autowired

> User.java

```java
public class User {
    public User() {
        System.out.println("User类初始化...");
    }

    public void sayHello() {
        System.out.println("User sayHello!");
    }
}
```

> UserService.java

```java
public class UserService {
    private User user;

    @Autowired
    public void setUser(User user) {
        this.user = user;
    }

    public User getUser() {
        return user;
    }

    public void say() {
        user.sayHello();
    }
}
```

> UserMain.java

```java
public class UserMain {
    public static void main(String[] args) {
        ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
        UserService userService = (UserService) context.getBean("userService");
        userService.say();
    }
}
```

> applicationContext.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd  http://www.springframework.org/schema/context
    http://www.springframework.org/schema/context/spring-context-3.0.xsd"
   >
    <context:annotation-config />
    <bean id="user" class="com.staven.anno.User" />
    <bean id="userService" class="com.staven.anno.UserService" />
</beans>


```

### 属性中使用@Autowired

```java
public class UserService {
    @Autowired
    private User user;

    public UserService() {
        this.user = user;
    }
}
```

### Setter 方法中的@Autowired

&emsp;&emsp;@Autowired 注解可以在 setter 方法上，会在方法中执行 byType 自动装配。

```java
public class UserService {
    private User user;

    @Autowired
    public void setUser(User user) {
        this.user = user;
    }

    public User getUser() {
        return user;
    }
}
```

### required 属性

&emsp;&emsp;@Autowired 默认是 required 的，也就是被注解的依赖必须已经在容器中注册。如果没有，则抛出 UnsatisfiedDependencyException 异常，容器初始化失败。这和@Required 注解的效果是一致的，区别是@Required 是对 XML 文件中的配置依赖项进行检查，@Autowired 会自动在容器中查找依赖项并注入。使用了@Autowired 注解的构造器和 Setter 方法一般不再需要注解@Required。

&emsp;&emsp;如果要取消依赖 required 的检查，最直接的就是删除@Autowired 注解。实际项目中经常会遇到运行时才需要注入 Bean，而不是在容器初始化的时候进行装配注入，这种状况可以通过设置 required 属性的值为 false 取消在容器初始化时对依赖对象的检查：

```java
@Autowired(required=false)
public void setFoo(Foo foo) {
  this.foo = foo;
}
```

&emsp;&emsp;除了使用@Autowired 的 required 属性的方式，还可以在方法参数上使用@Nullable 注解已达到同样的效果：

```java
@Autowired
public void setFoo(@Nullable Foo foo) {
  this.foo = foo;
}
```

## @Primary

&emsp;&emsp;@Autowired 默认根据类来查找和注入容器中的对象，如果存在同一个类的多个 Bean 实例被容器管理的状况，在使用@Autowired 装配该类的依赖对象时会报 UnsatisfiedDependencyException 的异常，提示 expected single matching bean but found X,容器初始化失败。可以在该类的某个 Bean 的配置中设置该 Bean 作为依赖注入的主候选项解决此问题，对应 XML 配置和 Java 注解配置的方式分别为：

- 在 XML 的<bean\>配置中使用 primary 属性设置是否是主候选 Bean，true 表示优先使用。
- 在使用 Java 注解进行组件和依赖配置的方式下，可以队以来使用@Primary 注解使用在类和方法上。

&emsp;&emsp;@Primary 可以使用在@Component 注解的类中，也可以使用在@Bean 注解的方法上。

- 使用在@Component 注解类的场景：A 是一个接口，BA、CA 是 A 接口的实现类，并且这两个实现类使用@Component 注解为组件。如果通过@Autowired 注入 A 接口类型的依赖，会找到两个 Bean，此时可以在 BA 或 CA 之一中使用@Primary 注解。
- 在方法中使用@Bean 注解，可以达成对同一个类的多个 Bean 实例的注册，这也是@Primary 更为常见的使用方式。

```java
@Bean // 组件注解
@Primary
public User secondUser() {
  return new User('staven');
}
```

## @Qualifier

&emsp;&emsp;使用@Qualifier 和@Autowired 根据 Bean 的名字来查找依赖对象，进行细粒度的配置。

&emsp;&emsp;@Qualifier 可以使用在属性、方法和参数中。

```java
@Autowired
@Qualifier("thirdUser") // @Qualifier(value="thirdUser")
private User user;
```

## @Order
