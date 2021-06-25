- 引入 widgets css

```js
import "cesium/Build/Cesium/Widgets/widgets.css";
```

- 去除 credit 版权信息

```js
viewer.cesiumWidget.creditContainer.style.display = "none";
// or
viewer._cesiumWidget._creditContainer.style.display = "none";
```

- 深度开启与关闭

```js
viewer.scene.globe.depthTestAgainstTerrain = true;
```
