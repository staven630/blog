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

&emsp;&emsp;如果 Bean A 需要注入 Bean B，首先就必须得生成 Bean A 和 Bean B，才能执行注入。如果使用@Autowired 注解 Bean B，@Autowired 注入是发生在 A 构造方法执行完之后的。如果在初始化 Bean A 时，要同时完成某些操作，由于在构造方法中无法创建 Bean B，可以使用@PostConstruct 注解完成自动调用。

```java
public class A {
    @Autowired
    private B b;

    public A() {
        System.out.printIn("此时Bean B并未被注入!");
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

&emsp;&emsp;这是 JSR250 规范的实现，通过 CommonAnnotationBeanPostProcessor 类实现依赖注入。用来标注系统或容器中资源类型的对象引用，包括持久层访问对象资源(DAO)、文件或容器等资源。可以使用在属性和属性的 setter 方法上。

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

&emsp;&emsp;@Resource 注解的属性或 setter 方法，默认会以属性名或 setter 方法参数名去查找容器中的对象，如果没找到，则使用类来查找和注入。也可以显示地使用属性 name 来查找指定名称的 Bean 的实例。

```java
public class ResourceAnno {
    @Resource(name="foo")  // 通过名字查找容器中对应的对象
    private com.staven.Foo foo;
}
```

## @Inject

&emsp;&emsp;@Inject 是 JSR330 中的规范，通过 AutowiredAnnotationBeanPostProcessor 类实现的依赖注入，用于自动装配。

&emsp;&emsp;如果有多个相同类型的 Bean，则使用 @Named 注释来解决冲突。

&emsp;&emsp;@Inject 可以使用在构造函数、属性和属性的 setter 方法上，用来注入依赖对象。

1. 在属性上注解

- 属性不能是 final 的
- 拥有一个合法的名称

2. 在方法上注解

- 不能是抽象方法
- 不能声明自身参数类型
- 可以由返回结果
- 拥有一个合法的名称
- 可以有 0 个或多个参数

```java
public interface ProductService {
  public void buy();
}


@Service
public class ProductServiceImpl implements ProductService {
  @Inject // 属性注解
  private IStore store;

  @Inject // 构造函数注解
  public ProductServiceImpl(IStore store){
    this.store = store;
  }

  @Inject // setter方法注解
  public void setStore(IStore store) {
    this.store = store;this.store = store;
  }

  public void buy() {
    store.doPurchase();
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

## @Autowired、@Inject、@Resource 异同

&emsp;&emsp;@Autowired 和@Inject 基本是一样的，因为两者都是使用 AutowiredAnnotationBeanPostProcessor 来处理依赖注入。但是@Resource 是个例外，它使用的是 CommonAnnotationBeanPostProcessor 来处理依赖注入。当然，两者都是 BeanPostProcessor。

### @Autowired 和@Inject

&emsp;&emsp;默认 autowired by type，可以通过@Qualifier 显式指定 autowired by qualifier name。

&emsp;&emsp;使用@Autowired 生成依赖注入时，必须生成相应类的 set 方法，然后使用@Autowired 注解在 setter 方法上，才能实现依赖注入。

```java
@Controller
public class ProductController {
    private ProductService productService;

     @Autowired
     public void setProjectService(ProductService productService) {
         this.productService = productService;
     }
 }
```

&emsp;&emsp;如果我们使用 javax.inject.jar，只需要在相应类的属性上面加上@Inject：

```java
@Controller
public class ProductController {
    @Inject
    private ProductService productService;
}
```

### @Resource

&emsp;&emsp;默认 autowired by field name，如果 autowired by field name 失败，会退化为 autowired by type，可以通过@Qualifier 显式指定 autowired by qualifier name，如果 autowired by qualifier name 失败，会退化为 autowired by field name。但是这时候如果 autowired by field name 失败，就不会再退化为 autowired by type。
