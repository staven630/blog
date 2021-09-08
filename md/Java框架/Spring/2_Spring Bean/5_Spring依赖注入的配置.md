## 集合类型的依赖注入

### list 与 set

&emsp;&emsp;<list\>类型与<set\>的配置方式类似，使用子元素<value\>配置字符串等简单类型，使用子元素<ref\>的 Bean 属性配置其他 Bean 的依赖。

```xml
<property name="myList">
    <list>
        <value>value1</value>
        <value>value2</value>
        <ref bean="foo" />
    </list>
</property>
```

### map

&emsp;&emsp;<map\>使用子元素<entry\>配置键值对的元素，属性 key 指定键的名称，value 配置对应的值，使用 value-ref 配置其他 Bean 的引用。

```xml
<map>
    <entry key="key1" value="value1" />
    <entry key="key2">
        <value>value 2</value>
    </entry>
    <entry key="bean ref" value-ref="foo" />
</map>
```

### props

&emsp;&emsp;<map\>对应的是 java.util.Properties 的对象，用来配置字符串类型的键和值的属性，可以看成是对<map>的简化。使用<prop>子元素的 key 指定键，子元素的内容为值。

```xml
<props>
    <prop key="key1">value1</prop>
    <prop key="key2">value2</prop>
</props>
```

## 内部 Bean 的依赖注入

&emsp;&emsp;ref 属性常用来引用外部 Bean。当引用的 Bean 只有当前 Bean 使用，可以以年内部 Bean 的方式注入。

&emsp;&emsp;内部 Bean 是匿名的，不能独立访问，不需要指定 id 或 name 作为标识。直接在<bean\>配置的内部嵌套内部 Bean 配置。

```xml
<bean id="outBean" class="com.staven.OutBeanClass">
    <constructor-arg>
        <bean class="com.staven.InnerBeanClass">
            <property name="name" value="inner" />
            <!-- or -->
             <!-- <constructor-org name="name" value="inner" /> -->
        </bean>
    </constructor-arg>
</bean>
```

## Bean 方法的替换

&emsp;&emsp;当第三方提供的类方法无法满足需求时，可以配置 Bean 的 replaced-method 元素来覆盖方法。

&emsp;&emsp;通过新的类替换旧的类的方法：

> OldBean

```java
public class OldBean {
    public String study(String name) {
        String str = "";
        return str;
    }
}
```

&emsp;&emsp;新的类需要实现 MethodReplacer 接口并重写 reimplement 方法：

> NewBean

```java
public class NewBean implements MethodReplacer {
    @Override
    public Object reimplement(Object o, Method method, Object[] objects) throws Throwable {
        String inputParam = (String) objects[0];
        String str = inputParam + ", new String= react";
        return str;
    }
}
```

&emsp;&emsp;Bean 配置如下；

```xml
<bean id="newBean" class="com.staven.NewBean"/>
<bean id="oldBean" class="com.staven.OldBean">
    <replaced-method name="study" replacer="newBean">
        <arg-type>Spring</arg-type>
    </replaced-method>


</bean>
```

## 前置依赖注入

&emsp;&emsp;假设 Bean A 和 Bean B，A 和 B 互不依赖，但是 B 的某些值的初始化又依赖于 A，这种关系叫前置依赖。Spring 中使用 depends-on 属性配置前置依赖。

```xml
<bean id="beanB" class="com.staven.BeanBClass" depends-on="com.staven.BeanAClass" />
```
