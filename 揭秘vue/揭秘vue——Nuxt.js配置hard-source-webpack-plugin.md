Nuxt.js 配置 hard-source-webpack-plugin

```
npm i -D hard-source-webpack-plugin
```

```
 build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      if (ctx.isDev) {
        config.plugins.push(
          new HardSourceWebpackPlugin({
            cacheDirectory: '.cache/hard-source/[confighash]'
          })
        )
      }
  }
```
