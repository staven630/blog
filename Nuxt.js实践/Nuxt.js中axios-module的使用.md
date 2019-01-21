# 安装依赖

```
npm install @nuxtjs/axios
```

# plugins/axios.js

```
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
    if (error.response && error.response.data) {
      return console.log(error.response.data)
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
