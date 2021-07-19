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
