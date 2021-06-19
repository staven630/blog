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
const webpack = require("webpack");

const CopyWebpackPlugin = require("copy-webpack-plugin");
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const resolve = (dir) => path.resolve(__dirname, dir);
const IS_PROD = ["prod", "production"].includes(process.env.NODE_ENV);

const cesiumSource = "node_modules/cesium/Source";
const cesiumWorkers = "../Build/Cesium/Workers";
const cesiumThirdParty = "../Build/Cesium/ThirdParty";
const cesiumAssets = "../Build/Cesium/Assets";
const cesiumWidgets = "../Build/Cesium/Widgets";

const cesiumResolve = (dir) => path.resolve(cesiumSource, dir);

module.exports = {
  configureWebpack: () => {
    const plugins = [
      new HardSourceWebpackPlugin(),
      new CopyWebpackPlugin([
        { from: cesiumResolve(cesiumWorkers), to: "cesium/Workers" },
      ]),
      new CopyWebpackPlugin([
        { from: cesiumResolve(cesiumThirdParty), to: "cesium/ThirdParty" },
      ]),
      new CopyWebpackPlugin([
        { from: cesiumResolve(cesiumAssets), to: "cesium/Assets" },
      ]),
      new CopyWebpackPlugin([
        { from: cesiumResolve(cesiumWidgets), to: "cesium/Widgets" },
      ]),
      new webpack.DefinePlugin({
        // Define relative base path in cesium for loading assets
        CESIUM_BASE_URL: JSON.stringify("./cesium"),
      }),
    ];

    const module = {
      unknownContextCritical: false,
      // unknownContextRegExp: /^.\/.*$/,
      unknownContextRegExp: /\/cesium\/Source\/Core\/buildModuleUrl\.js/,
      rules: [
        {
          // test: /\.(png|gif|jpg|jpeg|svg|xml|json|czml|glb)$/,
          test: /\.(czml|glb)$/,
          use: ["url-loader"],
        },
        {
          // Strip cesium pragmas
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
      sideEffects: true,
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          commons: {
            name: "common", // 打包后的文件名
            chunks: "all", //
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 1,
          },
          vendor: {
            name(module) {
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )[1];
              return `${packageName.replace("@", "")}`;
            },
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial",
          },
          cesium: {
            name: "cesium",
            test: /[\\/]node_modules[\\/]cesium/,
            priority: 30,
            reuseExistingChunk: true,
          },
        },
      },
    };

    const config = {
      plugins,
      module,
    };

    if (IS_PROD) {
      config.optimization = optimization;
    }

    return config;
  },
  chainWebpack: (config) => {
    config.resolve.symlinks(true);

    // 添加别名
    config.resolve.alias.set("@", resolve("src"));

    if (IS_PROD) {
      config.plugins.delete("preload");
      config.plugins.delete("prefetch");

      config.plugin("webpack-report").use(BundleAnalyzerPlugin, [
        {
          analyzerMode: "static",
        },
      ]);
    }
  },
  css: {
    extract: IS_PROD,
    sourceMap: false,
  },
  transpileDependencies: [],
  lintOnSave: false,
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: !IS_PROD, // 生产环境的 source map
  parallel: require("os").cpus().length > 1,
  pwa: {},
};
```

# 创建 ViewerContainer 组件

```vue
<template>
  <div id="cesiumContainer"></div>
</template>

<script>
import { onMounted } from "vue";
import { createWorldTerrain, Viewer } from "@plugins/cesium";

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
