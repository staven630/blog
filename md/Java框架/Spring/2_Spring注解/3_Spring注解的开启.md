&emsp;&emsp;默认情况 Spring 提供或实现的容器配置注解不会生效，需要手动配置实现。由 3 中开启类型注解的方式：

## 配置实现注解功能的 BeanPostProcessor 的 Bean

&emsp;&emsp;对于使用容器扩展点的 BeanPostProcessor 实现的注解来说，注解的开启，只需要在配置文件中加上注解处理类的 Bean 配置。

```xml
<!-- 公共注解的处理类的Bean的定义 -->
<bean class="org.springframework.beans.factory.annotation.CommonAnnotationBeanPostProcessor"></bean>
```

&emsp;&emsp;AutowiredAnnotationBeanPostProcessor、RequiredAnnotationBeanPostProcessor、PersistenceAnnotationBeanPostProcessor 配置方式相似。

## 使用\<context:annotation-config>标签

```xml
<context:annotation-config /> <!-- 开启注解配置 -->
```

&emsp;&emsp;相当于一次性在容器注册 CommonAnnotationBeanPostProcessor、AutowiredAnnotationBeanPostProcessor、RequiredAnnotationBeanPostProcessor、PersistenceAnnotationBeanPostProcessor 4 种 PostProcessor 的 Bean。

&emsp;&emsp;使用 context 标签，需要在 beans 元素中添加 context 的命名空间。

## 使用\<context:component-scan>标签

&emsp;&emsp;前面两种方式并不会开启@Component 等组件的注解功能。要开启此类型注解，需要进行路径扫描的配置：

```xml
<!-- 包扫描配置 -->
<context:component-scan bask-package="com.staven.ssmi.anno" />
```

&emsp;&emsp;base-package 属性用于设置扫描的路径，多个路径间使用逗号分隔。

&emsp;&emsp;配置了 component-scan，也就开启了@Autowired、@Required 和@Resource 等注解功能，就不需要使用配置 annotation-config 了。
