&emsp;&emsp;开发过程中，常常会遇见集中固定布局，比如：
* 默认布局：包含Navbar组件、页面主体内容、Footer页脚组件
* 导航栏布局：包含Navbar组件、页面主体内容
* 空布局：只包含主体内容，比如登录、注册页

&emsp;&emsp;解决这种需求，使用组件拼装、路由分发也能完成，但使用动态布局可能会更加事半功倍。

[![Edit vue-multi-layout](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/embed/happy-sun-rvtw3?fontsize=14&hidenavigation=1&theme=dark)


### 创建布局组件
&emsp;&emsp;首先创建各部局组件，组件需要添加name属性，指定组件名称如“default-layout”。在布局的可变部分使用\<slot \/>插槽预留给异步组件的内容部分。
> src/layouts/DefaultLayout.vue
```jsx
<template>
  <div class="wrapper">
    <header class="header">Header</header>
    <div class="main">
      <div class="aside">Aside</div>
      <div class="content"><slot /></div>
    </div>
    <footer class="footer">Footer</footer>
  </div>
</template>

<script>
export default {
  name: "default-layout",
};
</script>
```
> src/layouts/EmptyLayout.vue
```jsx
<template>
  <div class="wrapper">
    <header class="header">Header</header>
    <div class="main">
      <div class="aside">Aside</div>
      <div class="content"><slot /></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "navbar-layout",
};
</script>
```
> src/layouts/NavbarLayout.vue
```jsx
<template>
  <div class="wrapper">
    <slot />
  </div>
</template>

<script>
export default {
  name: "empty-layout",
};
</script>
```
> src/layouts/index.js
```js
import DefaultLayout from "./DefaultLayout.vue";
import EmptyLayout from "./EmptyLayout.vue";
import NavbarLayout from "./NavbarLayout.vue";

export default function createLayout(app) {
  const components = [DefaultLayout, EmptyLayout, NavbarLayout];
  components.forEach((component) => {
    app.component(component.name, component);
  });
}
```

### 注册布局组件
&emsp;&emsp;需要动态加载布局组件，需要现在全局中注册布局组件。
> main.js
```js
import { createApp } from "vue";
import App from "./App.vue";
import createLayout from "@/layouts/index";

import router from "@/router";

const app = createApp(App);

createLayout(app); // 注册动态布局组件

app.use(router);
app.mount("#app");
```

### 配置动态布局
> router/index.js
```js
import { createRouter, createWebHistory } from "vue-router";

export const loadView = (view) => {
  return () =>
    import(/* webpackChunkName: "[request]" */ `@/views/${view}.vue`);
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: loadView("Home")
  },
  {
    path: "/about",
    name: "About",
    component: loadView("About"),
    meta: {
      layout: "navbar"
    }
  },
  {
    path: "/:pathMath(.*)",
    name: "PageNotFound",
    component: loadView("PageNotFound"),
    meta: {
      layout: "empty"
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL || '/'),
  routes,
});

export default router;
```

### 使用异步组件加载动态布局
&emsp;&emsp;直接访问某页面，首次加载会先出现meta.layout为“undefined”，然后可能meta.layout会是在路由中配置的值。
> App.vue
```vue
<template>
  <component :is="layout" v-if="isInitedLayout">
    <router-view></router-view>
  </component>
</template>

<script>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
export default {
  setup() {
    // 是否是初始化布局
    const isInitedLayout = ref(false)
    const layout = ref(null)
    const route = useRoute()

    watch(
      () => route?.meta?.layout,
      (e) => {
        if (!isInitedLayout.value) {
          isInitedLayout.value = true
        } else {
          layout.value = `${e || 'default'}-layout`
        }
      },
      {
        deep: true,
        immediate: true,
      }
    )

    return {
      isInitedLayout,
      layout,
    }
  },
}
</script>
```