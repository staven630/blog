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
