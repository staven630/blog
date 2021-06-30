## 注解分类

&emsp;&emsp;Spring 除了提供对多种 Java 注解标准接口(JSR-250、JSR-330、JSR-305)的支持和实现之外，也定义了用于容器配置等功能的注解。

### 组件注解

| 注解           | 归属      | 功能               |
| :------------- | :-------- | :----------------- |
| @Named         | Java 标准 | 组件注册           |
| @PostConstruct | Java 标准 | 组件初始化方法回调 |
| @PreDestory    | Java 标准 | 组件销毁方法回调   |
| @Component     | Spring    | 组件注册(类)       |
| @Bean          | Spring    | 组件注册(方法)     |
| @Scope         | Spring    | 组件作用域         |

### 依赖注入注解

| 注解       | 归属               | 功能                                              |
| :--------- | :----------------- | :------------------------------------------------ |
| @Resource  | Java 标准          | 依赖注入                                          |
| @Inject    | Java 标准          | 依赖注入                                          |
| @Nullable  | Java 标准或 Spring | 非空检查                                          |
| @Required  | Spring             | 依赖检查                                          |
| @Autowired | Spring             | 依赖主动装配                                      |
| @Primary   | Spring             | 依赖注入 Bean 优先级，结合@Component 和@Bean 使用 |
| @Qualifier | Spring             | 依赖注入限定符，结合@Autowired 使用               |
| @Order     | Spring             | 依赖注入顺序，结合@Component 和@Bean 使用         |

### 配置注解

| 注解           | 归属   | 功能           |
| :------------- | :----- | :------------- |
| @Configuration | Spring | 配置类注解     |
| @ComponentScan | Spring | 组件扫描注解   |
| @Import        | Spring | 导入其他配置类 |

## Spring 开启注解

&emsp;&emsp;默认情况 Spring 提供或实现的容器配置注解不会生效，需要手动配置实现。由 3 中开启类型注解的方式：

1. 配置实现注解功能的 BeanPostProcessor 的 Bean

   &emsp;&emsp;对于使用容器扩展点的 BeanPostProcessor 实现的注解来说，注解的开启，只需要在配置文件中加上注解处理类的 Bean 配置。

```xml
<!-- 公共注解的处理类的Bean的定义 -->
<bean class="org.springframework.beans.factory.annotation.CommonAnnotationBeanPostProcessor"></bean>
```

&emsp;&emsp;AutowiredAnnotationBeanPostProcessor、RequiredAnnotationBeanPostProcessor、PersistenceAnnotationBeanPostProcessor 配置方式相似。

2. 使用<context:annotation-config&gt;标签

```xml
<context:annotation-config /> <!-- 开启注解配置 -->
```

&emsp;&emsp;相当于一次性在容器注册 CommonAnnotationBeanPostProcessor、AutowiredAnnotationBeanPostProcessor、RequiredAnnotationBeanPostProcessor、PersistenceAnnotationBeanPostProcessor 4 种 PostProcessor 的 Bean。

&emsp;&emsp;使用 context 标签，需要在 beans 元素中添加 context 的命名空间。

3.  使用<context:component-scan&gt;标签

    &emsp;&emsp;前面两种方式并不会开启@Component 等组件的注解功能。要开启此类型注解，需要进行路径扫描的配置：

```xml
<!-- 包扫描配置 -->
<context:component-scan bask-package="com.staven.ssmi.anno" />
```

&emsp;&emsp;base-package 属性用于设置扫描的路径，多个路径间使用逗号分隔。

&emsp;&emsp;配置了 component-scan，也就开启了@Autowired、@Required 和@Resource 等注解功能，就不需要使用配置 annotation-config 了。
