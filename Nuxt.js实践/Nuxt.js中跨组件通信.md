- plugins/bus.js

```
import Vue from 'vue'

const bus = new Vue()

Vue.prototype.$bus = {
  on(...event) {
    bus.$on(...event)
  },
  off(...event) {
    bus.$off(...event)
  },
  emit(...event) {
    bus.$emit(...event)
  }
}

```

- 修改 nuxt.config.js

```
module.exports = {
  plugins: [
     { src: "~plugins/bus.js", ssr: false }
  ]
}
```

- 使用

```
export default {
  mounted () {
    this.$bus.on('search', this.getData);
  },
  destroyed () {
    this.$bus.off('search', this.getData);
  },
  methods: {
    async getData ({ type, keyword }) {
      const result = await this.$axios.get(+type === 0 ? `/article/search?icon=${type}` : `/article/search?icon=${type}&name=${keyword}`);
      console.log(result);
    }
  }
}
```

```
this.$bus.emit('search', {
  keyword: this.keyword,
  type: this.searchType
});
```
