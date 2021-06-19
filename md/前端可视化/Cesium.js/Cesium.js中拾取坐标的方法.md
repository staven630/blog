&emsp;&emsp;初始化 Viewer 时，初始状态是默认地形(EllipsoidTerrainProvider)，可以使用以下方式来创建 Cesium 全球地形(Cesium World Terrain)：

```js
const viewer = new Viewer("cesiumContainer", {
  terrainProvider: Cesium.createWorldTerrain(),
});
```

&emsp;&emsp;开启地形深度测试，可以解决 Cesium 绘制几何图形被高程遮挡问题。

```js
// 开启地形深度测试
viewer.scene.globe.depthTestAgainstTerrain = true;
```

## 屏幕坐标

```js
const viewer = new Cesium.Viewer("cesiumContainer");
const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

handler.setInputAction(function(movement) {
  console.log(movement.position);
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
```

## 椭球面坐标

> viewer.camera.pickEllipsoid(windowPosition, ellipsoid, result)

&emsp;&emsp;获取鼠标点视线与椭球面相交处的坐标，在加载地形的场景上获取的坐标有误差。其中 ellipsoid 是当前地球使用的椭球对象：viewer.scene.globe.ellipsoid。

```js
const position = viewer.scene.camera.pickEllipsoid(
  movement.position,
  viewer.scene.globe.ellipsoid
);
```

## 地标坐标

> viewer.scene.globe.pick(ray, scene, result)

&emsp;&emsp;获取点基础地球表面的世界坐标，不包括模型、倾斜摄影表面。其中 ray=viewer.camera.getPickRay(movement.position)

```js
const ray = viewer.camera.getPickRay(movement.position);
const position = viewer.scene.globe.pick(ray, viewer.scene);
```

## 场景坐标

> viewer.scene.pickPosition(windowPosition, result)

&emsp;&emsp;获取场景中倾斜摄影或模型表面点击处的坐标，需要开启“地形深度检测”（在未开启“地形深度检测”的情况下只能在 3DTile 上准确获取空间坐标，开启“地形深度检测”后，viewer.scene.pickPosition 也能在非 3DTile 上准确获取坐标）。

&emsp;&emsp;但如果非 3DtTile 且未开地形深度检测则会报错，包括 3DTile 加载异常情况

```js
viewer.scene.globe.depthTestAgainstTerrain = true;
const position = viewer.scene.pickPosition(movement.position);
```

## 示例

```jsx
<template>
  <div id="cesiumContainer">
    <div id="btn" ref="btnRef">按钮</div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import {
  Ion,
  IonResource,
  Viewer,
  createWorldTerrain,
  Cartesian3,
  HorizontalOrigin,
  VerticalOrigin,
  Cartesian2,
  Ray,
  ScreenSpaceEventHandler,
  ScreenSpaceEventType,
  SceneMode,
  defined,
  Math as CesiumMath,
  Cartographic,
} from "cesium";
import { CESIUM_ACCESS_TOKEN } from "@/config/index";
import "cesium/Build/Cesium/Widgets/widgets.css";

export default {
  name: "Pick",
  setup() {
    const btnRef = ref(null);

    onMounted(() => {
      Ion.defaultAccessToken = CESIUM_ACCESS_TOKEN;
      const viewer = new Viewer("cesiumContainer", {
        selectionIndicator: false,
        infoBox: false,
        // terrainProvider: new createWorldTerrain(),
      });

      const { scene, entities, canvas, camera } = viewer;

      // 深度开启
      scene.globe.depthTestAgainstTerrain = false;

      if (!scene.pickPositionSupported) {
        console.log("This browser does not support pickPosition.");
      }

      btnRef.value.addEventListener("click", async (e) => {
        const airplaneUri = await IonResource.fromAssetId(469078);
        const modelEntity = entities.add({
          name: "flight",
          position: Cartesian3.fromDegrees(-123.0744619, 44.0503706),
          model: {
            uri: airplaneUri,
          },
        });
        viewer.zoomTo(modelEntity);

        const labelEntity = entities.add({
          label: {
            show: false,
            showBackground: true,
            font: "14px monospace",
            horizontalOrigin: HorizontalOrigin.LEFT,
            verticalOrigin: VerticalOrigin.TOP,
            pixelOffset: new Cartesian2(15, 0),
          },
        });

        let sceneModeWarningPosted = false;
        const handler = new ScreenSpaceEventHandler(canvas);
        handler.setInputAction((movement) => {
          let foundPosition = false;
          let str = ``;
          if (scene.mode === SceneMode.SCENE3D) {
            labelEntity.label.text = "";
            const cartesion1 = scene.pickPosition(movement.endPosition);

            if (defined(cartesion1)) {
              foundPosition = true;
              const cartographic1 = Cartographic.fromCartesian(cartesion1);
              str = `
              pickPosition_lon: ${CesiumMath.toDegrees(
                cartographic1.longitude
              ).toFixed(2)}
              pickPosition_lat: ${CesiumMath.toDegrees(
                cartographic1.latitude
              ).toFixed(2)}
              pickPosition_height: ${cartographic1.height.toFixed(2)}`;
            }

            const ray1 = camera.getPickRay(movement.endPosition, new Ray());
            const cartesion2 = scene.globe.pick(ray1, scene, new Cartesian3());
            console.log(defined(cartesion1), defined(cartesion2));
            if (defined(cartesion2)) {
              foundPosition = true;
              const cartographic2 = Cartographic.fromCartesian(cartesion2);
              str = `${str}
              pick_lon: ${CesiumMath.toDegrees(cartographic2.longitude).toFixed(
                2
              )}
              pick_lat: ${CesiumMath.toDegrees(cartographic2.latitude).toFixed(
                2
              )}
              pick_height: ${cartographic2.height.toFixed(2)}`;
            }

            if (foundPosition) {
              const c = cartesion1 || cartesion2;
              labelEntity.label.text = str;
              labelEntity.position = cartesion1 || cartesion2;
              labelEntity.label.show = true;
              labelEntity.label.eyeOffset = new Cartesian3(
                0.0,
                0.0,
                camera.frustum.near * 1.5 -
                  Cartesian3.distance(c, camera.position)
              );
            } else {
              labelEntity.label.show = false;
            }
          } else if (!sceneModeWarningPosted) {
            sceneModeWarningPosted = true;
            console.log("pickPosition is currently only supported in 3D mode.");
          }
        }, ScreenSpaceEventType.MOUSE_MOVE);
      });
    });

    return {
      btnRef,
    };
  },
};
</script>

<style lang="less">
#cesiumContainer {
  height: 100vh;
}

#btn {
  position: fixed;
  top: 80px;
  right: 20px;
  color: #fff;
  padding: 10px 20px;
  cursor: pointer;
  border: 1px solid red;
  z-index: 10000;
}
</style>
```

- [Cesium 的拾取问题总结](https://zhuanlan.zhihu.com/p/44767866)
