&emsp;&emsp;Spring提供了多种ApplicationContext接口的实现方式，使用XML配置的实现类包括: 
1. ClassPathXmlApplicationContext
   
&emsp;&emsp;从类的根路径开始获取XML的配置文件  
  
2. FileSystemXmlApplicationContext
   
&emsp;&emsp;默认从项目根路径查找配置文件。
   
## 路径配置规则
&emsp;&emsp;类"classpath:"来标识类的根路径（指编译后class文件的目录）。如果加上"\*"号，也就是"classpath:*"，则除了自身的类路径外，还可以查找依赖库(.jar)下的目录。

1. 若applicationContext.xml在类的根路径下(eg: resources目录下)：
```java
ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");

ApplicationContext context = new FileSystemXmlApplicationContext("classpath:applicationContext.xml");
```

2. 若applicationContext.xml在类的根路径的子目录下（eg:  resources/com/staven/ssm/user），使用"/"作为路径分隔符：
```java
ApplicationContext context = new ClassPathXmlApplicationContext("com/staven/ssm/user/applicationContext.xml");

ApplicationContext context = new FileSystemXMLApplicationContext("classpath:com/staven/ssm/user/applicationContext.xml");
```

3. 若applicationContext.xml在项目的根路径下：
```java
ApplicationContext context = new FileSystemXMLApplicationContext("applicationContext.xml");
```

4. 若applicationContext.xml在项目的根路径的子目录下(eg: config)：
```java
ApplicationContext context = new FileSystemXMLApplicationContext("conifg/applicationContext.xml");
```

## 动态加载Bean
```java
GenericApplicationContext context = new GenericApplicationContext();
new XmlBeanDefinitionReader(context).loadBeanDefinitions("services.xml", "daos.xml");
context.refresh();
``` 
