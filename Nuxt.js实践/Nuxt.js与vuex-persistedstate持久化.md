### 安装依赖

```
npm install -S vuex-persistedstate
```

### 自定义插件

- plugins/persistedstate.js

```
import createPersistedState from "vuex-persistedstate";

export default ({store, isHMR}) => {
  if (isHMR) return;

  if (process.client) {
    window.onNuxtReady((nuxt) => {
      createPersistedState()(store);
    });
  }
};
```

### nuxt.config.js 配置插件

```
plugins: [
  { src: "~plugins/persistedstate.js", ssr: false }
]
```

[js-cookie 方案](https://github.com/nuxt/nuxt.js/issues/972)
