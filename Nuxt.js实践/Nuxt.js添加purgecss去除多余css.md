# 方案一：Nuxt.js 添加 purgecss

- 安装依赖

```
npm i -D nuxt-purgecss
```

- nuxt.config.js

```
module.exports = {
  modules: [
     'nuxt-purgecss'
  ],
  build: {
    extractCSS: true
  }
}

```

# 方案二：purgecss-webpack-plugin

- 安装依赖

```
npm i -D purgecss-webpack-plugin glob-all
```

- nuxt.config.js

```
const PurgecssPlugin = require('purgecss-webpack-plugin')
const glob = require('glob-all')
const path = require('path')

module.exports = {
  build: {
    extractCSS: true,
    extend(config, ctx) {
      if (!ctx.isDev) {
        config.plugins.push(
          new PurgecssPlugin({
            paths: glob.sync([
              path.join(__dirname, './pages/**/*.vue'),
              path.join(__dirname, './layouts/**/*.vue'),
              path.join(__dirname, './components/**/*.vue')
            ]),
            extractors: [
              {
                extractor: class Extractor {
                  static extract(content) {
                    return content.match(/[A-z0-9-:/]+/g) || []
                  }
                },
                extensions: ['vue']
              }
            ],
            whitelist: ['html', 'body', 'nuxt-progress']
          })
        )
      }
    }
  }
}

```
