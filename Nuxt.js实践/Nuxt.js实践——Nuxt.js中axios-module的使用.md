# 安装依赖

```
npm install @nuxtjs/axios
```

# plugins

- utils/constants.js

```
export const SET_TOKEN = 'SET_TOKEN'
export const SET_IDENTITY = 'SET_IDENTITY'
```

- plugins/axios.js

```
import { SET_TOKEN, SET_IDENTITY } from '../utils/constants'

import Vue from 'vue'

const ERRORS = new Map([
  [10000, '未知错误'],
  [10001, '数据验证错误'],
  [10002, '添加失败']
])

const AUTH_ERRORS = new Map([
  [20001, '身份认证错误，请重新登录'],
  [20002, '身份失效，请重新登录'],
  [20003, '身份失效，请重新登录']
])

const vm = new Vue({})

export default ({ store, $axios }) => {
  $axios.onRequest(config => {
    const token = store.state.token
    if (token) {
      config.headers.common['Authorization'] = `Bearer ${token}`
    }
    return config
  })

  $axios.onResponse(response => {
    if (!response.data) return response
    return response.data.data ? response.data.data : response.data
  })

  $axios.onError(error => {
    if (process.browser && error.response && error.response.data) {
      const code = error.response.data.code
      if (AUTH_ERRORS.has(code)) {
        vm.$message &&
          vm.$message({
            message: AUTH_ERRORS.get(code),
            type: 'error'
          })
        store.commit(SET_TOKEN, '')
        store.commit(SET_IDENTITY, 3)
        return
      }

      if (ERRORS.has(code)) {
        return (
          vm.$message &&
          vm.$message({
            message: ERRORS.get(code),
            type: 'error'
          })
        )
      }

      throw error
    }
  })
}
```

# 修改 nuxt.config.js

```
const BASE_API =
  process.env.BASE_API === 'prod' ? 'https://xingqiu.com' : 'https://xingqiu.cn'
module.exports = {
  mode: 'universal',
  plugins: [
    { src: '@/plugins/axios', ssr: false }
  ],

  env: {
    baseUrl: process.env.BASE_URL || BASE_API
  },
  modules: [
    '@nuxtjs/axios'
  ],
  axios: {
    baseURL: BASE_API + '/api'
  }
}
```

# 使用

### 使用 app.\$axios 或\$axios 来请求数据

- nuxtServerInit({commit}, {app, \$axios})
- asyncData({app, \$axios})
- fetch({app, \$axios})

### Authorization 使用范围

- 在 plugins/axios.js 中设置的 Authorization 仅限于客户端请求携带
- 服务端需要单独设置
