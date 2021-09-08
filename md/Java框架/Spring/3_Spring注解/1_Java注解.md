## Java 基本注解

&emsp;&emsp;注解是一种可以应用于类、方法、参数、变量、构造器及包的特殊修饰符，是源代码的元数据。
位于 java.lang.annotation 包中。

### 编译检查的注解

| 注解              | 功能                                       |
| :---------------- | :----------------------------------------- |
| @Override         | 注解在方法上，说明当前方法是覆盖超类的方法 |
| @Deprecated       | 弃用或者不建议使用的代码                   |
| @SuppressWarnings | 忽略编译器的警告                           |

### 四种创建注解的注解

| 注解        | 功能                      |
| :---------- | :------------------------ |
| @Documented | 注解是否包含在 JavaDoc 中 |
| @Retention  | 什么时候使用该注解        |
| @Target     | 注解用于什么地方          |
| @Inherited  | 是否允许子类继承该注解    |

&emsp;&emsp;自定义注解通过@interface 关键字定义。

- 定义一个应用在类和方法上的运行时注解 MyAnnotation.java

```java
@Retention(RetentionPolicy.RUNTIME)  // 运行时注解
@Target({ElementType.METHOD, ElementType.TYPE})
public @interface MyAnnotation {  // 注解定义
}
```

- 在类和方法中添加注解 MyAnnotationDemo.java

```java
@MyAnnotation // 自定义注解使用在类上
public class MyAnnotationDemo {

    @MyAnnotation // 自定义注解使用在方法上
    public void annoMethod() {
        System.out.println("方法");
    }

    public static void main(String[] args) throws Exception {
        MyAnnotationDemo myAnnotationDemo = new MyAnnotationDemo();
        // 获取使用在类上的自定义注解
        if (myAnnotationDemo.getClass().isAnnotationPresent(MyAnnotation.class)) {
            MyAnnotation annotation = myAnnotationDemo.getClass().getAnnotation(MyAnnotation.class);
            System.out.println(annotation);
        }

        // 获取使用在方法上的自定义注解
        Method annoMethod = myAnnotationDemo.getClass().getMethod("annoMethod");
        annoMethod.invoke(myAnnotationDemo, null);
        Annotation[] methodAnnotations = annoMethod.getAnnotations();
        if (annoMethod.isAnnotationPresent(MyAnnotation.class)) {
            System.out.println("other");
        }
    }
}
```

## Java 标准注解

### 公共注解标准 - JSR-250

&emsp;&emsp;JSR-250 定义的注解类文件位于 javax.annotation 包中。主要关于资源的构建、销毁和使用。
| 注解 | 描述 |
| :------------- | :------------------------------------------ |
| @Resource | 声明对资源的引用 |
| @PostConstruct | 使用在 Servlet 上，在 init()方法之前执行 |
| @PreDestory | 使用在 Servlet 上，在 destory()方法之后执行 |

### 依赖注入的注解标准 - JSR-330

&emsp;&emsp;JSR-330 定义的注解类文件位于 javax.inject.jar 中，不在 JDK 中，需要额外下载。
| 注解 | 描述 |
| :------------- | :------------------------------------------ |
| @Inject | 标识需要由注入器注入的类成员，用于类的构造器、方法和属性上，可以与 Spring 依赖配置结合使用 |
| @Qualifier 和 @Named | 限制器，用于限制可注入依赖的类型 |
| @Scope 和 @Singleton | 定义作用域 |
| Provider | 用于提供类型 T 的实例 |

### 软件缺陷检测的注解标准 - JSR-305

&emsp;&emsp;JSR-330 定义的注解没有包含在 JDK 中，需要额外导入 jsr305 的依赖包。

```xml
<dependency>
    <groupId>com.google.code.findbugs</groupId>
    <artifactId>jsr305</artifactId>
    <version>3.0.2</version>
</dependency>
```

| 注解      | 描述                  |
| :-------- | :-------------------- |
| @Nonnull  | 注解的元素不能为 Null |
| @Nullable | 注解的元素可以为空    |
