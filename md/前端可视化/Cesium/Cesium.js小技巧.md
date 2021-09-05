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

- 启用光照

```js
viewer.scene.globe.enableLighting = true;
```

- 禁止缩放

```js
viewer.scene.screenSpaceCameraController.enableZoom = false;
```

- 相机控制

```js
// true，则允许用户旋转相机。
// false，相机将锁定到当前标题。此标志仅适用于2D和3D。
viewer.scene.screenSpaceCameraController.enableRotate = false;

// true，则允许用户平移地图。
// false，相机将保持锁定在当前位置。此标志仅适用于2D和Columbus视图模式。
viewer.scene.screenSpaceCameraController.enableTranslate = false;

// true，允许用户放大和缩小。
// false，相机将锁定到距离椭圆体的当前距离
viewer.scene.screenSpaceCameraController.enableZoom = false;

// true，则允许用户倾斜相机
// false，相机将锁定到当前标题。这个标志只适用于3D和哥伦布视图。
viewer.scene.screenSpaceCameraController.enableTilt = false;

// 设置最大最小放缩量
viewer.scene.screenSpaceCameraController.minimumZoomDistance = 1200;
// 设置最大放缩量
viewer.scene.screenSpaceCameraController.maximumZoomDistance = 2500;
```

- Cesium 加载完成

```js
const helper = new Cesium.EventHelper();
helper.add(viewer.scene.globe.tileLoadProgressEvent, function (event) {
  console.log(“每次加载矢量切片都会进入这个回调”);
  if (event == 0) {
    //console.log(“这个是加载最后一个矢量切片的回调”);
  }
});
```
