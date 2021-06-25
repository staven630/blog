&emsp;&emsp;Spring 提供了多种 ApplicationContext 接口的实现方式，使用 XML 配置的实现类包括:

1. ClassPathXmlApplicationContext

&emsp;&emsp;从类的根路径开始获取 XML 的配置文件

2. FileSystemXmlApplicationContext

&emsp;&emsp;默认从项目根路径查找配置文件。

## 路径配置规则

&emsp;&emsp;类"classpath:"来标识类的根路径（指编译后 class 文件的目录）。如果加上"\*"号，也就是"classpath:\*"，则除了自身的类路径外，还可以查找依赖库(.jar)下的目录。

1. 若 applicationContext.xml 在类的根路径下(eg: resources 目录下)：

```java
ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");

ApplicationContext context = new FileSystemXmlApplicationContext("classpath:applicationContext.xml");
```

2. 若 applicationContext.xml 在类的根路径的子目录下（eg: resources/com/staven/ssm/user），使用"/"作为路径分隔符：

```java
ApplicationContext context = new ClassPathXmlApplicationContext("com/staven/ssm/user/applicationContext.xml");

ApplicationContext context = new FileSystemXMLApplicationContext("classpath:com/staven/ssm/user/applicationContext.xml");
```

3. 若 applicationContext.xml 在项目的根路径下：

```java
ApplicationContext context = new FileSystemXMLApplicationContext("applicationContext.xml");
```

4. 若 applicationContext.xml 在项目的根路径的子目录下(eg: config)：

```java
ApplicationContext context = new FileSystemXMLApplicationContext("conifg/applicationContext.xml");
```

## 动态加载 Bean

```java
GenericApplicationContext context = new GenericApplicationContext();
new XmlBeanDefinitionReader(context).loadBeanDefinitions("services.xml", "daos.xml");
context.refresh();
```

## 容器的关闭

&emsp;&emsp;基于 Web 的 ApplicationContext 实现会在 Web 应用关闭时恰当地关闭 Spring IoC 容器。对于非 Web 应用，建议使用 close()方法关闭容器。容器关闭会释放一些容器占用的资源，类似于数据库的连接。close()方法是 AbstractApplicationContext 抽象类才开始具有的，这个类继承自 AbstractApplicationContext 接口。

```java
AbstractApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
context.close();
```
