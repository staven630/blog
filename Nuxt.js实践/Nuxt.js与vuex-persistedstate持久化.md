- 安装依赖

```
npm i vuex-persistedstate
```

- plugins/persistedstate.js

```
import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState()(store)
  })
}
```

&emsp;&emsp;如果希望使用 cookie 存储，则可以使用如下配置

```
npm i js-cookie
```

```
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from "js-cookie";

const cookieStorage = {
  getItem: function(key) {
    return Cookies.getJSON(key);
  },
  setItem: function(key, value) {
    return Cookies.set(key, value, {expires: 3, secure: false});
  },
  removeItem: function(key) {
    return Cookies.remove(key);
  }
};

export default ({ store }) => {
  createPersistedState({
    storage: cookieStorage,
    getState: cookieStorage.getItem,
    setState: cookieStorage.setItem
  })(store)
}
```

- 修改 nuxt.config.js

```
module.exports = {
  plugins: [
     { src: "~plugins/persistedstate.js", ssr: false }
  ]
}
```
