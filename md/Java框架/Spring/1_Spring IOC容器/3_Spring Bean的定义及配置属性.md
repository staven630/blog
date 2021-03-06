## Bean 的定义

&emsp;&emsp;在 Spring 中，构成应用程序主干并由 Spring IoC 容器管理的对象称为 Bean。Bean 是由 Spring IoC 容器实例化、组装和以其他方式管理的对象。

&emsp;&emsp;配置 Bean 的 class 属性，Spring 容器启动的时候使用反射机制调用该类的构造函数创建一个类的对象。

## 需要配置成 Bean 的类

&emsp;&emsp;符合 JavaBean 规范的类以及不符合 JavaBean 规范的 POJO 都可以配置成 Bean。主要包括以下几种：

- 服务层对象：包括桌面应用中的逻辑功能类，以及 Web MVC 应用中的控制类、服务类。
- 数据访问对象：和数据库进行操作，对数据进行增删改查的类对象及事务处理的相关类对象。
- 框架基础对象：例如框架用于注解支持的类和持久化框架整合的基础对象等。

&emsp;&emsp;Spring 容器主要对对象的生命周期和对依赖关系进行管理。从类的特征上看，具备单例特性的类都适合交由容器管理，依赖关系较为复杂或者依赖会发生变化的类也适合 Spring 进行控管。

## Bean 配置的主要属性

| 属性名         | 说明                                                                                    |
| :------------- | :-------------------------------------------------------------------------------------- |
| id             | Bean 的唯一标识，默认类名首字母小写 ，Spring 容器对 Bean 的配置和管理都通过 id 属性完成 |
| name           | name 属性中可以为 Bean 指定多个名称，用逗号或分号隔开                                   |
| class          | 指定 Bean 的具体实现类，必须是一个完整的类名。一般情况下是必要的，实例工厂方式不需要    |
| scope          | 设定 Bean 实例的作用域，默认为 singleton                                                |
| factory-method | 静态工厂和实例工厂配置使用                                                              |
| factory-bean   | 实例工厂配置使用                                                                        |
| init-method    | 初始化方法                                                                              |
| destory-method | 销毁方法                                                                                |
| lazy-init      | 懒加载                                                                                  |
| autowire       | 自动装置                                                                                |
| parent         | 定义继承                                                                                |
