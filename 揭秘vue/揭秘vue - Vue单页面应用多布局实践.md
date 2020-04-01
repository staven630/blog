&emsp;&emsp;不同业务场景下多种布局，经常出现多种布局需求，或者是某些布局会重叠实现。针对 vue 单页面应用，要想实现个性化布局，某种程度上还是不太方便的。Nuxt.js 提供了 layout 属性。下面设置是基于 slot 与 router-view 的尝试。

### 实例演示

[![Edit vue-multi-layout](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/j27o7qj21w)

### 定义布局组件

- layouts/Default.vue

```
<template>
  <div>
    <header>Header</header>
    <Navbar />
    <slot />
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
export default {
  components: {
    Navbar
  }
};
</script>

<style scoped>
header {
  background: #000000;
  color: #fff;
  text-align: center;
  line-height: 60px;
}
</style>
```

- layouts/NoHeader.vue

```
<template>
  <div><Navbar /><slot /></div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
export default {
  components: { Navbar }
};
</script>

<style scoped></style>
```

### 注册布局组件

- main.js

```
import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import DefaultLayout from "./layouts/Default.vue";
import NoHeaderLayout from "./layouts/NoHeader.vue";

Vue.component("default-layout", DefaultLayout);
Vue.component("no-header-layout", NoHeaderLayout);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
```

### 监听路由变化，设置动态布局组件

- App.vue

```
<template>
  <div id="app">
    <component :is="layout" v-if="layout">
      <Transition>
        <router-view></router-view>
      </Transition>
    </component>
  </div>
</template>

<script>
import Transition from "./components/Transition";
export default {
  components: {
    Transition
  },
  data() {
    return {
      layout: null
    };
  },
  watch: {
    $route: {
      handler(newVal) {
        const layoutName = (newVal.meta && newVal.meta.layout) ? newVal.meta.layout : "default";
        this.layout = `${layoutName}-layout`;
      },
      deep: true
    }
  }
};
</script>

<style lang="scss">
body {
  padding: 0;
}
</style>

```

### 通过 meta 设置布局方式

&emsp;&emsp;通过 meta 元信息中 layout 属性设置布局名称。名称为 main.js 中注册的布局组件名去掉-layout 后缀。默认 default 布局(layouts/Default.vue)。

```
import Vue from "vue";
import Router from "vue-router";
import auth from "./middlewares/auth";
import { nextHandler } from "./utils";

Vue.use(Router);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import(/* webpackChunkName='home' */ "./views/Home.vue"),
    meta: {
      transition: "slide"
    }
  },
  {
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName='login' */ "./views/Login.vue")
  },
  {
    path: "/user",
    name: "user",
    component: () => import(/* webpackChunkName='user' */ "./views/User.vue"),
    meta: {
      // transition: "slide",
      middleware: [auth]
    }
  },
  {
    path: "/about",
    name: "about",
    component: () => import(/* webpackChunkName='about' */ "./views/About.vue"),
    meta: {
      layout: "no-header",
      transition: "zoom"
    }
  }
];

const router = new Router({
  routes
});

router.beforeEach((to, from, next) => nextHandler(to, from, next, router));

export default router;
```

注：自从用了多布局，页面路由切换动画特效只有在统一布局间跳转才有效。切换布局后貌似没效果了，后续再研究下。
