> autoRotation.js

```js
import * as Cesium from "cesium";

export const generateAutoRotationCallback = (viewer, prev) => () => {
  const { camera, clock, scene } = viewer;
  if (!viewer || !clock.shouldAnimate) {
    return;
  }
  prev = prev || clock.currentTime;
  const { currentTime } = clock;
  // 算出前后两次的时间间隔
  if (scene.mode === Cesium.SceneMode.SCENE2D) {
    // 获取相机高度
    const { height } = scene.globe.ellipsoid.cartesianToCartographic(
      camera.position
    );
    // 根据高度、地球半径等参数，计算出每秒钟相机需要平移的值
    const a = (465.2 / (6371 * 1000)) * (height + 6371 * 1000);
    const interval =
      Cesium.JulianDate.toDate(currentTime) - Cesium.JulianDate.toDate(prev);
    // 调用api平移镜头
    camera.moveLeft((interval * a) / 1000);
  } else if (scene.mode === Cesium.SceneMode.SCENE3D) {
    const interval =
      Cesium.JulianDate.toDate(currentTime) - Cesium.JulianDate.toDate(prev);
    camera.rotate(
      Cesium.Cartesian3.UNIT_Z,
      (Math.PI / (24 * 60 * 60)) * (interval / 1000)
    );
  }
  prev = currentTime;
};

export const generate2DAutoRotationCallback = (viewer, prev) => () => {
  const { camera, clock, scene } = viewer;

  if (
    !viewer ||
    scene.mode !== Cesium.SceneMode.SCENE2D ||
    !clock.shouldAnimate
  ) {
    return;
  }

  prev = prev || clock.currentTime;

  // 获取相机高度
  const { height } = scene.globe.ellipsoid.cartesianToCartographic(
    camera.position
  );
  // 根据高度、地球半径等参数，计算出每秒钟相机需要平移的值
  const a = (465.2 / (6371 * 1000)) * (height + 6371 * 1000);
  const { currentTime } = clock;
  // 算出前后两次的时间间隔
  const interval =
    Cesium.JulianDate.toDate(currentTime) - Cesium.JulianDate.toDate(prev);
  prev = currentTime;
  // 调用api平移镜头
  camera.moveLeft((interval * a) / 1000);
  prev = clock.currentTime;
};

export const generate3DAutoRotationCallback = (viewer, prev) => () => {
  const { camera, clock, scene } = viewer;

  if (
    !viewer ||
    scene.mode !== Cesium.SceneMode.SCENE3D ||
    !clock.shouldAnimate
  ) {
    return;
  }

  prev = prev || clock.currentTime;
  const { currentTime } = clock;
  const interval =
    Cesium.JulianDate.toDate(currentTime) - Cesium.JulianDate.toDate(prev);
  prev = currentTime;

  camera.rotate(
    Cesium.Cartesian3.UNIT_Z,
    (Math.PI / (24 * 60 * 60)) * (interval / 1000)
  );
  prev = clock.currentTime;
};

// options可以设置时钟的一些参数，比如自转开始的时间，自转的速度等
export const startAutoRotation = (viewer, cb, options = { multiplier: 1 }) => {
  stopAutoRotation(viewer, cb);
  viewer.scene.postUpdate.addEventListener(cb);
  if (viewer.clock) {
    const keys = Object.keys(options);
    for (const k of keys) {
      viewer.clock[k] = options[k];
    }
  }
};

export const stopAutoRotation = function(viewer, cb) {
  if (!viewer) return;
  viewer.scene.postUpdate.removeEventListener(cb);
};
```
