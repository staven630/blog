### @Primary

&emsp;&emsp;@Autowired 默认根据类来查找和注入容器中的对象，如果存在同一个类的多个 Bean 实例被容器管理的状况，在使用@Autowired 装配该类的依赖对象时会报 UnsatisfiedDependencyException 的异常，提示 expected single matching bean but found X,容器初始化失败。可以在该类的某个 Bean 的配置中设置该 Bean 作为依赖注入的主候选项解决此问题，对应 XML 配置和 Java 注解配置的方式分别为：

- 在 XML 的<bean\>配置中使用 primary 属性设置是否是主候选 Bean，true 表示优先使用。
- 在使用 Java 注解进行组件和依赖配置的方式下，可以使用@Primary 注解在类和方法上。

&emsp;&emsp;@Primary 可以使用在@Component 注解的类中，也可以使用在@Bean 注解的方法上。

- 使用在@Component 注解类的场景：A 是一个接口，BA、CA 是 A 接口的实现类，并且这两个实现类使用@Component 注解为组件。如果通过@Autowired 注入 A 接口类型的依赖，会找到两个 Bean，此时可以在 BA 或 CA 之一中使用@Primary 注解。
- 在方法中使用@Bean 注解，可以达成对同一个类的多个 Bean 实例的注册，这也是@Primary 更为常见的使用方式。

```java
@Bean // 组件注解
@Primary
public void getUserInfo(User user) {
   return new User('staven');
}
```

### @Qualifier

&emsp;&emsp;除了使用@Primary 指定主候选之外，还可以使用@Qualifier，其和@Autowired 根据 Bean 的名字来查找依赖对象，进行细粒度的配置。
2/211
&emsp;&emsp;@Qualifier 可以使用在属性、方法和参数中。

```java
@Autowired
@Qualifier("oneUser") // @Qualifier(value="oneUser")
public void getUserInfo(User user) {
   return new User('staven');
}
```
