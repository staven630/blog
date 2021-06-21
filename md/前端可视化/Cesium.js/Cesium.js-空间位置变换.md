Cesium 为我们提供了很有用的变换工具类：Cesium.Cartesian3（相当于 Point3D）Cesium.Matrix3（3x3 矩阵，用于描述旋转变换）Cesium.Matrix4（4x4 矩阵，用于描述旋转加平移变换），Cesium.Quaternion（四元数，用于描述围绕某个向量旋转一定角度的变换）。

一个局部坐标为 p1(x,y,z)的点，将它的局部坐标原点放置到 loc(lng,lat,alt)上，局部坐标的 z 轴垂直于地表，局部坐标的 y 轴指向正北，并围绕这个 z 轴旋转 d 度，求此时 p1(x,y,z)变换成全局坐标笛卡尔坐 p2(x1,y1,z1)是多少？

```js
// 转成弧度
const rotate = Cesium.Math.toRadians(d);

// quat为围绕这个z轴旋转d度的四元数
const quat = Cesium.Quaternion.fromAxisAngle(Cesium.Cartesian3.UNIT_Z, rotate);

// rot_mat3 为根据四元数求得的旋转矩阵
const rot_mat3 = Cesium.Matrix3.fromQuaternion(quat);

// p1 的局部坐标
const v = new Cesium.Cartesian3(x, y, z);

// m为旋转加平移的 4x4 变换矩阵，这里平移为(0,0,0)，故填个 Cesium.Cartesian3.ZERO
let m = Cesium.Matrix4.fromRotationTranslation(
  rot_mat3,
  Cesium.Cartesian3.ZERO
);

// m = m * v
m = Cesium.Matrix4.multiplyByTranslation(m, v);

// 得到局部坐标原点的全局坐标
const cart3 = ellipsoid.cartographicToCartesian(
  Cesium.Cartographic.fromDegrees(lng, lat, alt)
);

// m1为局部坐标的 z 轴垂直于地表，局部坐标的 y 轴指向正北的 4x4 变换矩阵
const m1 = Cesium.Transforms.eastNorthUpToFixedFrame(cart3);

// m = m * m1
m = Cesium.Matrix4.multiplyTransformation(m, m1);

//根据最终变换矩阵 m 得到 p2
const p2 = Cesium.Matrix4.getTranslation(m);
console.log("x=" + p2.x + ",y=" + p2.y + ",z=" + p2.z);
```
