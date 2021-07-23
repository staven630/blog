# 创建项目

&emsp;&emsp;基于 vue-cli 搭建 vue3.0 项目框架。

```bash
npx  @vue/cli create vue3-cesium
```

&emsp;&emsp;下载 cesium

```bash
npm i -S cesium
```

# 配置 vue.config.js 兼容 cesium 打包

```bash
npm i -D strip-pragma-loader hard-source-webpack-plugin
```

&emsp;&emsp;配置 vue.config.js：

```js
const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const IS_PROD = ["prod", "production"].includes(process.env.NODE_ENV);
const cesiumSource = "./node_modules/cesium/Source";

// const { PROJECT_NAME } = process.env.VUE_APP_PROJECT_NAME || "";

const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = {
  configureWebpack: () => {
    const plugins = [
      // new HardSourceWebpackPlugin(),
      new CopyWebpackPlugin([
        { from: path.join(cesiumSource, "Workers"), to: "cesium/Workers" },
      ]),
      new CopyWebpackPlugin([
        { from: path.join(cesiumSource, "Assets"), to: "cesium/Assets" },
      ]),
      new CopyWebpackPlugin([
        {
          from: path.join(cesiumSource, "ThirdParty"),
          to: "cesium/ThirdParty",
        },
      ]),
      new CopyWebpackPlugin([
        { from: path.join(cesiumSource, "Widgets"), to: "cesium/Widgets" },
      ]),
      new webpack.DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify("./cesium"),
      }),
    ];

    const module = {
      unknownContextCritical: false,
      unknownContextRegExp: /\/cesium\/Source\/Core\/buildModuleUrl\.js/,
      rules: [
        {
          // test: /\.(png|gif|jpg|jpeg|svg|xml|json|czml|glb)$/,
          test: /\.(czml|glb)$/,
          use: ["url-loader"],
        },
        {
          test: /\.js$/,
          enforce: "pre",
          include: resolve(cesiumSource),
          sideEffects: false,
          use: [
            {
              loader: "strip-pragma-loader",
              options: {
                pragmas: {
                  debug: false,
                },
              },
            },
          ],
        },
      ],
    };

    const optimization = {
      usedExports: true,
      splitChunks: {
        maxInitialRequests: Infinity,
        minSize: 0,
        maxSize: 250000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            chunks: "all",
            name(module) {
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )[1];
              return `npm.${packageName.replace("@", "")}`;
            },
          },
          commons: {
            name: "Cesium",
            test: /[\\/]node_modules[\\/]cesium/,
            priority: 10,
            chunks: "all",
          },
        },
      },
    };

    const config = {
      output: {
        sourcePrefix: "",
      },
      amd: {
        toUrlUndefined: true,
      },
      // resolve: {
      //   alias: {
      //     "@": resolve("src"),
      //     cesium: resolve(cesiumSource),
      //   },
      // },
      node: {
        fs: "empty",
      },
      plugins,
      module,
    };

    if (IS_PROD) {
      config.optimization = optimization;
    }

    return config;
  },
  chainWebpack: (config) => {
    config.plugins.delete("preload");
    config.plugins.delete("prefetch");

    config.resolve.symlinks(true);

    config.resolve.alias.set("@", resolve("src"));
    // .set("cesium", path.resolve(__dirname, cesiumSource));

    config.plugin("html").tap((args) => {
      args[0].chunksSortMode = "none";
      // args[0].title = PROJECT_NAME;
      // args[0].cdn = cdnOptions;
      return args;
    });

    config
      .plugin("ignore")
      .use(
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn$/)
      );

    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule
      .oneOf("inline")
      .resourceQuery(/inline/)
      .use("vue-svg-icon-loader")
      .loader("vue-svg-icon-loader")
      .end()
      .end()
      .oneOf("external")
      .use("file-loader")
      .loader("file-loader")
      .options({
        name: "assets/[name].[hash:8].[ext]",
      });

    if (IS_PROD) {
      config.plugin("webpack-report").use(BundleAnalyzerPlugin, [
        {
          analyzerMode: "static",
        },
      ]);
    }
  },
  devServer: {
    hot: true,
    port: 8001,
    // open: true,
    compress: true,
    // noInfo: false,
    disableHostCheck: true,
    // overlay: {
    //   warnings: true,
    //   errors: true,
    // },
    // proxy: {
    //   "/api": {
    //     target: process.env.VUE_APP_BASE_API,
    //     secure: false,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       "^/api": "/",
    //     },
    //   },
    // },
  },
  lintOnSave: false,
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: !IS_PROD, // 生产环境的 source map
  parallel: require("os").cpus().length > 1,
  pwa: {},
  transpileDependencies: [],
};
```

# 创建 ViewerContainer 组件

```vue
<template>
  <div id="cesiumContainer"></div>
</template>

<script>
import { onMounted } from "vue";
import { createWorldTerrain, Viewer } from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";

export default {
  name: "Home",
  setup() {
    onMounted(() => {
      const viewer = new Viewer("cesiumContainer", {
        terrainProvider: createWorldTerrain(),
      });

      viewer.cesiumWidget.creditContainer.style.display = "none";
    });
    return {};
  },
};
</script>

<style lang="less">
#cesiumContainer {
  height: 100vh;
}
</style>
```
