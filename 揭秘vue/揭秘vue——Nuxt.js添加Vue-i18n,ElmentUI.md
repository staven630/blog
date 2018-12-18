- plugins/vuei18n.js

```
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from 'element-ui/lib/locale/lang/en'
import ko from 'element-ui/lib/locale/lang/ko'
Vue.use(VueI18n)
export default ({ app, store }, inject) => {
  const messages = { en, ko }
  app.i18n = new VueI18n({
    locale: 'ko',
    fallbackLocale: 'zh-CN',
    messages,
    silentTranslationWarn: true
  })
}
```

- plugins/element-ui.js

```
import "../theme/index.css"
import Element from "element-ui"
import Vue from "vue"
export default ({ app }) => {
  Vue.use(Element, { i18n: (key, value) => app.i18n.t(key, value) })
}
```

- nuxt.config.js

```
module.exports = {
  plugins: [
    '~/plugins/vueI18n',
    '~/plugins/element-ui'
  ]
}
```
