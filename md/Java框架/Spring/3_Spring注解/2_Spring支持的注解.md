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
