- [WallGraphics](https://staven630.github.io/cesium-doc-zh/WallGraphics.html)

## 属性

| 名称                     | 类型                                                                                                                                                                       | 是否必填 | 默认值                         | 描述                                               |
| :----------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------- | :----------------------------- | :------------------------------------------------- |
| show                     | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| boolean                                                                                             | <可选>   | true                           | 指定墙可见性的布尔属性。                           |
| positions                | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| [Cartesian3](https://staven630.github.io/cesium-doc-zh/Cartesian3.html)                             | <可选>   |                                | 指定 Cartesian3 定义墙顶部的位置数组。             |
| minimumHeights           | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| Array.<number\>                                                                                     | <可选>   |                                | 指定用于墙底部而不是地球表面的高度数组。           |
| maximumHeights           | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| Array.<number\>                                                                                     | <可选>   |                                | 指定用于墙壁顶部的高度数组，而不是每个位置的高度。 |
| granularity              | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| number                                                                                              | <可选>   | Cesium.Math.RADIANS_PER_DEGREE | 指定每个纬度和经度点之间的角距离。                 |
| fill                     | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| boolean                                                                                             | <可选>   | true                           | 指定墙壁是否用提供的材料填充。                     |
| material                 | [MaterialProperty](https://staven630.github.io/cesium-doc-zh/MaterialProperty.html) \| [Color](https://staven630.github.io/cesium-doc-zh/Color.html)                       | <可选>   | Color.WHITE                    | 指定用于填充墙的材料的属性。                       |
| outline                  | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| boolean                                                                                             | <可选>   | false                          | 指定墙是否被勾勒出来。                             |
| outlineColor             | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| [Color](https://staven630.github.io/cesium-doc-zh/Color.html)                                       | <可选>   | Color.BLACK                    | 指定 Color 轮廓的属性。                            |
| outlineWidth             | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| number                                                                                              | <可选>   | 1.0                            | 指定轮廓宽度的数字属性。                           |
| shadows                  | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| [ShadowMode](https://staven630.github.io/cesium-doc-zh/global.html#ShadowMode)                      | <可选>   | ShadowMode.DISABLED            | 指定墙壁是投射还是接收来自光源的阴影。             |
| distanceDisplayCondition | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| [DistanceDisplayCondition](https://staven630.github.io/cesium-doc-zh/DistanceDisplayCondition.html) | <可选>   |                                | 指定在离相机多远的地方显示这面墙。                 |

```js
const redWall = viewer.entities.add({
  name: "Red Wall",
  wall: {
    positions: Cesium.Cartesian3.fromDegreesArrayHeights([
      -115.0,
      44.0,
      200000.0,
      -90.0,
      44.0,
      200000.0,
    ]),
    minimumHeights: [100000.0, 100000.0],
    material: Cesium.Color.RED,
  },
});

const greenWall = viewer.entities.add({
  name: "Green Wall",
  wall: {
    positions: Cesium.Cartesian3.fromDegreesArrayHeights([
      -107.0,
      43.0,
      100000.0,
      -97.0,
      43.0,
      100000.0,
      -97.0,
      40.0,
      100000.0,
      -107.0,
      40.0,
      100000.0,
      -107.0,
      43.0,
      100000.0,
    ]),
    material: Cesium.Color.GREEN,
    outline: true,
  },
});

const blueWall = viewer.entities.add({
  name: "Blue Wall",
  wall: {
    positions: Cesium.Cartesian3.fromDegreesArray([
      -115.0,
      50.0,
      -112.5,
      50.0,
      -110.0,
      50.0,
      -107.5,
      50.0,
      -105.0,
      50.0,
      -102.5,
      50.0,
      -100.0,
      50.0,
      -97.5,
      50.0,
      -95.0,
      50.0,
      -92.5,
      50.0,
      -90.0,
      50.0,
    ]),
    maximumHeights: [
      100000,
      200000,
      100000,
      200000,
      100000,
      200000,
      100000,
      200000,
      100000,
      200000,
      100000,
    ],
    minimumHeights: [0, 100000, 0, 100000, 0, 100000, 0, 100000, 0, 100000, 0],
    material: Cesium.Color.BLUE.withAlpha(0.5),
    outline: true,
    outlineColor: Cesium.Color.BLACK,
  },
});
```

- [Cesium Sandcastle Wall Demo](https://sandcastle.cesium.com/index.html)
