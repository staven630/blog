# 监听子组件 Hooks

&emsp;&emsp;使用 hook:为前缀，为 vue 生命周期钩子注册自定义事件。

```

<template>
  <Child @hook:mounted="childMounted"/>
</template>


<script>
import Child from './child'
export default {
  components: {
    Child
  },
  methods: {
    childMounted() {
      console.log('Child was mounted')
    }
  }
}
</script>
```

# 动态注册 Hooks

&emsp;&emsp;可以是使用$on,$once,\$off 动态注册生命周期 hooks 事件。

```
<template>
  <div></div>
</template>
<script>
import Pickaday from 'Pickaday'
export default {
  mounted() {
    const picker = new Pickaday({})
    this.$once('hook:beforeDestory', () => {
      picker.destory()
    })
  }
}
</script>
```