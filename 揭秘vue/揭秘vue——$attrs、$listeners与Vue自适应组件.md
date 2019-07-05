# inheritAttrs
&emsp;&emsp;默认值为true，继承所有的父组件除作为prop特性绑定之外的所有属性。
<br />
&emsp;&emsp;设为false，则只会继承class和style属性。

# $attrs
&emsp;&emsp;包含了父组件中所有属性，除props定义的特性绑定、class、style之外。也就是说，当组件没有声明任何prop时，将会包含父组件除class、style之外的其他所有属性。并且可以通过v-bind="$attrs"传入内部组件。

# $listeners
&emsp;&emsp;包含了父作用域中，除.native修饰之外的v-on事件监听器。可以通过v-on="$listeners"传入内部组件。

# 包装组件
&emsp;&emsp;通常需要在基础组件上，扩展更多功能的组件。比如picker组件，需要扩展date-picker、color-picker组件。这样新扩展的组件可被成为自适应组件(也成为代理、包装器组件)。

&emsp;&emsp;创建自适应组件date-picker时，需要保留基础组件picker原有的api，以保持组件的一致性。可利用v-bind="$props"和v-on="$listeners"快捷实现:

```
<template>
  <Picker v-bind="$props" v-on="$listeners" />
</template>

<script>
  import Picker from "@components/Picker";

  export default {
    props: Picker.props,
    components: {
      Picker
    }
  };
</script>
```
