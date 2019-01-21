- utils/constants.js

```
export const SET_TOKEN = 'SET_TOKEN'
export const SET_IDENTITY = 'SET_IDENTITY'
```

- store/index.js

```
import { SET_TOKEN, SET_IDENTITY } from '../utils/constants'

export const state = () => ({
  token: '',
  identity: 3, // 1表示管理员身份，2 表示管理员以访客身份 3 表示访客
})

export const mutations = {
  [SET_TOKEN](state, token) {
    state.token = token
  },
  [SET_IDENTITY](state, identity) {
    state.identity = identity
  }
}

export const actions = {
  // 判断是否是管理员
  async nuxtServerInit({ commit }, { query, $axios }) {
    if (query.code) {
      const result = await $axios.post('/admin/login', {
        code: query.code
      })
      if (result.status === 200 && result.data.data && result.data.data.access_token) {
        commit(SET_TOKEN, result.data.data.access_token)
        commit(SET_IDENTITY, 1)
      }
    }
  }
}
```
