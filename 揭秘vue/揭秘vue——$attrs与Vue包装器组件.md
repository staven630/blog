# Vue2.0中包装器组件
### inheritAttrs
&emsp;&emsp;此属性不影响class和style属性的继承。

&emsp;&emsp;默认值为true，父组件不被认作prop的特性绑定将会“回退”且新作为普通html特性应用下子组件的根元素上。

&emsp;&emsp;设为false，这些默认行为将会去掉。但是可以通过$attrs让这些特性生效，通过v-bind显性绑定到非根元素上。

### $attrs
&emsp;&emsp;包含了父组件中所有属性，除props定义的特性绑定、class、style之外。也就是说，当组件没有声明任何prop时，将会包含父组件除class、style之外的其他所有属性。并且可以通过v-bind="$attrs"传入内部组件。

### $listeners
&emsp;&emsp;包含了父作用域中，除.native修饰之外的v-on事件监听器。可以通过v-on="$listeners"传入内部组件。

### 包装器组件
&emsp;&emsp;通常需要在基础组件上，扩展更多功能的组件。比如picker组件，需要扩展date-picker、color-picker组件。这样新扩展的组件可被成为包装器组件。

&emsp;&emsp;创建自适应组件date-picker时，需要保留基础组件picker原有的api，以保持组件的一致性。可利用v-bind="$props"和v-on="$listeners"快捷实现:

```js
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
# Vue3.0中包装器组件
&emsp;&emsp;Vue3.0中，不再有属性的自动继承，也就无需手动设置inheritAttrs: false。

&emsp;&emsp;vue2.0中通过\$listeners属性访问的组件的non-emitted侦听器现在也包含在$attrs中。

&emsp;&emsp;v-model编译成model-value和on-model-update。
```js
<template>
  <Picker v-bind="$attrs"  />
</template>

<script>
  import Picker from "@components/Picker";

  export default {
    props: ['date'],
    components: {
      Picker
    }
  };
</script>
```