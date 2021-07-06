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

&emsp;&emsp;如果在 Java 9 或更高版本中使用此注释，则必须显式地将此 jar 添加到您的项目中。

```xml

<dependency>
	<groupId>javax.annotation</groupId>
	<artifactId>javax.annotation-api</artifactId>
	<version>1.3.2</version>
</dependency>
```

### @PostConstruct

&emsp;&emsp;Spring 只调用一次 @PostConstruct 注释的方法，在 Bean 的构造函数的初始化之后执行。即使没有要初始化的内容，这些方法也会运行。

&emsp;&emsp;@PostConstruct 注释的方法可以有任何访问级别，但不能是静态的。

```java
@Component
public class DbInit {

    @Autowired
    private UserRepository userRepository;

    @PostConstruct
    private void postConstruct() {
        User admin = new User("admin", "admin password");
        User normalUser = new User("user", "user password");
        userRepository.save(admin, normalUser);
    }
}
```

&emsp;&emsp;如果 Bean A 需要注入 Bean P，首先就必须得生成 Bean A 和 Bean P，才能执行注入。如果使用@Autowired 注解 Bean P，@Autowired 注入是发生在 A 构造方法执行完之后的。如果在初始化 Bean A 时，要同时完成某些操作，由于在构造方法中无法创建 Bean P，可以使用@PostConstruct 注解完成自动调用。

```java
public class A {
    @Autowired
    private P p;

    public A() {
        System.out.printIn("此时Bean p并未被注入!");
    }

    @PostConstruct
    public void init() {
        System.out.printIn("@PostConstruct将在依赖注入完成后被自动调用");
    }
}
```

### @PreDestory

&emsp;&emsp;与@PostConstruct 相同，使用@PreDestroy 注释的方法可以具有任何访问级别，但不能是静态的。

&emsp;&emsp;@PreDestory 注解的方法会在 destory()方法执行之后执行。主要用于在 bean 被销毁之前释放资源或执行任何清理任务，例如关闭数据库连接。

```java
@Component
public class UserRepository {

    private DbConnection dbConnection;

    @PreDestroy
    public void preDestroy() {
        dbConnection.close();
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

&emsp;&emsp;@Inject 用于自动装配，它让您有机会使用标准注解，而不是像 @Autowired 这样的 Spring 特定注解。如果有多个相同类型的候选者，则使用 @Named 注释来解决冲突。

&emsp;&emsp;@Inject 可以使用在构造函数、属性和属性的 setter 方法上，用来注入依赖对象。

```java
public interface OrderService { interface OrderService {
  public void buyItems();
}}


@Service
public class OrderServiceImpl implements OrderService {
  private IStore store;private IStore store;

  @Inject
  private IStore store;

  @Inject
  public OrderServiceImpl(IStore store){
    this.store = store;
  }

  // Autowiring on Setter
  @Inject
  public void setStore(IStore store) {
    this.store = store;this.store = store;
  }

  public void buyItems() {
    store.doPurchase();.
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
