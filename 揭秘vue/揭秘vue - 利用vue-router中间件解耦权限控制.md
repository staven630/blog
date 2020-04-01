&emsp;&emsp;后端早就有了 AOP 这个概念，也即面向切面编程。AOP 提倡从横向切面思路向管道某个位置插入一段代码逻辑，这样就实现在任何业务逻辑前后都有相同代码逻辑段，开发者只需专注写业务逻辑，既不影响主流程，而且隔离了业务逻辑，达到高内聚低耦合。

### utils

&emsp;&emsp;nextFactory 方法收集 to.meta 中 middleware 的配置，空配置，则走默认的 next()操作。如有 middleware 配置，则首先执行第一个中间件。nextFactory 方法对 next 操作进行包裹，递归调用下一个 middleware，直至结束。

- utils/index.js

```
const ACCESS_TOKEN = "access_token";
const DOMAIN_NAME = "";
const EXPIRE_TIME = 2;

// 设置cookie, expiredays有效天数
export const setCookie = (
  value,
  key = ACCESS_TOKEN,
  expiredays = EXPIRE_TIME
) => {
  value = encodeURIComponent(value);
  const exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  const exdatestr = exdate.toUTCString();
  document.cookie =
    typeof DOMAIN_NAME !== "undefined"
      ? `${key}=${value};expires=${exdatestr};path=/;domain=${DOMAIN_NAME}`
      : `${key}=${value};expires=${exdatestr};path=/;`;
};

export const getCookie = (key = ACCESS_TOKEN) => {
  const reg = new RegExp(`(^| )${key}=([^;]*)(;|$)`);
  const arr = document.cookie.match(reg);
  return arr ? decodeURIComponent(arr[2]) : null;
};

// 清除cookie
export const removeCookie = (key = ACCESS_TOKEN) => {
  setCookie("", key, -1);
};

export const getStorage = (key = ACCESS_TOKEN, day = EXPIRE_TIME) => {
  const dateStr = localStorage.getItem(key);
  if (!dateStr) return null;
  const obj = JSON.parse(dateStr);
  if (new Date().getTime() - Number(obj.date) > 86400000 * day) return null;
  return obj.value;
};

export const setStorage = (value, key = ACCESS_TOKEN) => {
  const params = {
    date: new Date().getTime(),
    value
  };
  localStorage.setItem(key, JSON.stringify(params));
};

export const removeStorage = (key = ACCESS_TOKEN) => {
  localStorage.removeItem(key);
};

export const clearStorage = () => {
  localStorage.clear();
};

export const nextFactory = (ctx, middleware, index) => {
  const subsequentMiddleware = middleware[index];
  if (!subsequentMiddleware) return ctx.next;
  return (...params) => {
    ctx.next(...params);
    const nextMiddleware = nextFactory(ctx, middleware, index + 1);
    subsequentMiddleware({ ...ctx, next: nextMiddleware });
  };
};

export const nextHandler = (to, from, next, router) => {
  let middleware = to.meta.middleware;
  if (!middleware) return next();
  middleware = Array.isArray(middleware) ? middleware : [middleware];
  const ctx = { to, from, next, router };
  const nextMiddleware = nextFactory(ctx, middleware, 1);
  return middleware[0]({ ...ctx, next: nextMiddleware });
};
```

### 中间件

- middlewares/auth.js

```
import { getStorage } from "../utils";
export default ({ next, router }) => {
  return getStorage() ? next() : router.push({ name: "login" });
};
```

- middlewares/log.js

```
export default ({ next, to }) => {
  console.log(to.name);
  return next();
};
```

### 调用

&emsp;&emsp;在需要添加中间件的地方配置 meta 的 middleware 属性，可为单个中间件，也可以是一个中间件数组。

```
import Router from "vue-router";
import vue from "vue";
import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import auth from "../middlewares/auth";
import log from "../middlewares/log";

import { nextHandler } from "../utils";

vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        middleware: log
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        middleware: log
      }
    },
    {
      path: "/user",
      name: "user",
      component: () =>
        import(/* webpackChunkName: 'user */ "../pages/User.vue"),
      meta: {
        middleware: [auth, log]
      }
    }
  ]
});

router.beforeEach((to, from, next) => nextHandler(to, from, next, router));

export default router;
```
