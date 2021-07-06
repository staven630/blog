## @Required

&emsp;&emsp;@Required 用于属性的 setter 方法上，以检查该属性是否进行了依赖注入。以 XML 配置 Bean 和注入依赖的方式来说，就是检查该属性对应的\<property>是否被正确地配置该注解的配置。否则，容器将触发 BeanInitializationException 异常。

```java
public class RequiredAnno {
    public Foo foo;
    @Required
    public void setFoo(Foo foo) {
        this.foo = foo;
    }
}
```

## @Autowired

&emsp;&emsp;@Autowired 注解可以使用在类构造器、属性和属性 Setter 方法甚至一般方法上，也可以混合使用。

- 在构造器中使用

```java
@Autowired
public AutowiredAnno(Foo foo) {
    this.foo = foo;
}
```

&emsp;&emsp;构造器的参数名和容器中存在的该类的实例名可以不一样，此时，容器会通过类型查找，如果该类的实例存在多个的话会出错。一般而言，建议保持参数的名称与需要注入依赖的 Bean 名称一致。

&emsp;&emsp;如果该 Bean 类只有一个构造器，在该构造器包含参数的状况下，不加@Autowired 注解，容器也会自动查找对象并注入。如果该类有多个构造器，则至少需要在某一个构造器上添加该注解。

- 在方法中使用

```java
@Autowired  // 在属性的Setter方法上使用
public void setBar(Bar bar) {
    this.bar = bar;
}

@Autowired  // 在一般方法上使用
public void myInitBar() {
    this.bar = bar;
}
```

&emsp;&emsp;@Autowired 可以使用在属性的 Setter 方法中，也可以用在一般方法中，但是即使一般方法没被调用，容器也会将依赖对象注入。

- 在属性中使用

```java
@Autowired
private Bar bar;
```

&emsp;&emsp;使用@Autowired 自动装配的注解后，Bean 在 XML 中的配置就不需要在处理依赖项的注入了，而只需要配置一行代码即可。

```xml
<bean id="autowiredAnno" class="com.staven.ssmi.AntowiredAnno"></bean>
```

## @Component

&emsp;&emsp;在类中使用@Component 注解，容器可以在启动时进行该类的实例化。

&emsp;&emsp;通过配置\<context:component-scan>标签即可开启@Component 的注解功能，默认状况下扫描 base-package 包下的所有@Component 和子注解（@Controller、@Service 和@Repository）标注的类进行实例化并注册。如果需要对扫描和注册的类及注解做一些过滤，有两种方式可以做到，分别是使用\<context:exclude-filter>子标签，以及使用\<context:include-filter>子标签和 use-default-filters 属性。

- \<context:exclude-filter>

&emsp;&emsp;用于排除组件扫描的条件。

```xml
<!-- 组件扫描配置 -->
<context:component-scan base-package="com.staven.ssmi.ComponentAnno">
    <context:exclude-filter type="annotation"  expression="org.springframework.stereotype.Controller" />    // 不需要扫描ComponentAnno包下的@Controller注解的类
</context:component-scan>
```

- \<context:include-filter>

&emsp;&emsp;结合 use-default-filters 实现组件扫描的包含过滤。use-default-filters 是\<context:include-filter>标签可以配置的属性，默认值为 true。如果只想扫描某种类型的注解，可以先将 use-default-filters 设为 false，之后再进行包含的过滤条件\<context:include-filter>的配置。

```xml
<context:component-scan base-package="com.staven.ssmi.ComponentAnno" use-default-filters="false">
    <context:include-filter type="annotation" expression="org.springframework.stereotype.Controller"/>
</context:component-scan>
```

&emsp;&emsp;type 用于指定过滤的类型，除了注解类型 annotation 之外，还支持 assignable、regex、aspectj 和 custom 这 4 种过滤的类型。

| type       | expression                         | 示例                                      |
| :--------- | :--------------------------------- | :---------------------------------------- |
| annotation | 设置为注解类的全路径类名           | org.springframework.stereotype.Controller |
| assignable | 设置为类和接口的全路径名           | com.staven.ssmi.UserController            |
| regex      | 可以使用正则表达式匹配包的路径或类 | com.staven.ssmi.anno.\*                   |
| aspectj    | 使用 AspectJ 类型表达式匹配包或类  | com.staven..\*Controller                  |
| custom     | 使用自定义的过滤器类               |                                           |

&emsp;&emsp;custom 自定义的过滤器来，这个类需要继承 org.springframework.core.type.TypeFilter 接口。

```java
public class MyTypeFilter implements TypeFilter {
    @Override
    public boolean match(MetadataReader metadataReader, MetadataReaderFactory metadataReaderFactory) throws IOException {
        // 得到注解定义元数据
        AnnotationMetadata annotationMetadata = metadataReader.getAnnotationMetadata();
        // 得到类元数据
        ClassMetadata classMetadata = metadataReader.getClassMetadata();
        Resource resource = metadataReader.getResource();
        // 得到类的名字
        String className = classMetadata.getClassName();
        System.out.println("Class:-->" + className);
        if (className.contains("UserController")) {
            return true;    // 如果类匹配，则返回true
        }
        return false;
    }
}
```

&emsp;&emsp;容器对每个组件注解类进行实例化时，都会调用以上过滤器的 match()方法进行判断，在\<context:component-scan>中的配置如下：

```xml
<context:exclude-filter type="custom" expression="com.staven.ssmi.MyTypeFilter" />
```

## @Bean

&emsp;&emsp;@Component 及其子注解是使用在类层级的组件注解，也可以在类方法上使用@Bean 注解类注册 Bean。

```java
@Component
public class Foo {
    @Bean
    public Bar myInitBar() {
        return new Bar();
    }
}
```

&emsp;&emsp;@Bean 注解的方法需要由非空的返回类型，返回的对象是注册 Bean 的对象。该注解只有在其方法对应的类被注册为 Bean 的状况下才有效（可以通过 XML 配置或@Component 注解配置）。

&emsp;&emsp;默认状况下，@Bean 注解方法注册的 Bean 的 id 是方法名。可以使用 name 属性指定名称，value 属性指定别名。name 和 value 可以单独分别使用，也可以一起使用，共同使用需要保持 name 和 value 的一直，否则会出错。

```java
@Bean(name="fooBean",value="fooBean")
```
