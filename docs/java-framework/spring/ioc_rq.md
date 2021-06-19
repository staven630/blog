&emsp;&emsp;IoC 容器是 Spring 最核心的概念和内容。它替代了传统的 new 方式初始化对象，通过读取在 XML 文件中配置的 Bean 定义，自动创建并管理容器的 Bean 实例及其生命周期；最重要的是可以在 Bean 的定义中进行依赖对象的配置，并根据依赖配置自动注入相关依赖，降低对象之间的耦合程度，以达到解耦的效果。

&emsp;&emsp;BeanFactory 和 ApplicationContext 是 Spring 进行对象管理的两个主要接口。

## BeanFactory

&emsp;&emsp;BeanFactory 是基础类型的 IoC 容器，提供了完整的 IoC 服务支持。它主要负责初始化各种 Bean，并调用它们的生命周期方法。

&emsp;&emsp;BeanFactory 接口有多个实现类，最常见的是 org.springframework.beans.factory.xml.XmlBeanFactory，它是根据 XML 配置文件中的定义装配 Bean 的。

```java
BeanFactory beanFactory = new XmlBeanFactory(
  new FileSystemResource("D://code//applicationContext.xml")
);
```

## ApplicationContext

&emsp;&emsp;ApplicationContext 是 Spring IoC 容器的另一个重要接口，被称为应用上下文。继承自 BeanFactory，同时也提供了一些新的高级功能：

- MessageSource（国际化资源接口），用于信息的国际化显示。
- ResourceLoader（资源加载接口），用于资源加载。
- ApplicationEventPublisher（应用事件发布接口）等，用于应用事件的处理。

## 区别

1. BeanFactory 和 ApplicationContext 位于框架不同包中，BeanFactory 位于 org.springframework.beans 包中，而 ApplicationContext 位于 org.springframework.context 包中。
2. ApplicationContext 除了继承自 BeanFactory 接口，还继承了 EnvironmentCapable、MessageSource、ApplicationEventPublisher 和 ResourcePatternResolver 等接口。
3. 两者都支持 BeanPostProcessor、BeanFactoryPostProcessor 的使用，但使用方式是有差别的。BeanFactory 需要手动注册，而 ApplicationContext 还自动注册。
4. 大多时候，使用 ApplicationContext 即可。如果是开发 web 项目，则使用继承自 ApplicationContext 的 WebApplicationContext，其增加了对 web 开发的相关支持，如 ServletContext、Servlet 作用域等支持。
