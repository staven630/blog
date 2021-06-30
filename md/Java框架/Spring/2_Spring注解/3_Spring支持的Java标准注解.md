## 注解分类

### 组件注解

| 注解           | 归属      | 功能               |
| :------------- | :-------- | :----------------- |
| @Named         | Java 标准 | 组件注册           |
| @PostConstruct | Java 标准 | 组件初始化方法回调 |
| @PreDestory    | Java 标准 | 组件销毁方法回调   |

### 依赖注入注解

| 注解      | 归属               | 功能     |
| :-------- | :----------------- | :------- |
| @Resource | Java 标准          | 依赖注入 |
| @Inject   | Java 标准          | 依赖注入 |
| @Nullable | Java 标准或 Spring | 非空检查 |

## @PostConstruct 和 @PreDestory

&emsp;&emsp;这两个注解可以用来修饰一个非静态的 void 方法。@PostConstruct 注解的方法会在 Bean 的构造函数之后 init()方法之前执行；@PreDestory 注解的方法会在 destory()方法执行之后执行。

```java
public class LifeCycleCallbackAnno { //定义一个使用注解的类
    @PostConstruct // 该注解方法在该类示例初始化时调用
    public void startAnno() {
    }

    @PreDestroy // 该注解方法在类实例销毁时调用
    public void endAnno() {
    }
}
```

## @Named

&emsp;&emsp;@Inject 和 @Named 这两个注解没有包含在 JRE 中，需要额外导入依赖包。

```xml
<dependency>
    <groupId>javax.inject</groupId>
    <artifactId>javax.inject</artifactId>
    <version>1</version>
</dependency>
```

&emsp;&emsp;@Named 使用在属性和参数上，作用是根据名字查找容器中对应的对象；也可以使用在类上，用于对该类进行组件的标注，功能类似于在 XML 文件中配置 Bean。

```java
@Named("nameBeanAnno")
public class NamedBeanAnno {
}
```

&emsp;&emsp;与 XML 配置一样，如果不指定 Bean 的名字，默认一首字母小写的类名作为 Bean 的名字。

## @Resource

&emsp;&emsp;用来标注系统或容器中资源类型的对象引用，包括持久层访问对象资源(DAO)、文件或容器等资源。可以使用在属性和属性的 setter 方法上。

```java
public class ResourceAnno {
    @Resource  // 注解使用在属性上，注入注解自定义类的对象
    private com.staven.Foo foo;

    @Resource  // 注解使用在属性上，注入容器类的对象
    private ApplicationContext context;

    private Bar bar;

    @Resource // 注解使用在setter方法上，注入参数定义的对象
    public void setBar(Bar bar) {
        this.bar = bar;
    }
}
```

&emsp;&emsp;@Resource 注解的属性或 setter 方法，默认会以属性名或 setter 方法参数名去查找容器中的对象，如果没找到，则使用类来查找和注入。也可以显示第使用属性 name 来查找指定名称的 Bean 的实例。

```java
public class ResourceAnno {
    @Resource(name="foo")  // 通过名字查找容器中对应的对象
    private com.staven.Foo foo;
}
```

## @Inject

&emsp;&emsp;@Inject 可以使用在构造函数、属性和属性的 setter 方法上，用来注入依赖对象。

```java
public class InjectNamedAnno {
    private Foo foo;
    private Baz baz;

    @Inject
    public InjectNamedAnno(@Named("foo") Foo foo){
        this.foo = foo;
    }

    @Inject
    private Bar bar;

    @Inject
    public void setBaz(Baz baz) {
        this.baz = baz;
    }
}
```

&emsp;&emsp;@Inject 注解的属性、函数和方法，默认会以属性或参数的名称查找容器中的对象。参数也可以结合@Named 注解，指定需要注入的 Bean 的名字。

```java
@Inject
public void setBaz(@Named("baz") Baz baz) {
    this.baz = baz;
}
```

&emsp;&emsp;如果 Bean 没有找到，则容器初始化时会抛出 UnsatisfiedDependencyException 的异常提示。
