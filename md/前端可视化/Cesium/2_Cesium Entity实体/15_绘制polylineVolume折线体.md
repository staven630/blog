## [PolylineVolumeGraphics](https://staven630.github.io/cesium-doc-zh/PolylineVolumeGraphics.html)

| 名称                     | 类型                                                                                                                                                                       | 是否必填 | 默认值                         | 描述                                                       |
| :----------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------- | :----------------------------- | :--------------------------------------------------------- |
| show                     | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| boolean                                                                                             | <可选>   | true                           | 指定体积的可见性。                                         |
| positions                | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| [Cartesian3](https://staven630.github.io/cesium-doc-zh/Cartesian3.html)                             | <可选>   |                                | 用于指定定义线带的 Cartesian3 位置的数组。                 |
| shape                    | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| [Cartesian2](https://staven630.github.io/cesium-doc-zh/Cartesian2.html)                             | <可选>   |                                | 它指定 Cartesian2 位置的数组，这些位置定义了要拉伸的形状。 |
| cornerType               | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| [CornerType](https://staven630.github.io/cesium-doc-zh/global.html#CornerType)                      | <可选>   | CornerType.ROUNDED             | CornerType 属性指定角的风格。                              |
| granularity              | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| number                                                                                              | <可选>   | Cesium.Math.RADIANS_PER_DEGREE | 指定每个纬度和经度点之间的角距离。                         |
| fill                     | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| boolean                                                                                             | <可选>   | true                           | 指定是否用所提供的材料填充该体积。                         |
| material                 | [MaterialProperty](https://staven630.github.io/cesium-doc-zh/MaterialProperty.html) \| [Color](https://staven630.github.io/cesium-doc-zh/Color.html)                       | <可选>   | Color.WHITE                    | 指定用于填充体积的材料。                                   |
| outline                  | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| boolean                                                                                             | <可选>   | false                          | 用于指定是否概述了体积。                                   |
| outlineColor             | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| [Color](https://staven630.github.io/cesium-doc-zh/Color.html)                                       | <可选>   | Color.BLACK                    | 指定 Color 轮廓的属性。                                    |
| outlineWidth             | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| number                                                                                              | <可选>   | 1.0                            | 指定轮廓宽度的数字属性。                                   |
| shadows                  | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| [ShadowMode](https://staven630.github.io/cesium-doc-zh/global.html#ShadowMode)                      | <可选>   | ShadowMode.DISABLED            | 指定体积是投射还是接收来自光源的阴影。                     |
| distanceDisplayCondition | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| [DistanceDisplayCondition](https://staven630.github.io/cesium-doc-zh/DistanceDisplayCondition.html) | <可选>   |                                | 指定将在距相机的距离处显示此体积。                         |

```js
const viewer = new Cesium.Viewer("cesiumContainer");

const computeCircle = (radius) => {
  const positions = [];

  for (let i = 0; i < 360; i++) {
    const radians = Cesium.Math.toRadians(i);
    positions.push(
      new Cesium.Cartesian2(
        radius * Math.cos(radians),
        radius * Math.sin(radians)
      )
    );
  }

  return positions;
};

var redTube = viewer.entities.add({
  name: "Red tube with rounded corners",
  polylineVolume: {
    positions: Cesium.Cartesian3.fromDegreesArray([
      -85.0,
      32.0,
      -85.0,
      36.0,
      -89.0,
      36.0,
    ]),
    shape: computeCircle(60000.0),
    material: Cesium.Color.RED,
  },
});

const greenBox = viewer.entities.add({
  name: "GreenTube",
  polylineVolume: {
    positions: Cesium.Cartesian3.fromDegreesArrayHeights([
      -90.0,
      32.0,
      0.0,
      -90.0,
      36.0,
      100000.0,
      -94.0,
      36.0,
      0.0,
    ]),
    shape: [
      new Cesium.Cartesian2(-50000, -50000),
      new Cesium.Cartesian2(50000, -50000),
      new Cesium.Cartesian2(50000, 50000),
      new Cesium.Cartesian2(-50000, 50000),
    ],
    cornerType: Cesium.CornerType.BEVELED,
    material: Cesium.Color.GREEN.withAlpha(0.5),
    outline: true,
    outlineColor: Cesium.Color.BLACK,
  },
});

const computeStar = (arms, rOuter, rInner) => {
  const angle = Math.PI / arms;
  const length = 2 * arms;
  const positions = new Array(length);
  for (let i = 0; i < length; i++) {
    const r = i % 2 === 0 ? rOuter : rInner;
    positions[i] = new Cesium.Cartesian2(
      Math.cos(i * angle) * r,
      Math.sin(i * angle) * r
    );
  }
  return positions;
};

const blueStar = viewer.entities.add({
  name: "BlueStar",
  polylineVolume: {
    positions: Cesium.Cartesian3.fromDegreesArrayHeights([
      -95.0,
      32.0,
      0.0,
      -95.0,
      36.0,
      100000.0,
      -99.0,
      36.0,
      200000.0,
    ]),
    shape: computeStar(7, 70000, 50000),
    cornerType: Cesium.CornerType.MITERED,
    material: Cesium.Color.BLUE,
  },
});

viewer.zoomTo(viewer.entities);
```

## 示例

- [Cesium Sandcastle PolylineVolume Demo](https://sandcastle.cesium.com/index.html?src=Polyline%2520Volume.html)
