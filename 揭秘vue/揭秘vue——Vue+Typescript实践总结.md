> [vue-ts-boilerplate](https://github.com/staven630/vue-ts-boilerplate)
      
&emsp;&emsp;集成了按需加载及自定义主题的elementui、功能齐全的axios、vuex-persist+localforage状态持久化、pritter自动格式化

# tslint、pritter配置
> tsconfig.json
```
{
  "compilerOptions": {
    "paths": {
      "@/*": ["src/*"],
      "@assets/*": ["src/assets/*"],
      "@scss/*": ["src/assets/scss/*"],
      "@components/*": ["src/components/*"],
      "@plugins/*": ["src/plugins/*"],
      "@utils/*": ["src/utils/*"],
      "@views/*": ["src/views/*"],
      "@router/*": ["src/router/*"],
      "@store/*": ["src/store/*"],
      "@static/*": ["src/static/*"]
    }
  }
}
```

> tslint.json

```
"no-var-requires": false,
"no-any": false,
"no-empty": [true, "allow-empty-catch", "allow-empty-functions"],
"semicolon": [false, "always", "ignore-bound-class-methods"] // 禁止末尾分号
"member-access": [true, "no-public"],
"trailing-comma": [
  false,
  { "multiline": "always", "singleline": "never", "jsx": "never" }
]
```

> setting.json

```
{
  "editor.fontSize": 14,
  "editor.tabSize": 2,
  "editor.wordWrap": "on",
  "editor.formatOnSave": true,
  "files.autoSave": "off",

  "emmet.triggerExpansionOnTab": true,
  "emmet.includeLanguages": {
    "vue-html": "html",
    "vue": "html",
    "javascript": "javascriptreact",
    "wxml": "html"
  },
  "emmet.syntaxProfiles": {
    "vue-html": "html",
    "vue": "html",
    "javascript": "jsx"
  },

  "files.associations": {
    "*.html": "html",
    "*.js": "javascriptreact",
    "*.vue": "vue",
    "*.cjson": "jsonc",
    "*.wxss": "css",
    "*.wxs": "javascript",
    "*.ts": "typescriptreact"
  },

  "eslint.autoFixOnSave": true, // 保存时自动fix
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    { "language": "typescript", "autoFix": true },
    { "language": "typescriptreact", "autoFix": true },
    { "language": "vue", "autoFix": true },
    { "language": "html", "autoFix": true }
  ],

  "tslint.autoFixOnSave": true,
  "typescript.format.enable": false,

  "prettier.eslintIntegration": true, // 开启 eslint 支持
  "prettier.tslintIntegration": true,
  "prettier.semi": false, //去掉代码结尾的分号
  "prettier.singleQuote": true, // 强制单引号

  "vetur.validation.template": false,
  "vetur.format.defaultFormatter.html": "js-beautify-html",
  "vetur.format.defaultFormatter.js": "vscode-typescript", //让vue中的js按编辑器自带的ts格式进行格式化
  "vetur.format.defaultFormatter.ts": "vscode-typescript",
  // "vetur.format.defaultFormatter.ts": "none",
  "vetur.format.defaultFormatterOptions": {
    "js-beautify-html": {
      "wrap_attributes": "force-aligned" // 属性强制折行对齐
    }
  }
}
```

# 文件声明

### 让 ts 识别.vue 文件

```
declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}
```

### 扩展 vue 全局方法

```
import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $message: (text: string) => void
  }
}
```

```
this.$message('提示') // 将会顺利编译通过
```

### 扩展 vue 的属性与组件选项

```
import Vue from 'vue'

declare module 'vue/types/vue' {
  // 可以使用 `VueConstructor` 接口,来声明全局属性
  interface VueConstructor {
    $myGlobal: string
  }
}

// ComponentOptions 声明于 types/options.d.ts 之中
declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    myOption?: string
  }
}
```

&emsp;&emsp;使用

```
// 全局属性
console.log(Vue.$myGlobal)

// 额外的组件配置项
var vm = new Vue({
  myOption: 'Hello'
})
```

### 第三方库声明

```
declare module 'vue-awesome-swiper' {
  export const swiper: any
  export const swiperSlide: any
}

declare module 'vue-lazyload'
```

# Vue-Router

```
import Vue, { AsyncComponent } from 'vue'
import Router, { RouteConfig } from 'vue-router'

Vue.use(Router)

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue'),
  },
]

const router: Router = new Router({
  mode: 'history',
  base: '/',
  routes,
})

export default router
```

# Vuex

### vuex 相关 d.ts

> typings/ajax.js

```
declare namespace Ajax {
  export interface AxiosResponse {
    data: AjaxResponse;
  }

  export interface AjaxResponse {
    code: number;
    data: any;
    message?: string;
  }
}
```

> typings/store.js

```
declare namespace StoreState {
  interface User {
    name: string,
    age: number
  }

  export interface article {
    url: string,
    imgUrl: string,
    title: string
  }
}
```

### vuex 相关文件

> store/index.ts

```
import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import getters from './getters'
import mutations from  './mutations'
import actions from './actions'


Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
```

> store/constants.ts

```
export const SET_LOGIN: string = 'SET_LOGIN'

export const SET_ARTICLE: string = 'SET_ARTICLE'
```

> store/state.ts

```
interface State {
  login: Boolean,
  articles: StoreState.article[]
}

const state: State = {
 login: false,
 articles: []
}

export default state
```

> store/getters.ts

```
import { GetterTree } from 'vuex'

const getters: GetterTree<any, any> = {
  load(state): boolean {
    return state.login;
  }
}

export default getters
```

> store/mutations.ts

```
import * as TYPES from './constants'
import { MutationTree } from 'vuex'
import { SET_LOGIN } from './constants';

const mutations: MutationTree<any> = {
  [TYPES.SET_LOGIN](state, val): void {
    state.login = val;
  },
  [TYPES.SET_ARTICLE](state, articles): void {
    state.articles = articles;
  }
}

export default mutations
```

> store/actions.ts

```
import { ActionTree } from 'vuex'
import axios from 'axios'
import * as TYPES from './constants'


const actions: ActionTree<any, any> = {
  async init({dispatch}) {
    dispatch('login')
    dispatch('setArticles', [])
  },
  async login({ state, commit }) {
    const { data }: Ajax.AxiosResponse = await axios.get('/user/login')
    if (data.code === 200) {
      commit(TYPES.SET_LOGIN, !!data.data.token)
    }
  },
  setArticles({commit}, articles: StoreState.article[]) {
    commit(TYPES.SET_ARTICLE, articles)
  }
}

export default actions
```
