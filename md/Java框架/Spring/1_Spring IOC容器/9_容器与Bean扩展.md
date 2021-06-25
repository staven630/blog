## default-init-method 和 default-destory-method

&emsp;&emsp;当一个上下文定义中的许多 bean 将具有相同的初始化和销毁方法名称时，可以使用 beans 的 default-init-method 和 default-destory-method 属性来设置所有 bean 的默认的初始化和销毁方法，如果 bean 有对应的方法则会执行对应的初始化和销毁方法。

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd"
    default-init-method="initMethod"
    default-destroy-method="destoryMethod">
</beans>
```

&emsp;&emsp;以上配置的全局初始化和销毁的方法需要在各个类中实现。如果某个 Bean 中配置了 init-method 和 destroy-method，则 Bean 上的配置会覆盖全局的配置。

## BeanFactoryPostProcessor 和 BeanPostProcessor

&emsp;&emsp;default-init-method 和 default-destory-method 配置虽然是全局，但是需要在每个相关的 bean 中配置对应的方法。如果希望仅通过某个类的某个方法处理相应的功能，也就是一个单独的类实例来处理应用中所有 Bean 的生命周期方法回调，就需要定义实现 BeanFactoryPostProcessor 和 BeanPostProcessor 接口的类，并配置成 Bean。

### BeanFactoryPostProcessor

&emsp;&emsp;BeanFactoryPostProcessor 是在容器初始化之后 Bean 实例化之前，在容器加载 Bean 的定义阶段执行，此扩展点可以对 Bean 配置的元数据读取和修改，比如 Bean 的 Scope、lazy-init 属性和依赖注入对象等。

&emsp;&emsp;自定义 HelloService Bean：

```xml
<bean id="helloService" class="com.staven.chp04.HelloService">
    <property name="name" value="Tom" />
</bean>
```

&emsp;&emsp;HelloBeanFactoryPostProcessor 类实现 BeanFactoryPostProcessor 接口，覆写方法 postProcessBeanFactory()，该方法有一个 BeanFactory 的输入参数，通过改 BeanFactory 对象可以得到 Bean 的定义并进行修改。

```java
public void postProcessBeanFactory(ConfigurableListableBeanFactory configurableListableBeanFactory) throws BeansException {
    ConfigurableListableBeanFactory beanFactory;
    BeanDefinition beanDefinition = configurableListableBeanFactory.getBeanDefinition("helloService");
    MutablePropertyValues pv = beanDefinition.getPropertyValues();
    pv.addPropertyValue("name", "staven");
}
```

&emsp;&emsp;将实现类注册成一个 Bean 如下：

```xml
<bean class="com.staven.chp04.HelloBeanFactoryPostProcessor" />
```

&emsp;&emsp;其他 Bean 的定义被容器读取的时候都会调用该 Bean 的 postProcessBeanFactory()方法。BeanFactoryPostProcessor 只能对 Bean 的定义进行扩展或更改，不能进行 Bean 实例化及相关操作。如果有多个 BeanFactoryPostProcessor()方法，则通过实现 Ordered 接口，设置 order 属性来设置类的处理顺序。

### BeanPostProcessor

&emsp;&emsp;BeanPostProcessor 接口有个方法：postProcessBeforeInitialzation()和 postProcessAfterInitialzation()。postProcessBeforeInitialzation()在 Bean 实例化、依赖注入之后，初始化方法 init-method 之前调用，postProcessAfterInitialzation()在初始化方法之后执行。

```java
package com.staven.chp04;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.BeanPostProcessor;

public class HelloBeanPostProcessor implements BeanPostProcessor {
    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
        if (bean instanceof HelloService) {
            ((HelloService) bean).setName("staven");
        }
        return bean;
    }

    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
        return bean;
    }
}
```

&emsp;&emsp;将实现类注册成一个 Bean 如下：

```xml
<bean class="com.staven.chp04.HelloBeanPostProcessor" />
```

## Aware 接口

&emsp;&emsp;Spirng 提供了一系列 Aware 后缀的接口用于获取容器的资源和对象。继承这些接口的类能得到 Aware 接口前面命名部分的容器对象。

### ApplicationContextAware

&emsp;&emsp;能获取应用上下文，通过 setApplicationContext()方法获取 ApplicationContext。ApplicationContext 接口继承了 MessageSource 接口、ApplicationEventPublisherAware 接口和 ResourceLoaderAware 接口，所以类继承 ApplicationContextAware 就可以获得 Spring 容器的所有服务，但一般都是用到什么接口就实现什么接口。

### BeanFactoryAware

&emsp;&emsp;获取对象工厂，通过 setBeanFactory()方法得到和获取容器对象。

### BeanNameAware

&emsp;&emsp;获取 Bean 实例的标识。默认情况下，Bean 在容器中的名字是首字母小写的类名，使用 id、name 属性可以指定名字，还可以使用 alias 指定别名，这些名字是维护在容器中的，Bean 对象本身并不知道。如果 Bean 需要获取或修改 Bean 的名字，就可以继承 BeanNameAware 接口，覆写 setBeanName()方法。

### ApplicationEventPublisherAware

&emsp;&emsp;获取事件发布器。ApplicationEventPublisher 是 ApplicationCOntext 的父接口之一，该接口有两个不同参数的 publishEvent()，重载用于发布事件，通知与事件匹配的监听器。

> UserRegisterEvent

```java
public class UserRegisterEvent extends ApplicationEvent {
    private static final long serialVersionUID = 1L;
    private User user;

    public UserRegisterEvent(Object source, User user) {
        super(source);
        this.user = user;
    }

    public User getUser() {
        return user;
    }
}
```

> UserService

```java
public class UserService implements ApplicationEventPublisherAware {
    private ApplicationEventPublisher applicationEventPublisher;

    @Override
    public void setApplicationEventPublisher(ApplicationEventPublisher applicationEventPublisher) {
        this.applicationEventPublisher = applicationEventPublisher;
    }

    public boolean register(User user) {
        System.out.println(user + "注册成功");
        applicationEventPublisher.publishEvent(new UserRegisterEvent(this, user));
        return true;
    }
}
```

> UserEventListener

```java
public class UserEventListener implements ApplicationListener<UserRegisterEvent> {
    @Override
    public void onApplicationEvent(UserRegisterEvent event) {
        System.out.println(event.getUser().getName());
    }
}
```

### BeanClassLoadAware

&emsp;&emsp;获取类加载器

### MessageSourceAware

&emsp;&emsp;获取 MessageSource，用于国际化消息处理。

### ResourceLoaderAware

&emsp;&emsp;获取资源加载器，可以获得外部资源文件。
