- 安装依赖

```
npm i vuex-persistedstate
```

- plugins/persistedstate.js

```
import createPersistedState from 'vuex-persistedstate'

export default ({ store, isHMR }) => {
  if (isHMR) return
  if (process.client) {
    window.onNuxtReady(() => {
      createPersistedState({
        storage: window.sessionStorage
      })(store)
    })
  }
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

```
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'
import cookie from 'cookie'

export default ({ store, req, isDev }) => {
  createPersistedState({
    key: 'your-application-name',
    storage: {
      getItem: key =>
        process.client
          ? Cookies.getJSON(key)
          : cookie.parse(req.headers.cookie || '')[key],
      setItem: (key, value) =>
        Cookies.set(key, value, { expires: 365, secure: !isDev }),
      removeItem: key => Cookies.remove(key)
    }
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
