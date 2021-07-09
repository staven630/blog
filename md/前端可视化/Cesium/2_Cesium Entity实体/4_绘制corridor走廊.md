[CorridorGraphics](https://staven630.github.io/cesium-doc-zh/CorridorGraphics.html)

## 特性

| 名称                     | 类型                                                                                                                                                                       | 是否必填 | 默认值                         | 描述                                                                                                 |
| :----------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------- | :----------------------------- | :--------------------------------------------------------------------------------------------------- |
| show                     | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| boolean                                                                                             | <可选>   | true                           | 指定道路可见性的布尔属性。                                                                           |
| positions                | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| [Cartesian3](https://staven630.github.io/cesium-doc-zh/Cartesian3.html)                             | <可选>   |                                | 指定 Cartesian3 定义道路中心线的位置数组。                                                           |
| width                    | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| number                                                                                              | <可选>   |                                | 用于指定道路边缘之间的距离。                                                                         |
| height                   | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| number                                                                                              | <可选>   | 0                              | 指定道路相对于椭球面的高度。                                                                         |
| heightReference          | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| [HeightReference](https://staven630.github.io/cesium-doc-zh/global.html#HeightReference)            | <可选>   | HeightReference.NONE           | 指定高度相对于什么的属性。                                                                           |
| extrudedHeight           | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| number                                                                                              | <可选>   |                                | 用于指定道路拉伸面相对于椭球面的高度。                                                               |
| extrudedHeightReference  | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| [HeightReference](https://staven630.github.io/cesium-doc-zh/global.html#HeightReference)            | <可选>   | HeightReference.NONE           | 指定了 extrudedHeight 相对于什么。                                                                   |
| cornerType               | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| [CornerType](https://staven630.github.io/cesium-doc-zh/global.html#CornerType)                      | <可选>   | CornerType.ROUNDED             | CornerType 属性指定角的风格。                                                                        |
| granularity              | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| number                                                                                              | <可选>   | Cesium.Math.RADIANS_PER_DEGREE | 指定每个纬度和经度之间的距离。                                                                       |
| fill                     | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| boolean                                                                                             | <可选>   | true                           | 指定走廊是否用提供的材料填充。                                                                       |
| material                 | [MaterialProperty](https://staven630.github.io/cesium-doc-zh/MaterialProperty.html) \| [Color](https://staven630.github.io/cesium-doc-zh/Color.html)                       | <可选>   | Color.WHITE                    | 指定用于填充走廊的材料的属性。                                                                       |
| outline                  | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| boolean                                                                                             | <可选>   | false                          | 指定走廊是否有轮廓。                                                                                 |
| outlineColor             | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| [Color](https://staven630.github.io/cesium-doc-zh/Color.html)                                       | <可选>   | Color.BLACK                    | 指定轮廓的 Color 属性。                                                                              |
| outlineWidth             | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| number                                                                                              | <可选>   | 1.0                            | 指定轮廓宽度的数字属性。                                                                             |
| shadows                  | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| [ShadowMode](https://staven630.github.io/cesium-doc-zh/global.html#ShadowMode)                      | <可选>   | ShadowMode.DISABLED            | 指定走廊是投射还是接收来自光源的阴影。                                                               |
| distanceDisplayCondition | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| [DistanceDisplayCondition](https://staven630.github.io/cesium-doc-zh/DistanceDisplayCondition.html) | <可选>   |                                | 指定在离相机多远的地方显示这条走廊。                                                                 |
| classificationType       | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| [ClassificationType](https://staven630.github.io/cesium-doc-zh/global.html#ClassificationType)      | <可选>   | ClassificationType.BOTH        | 指定这条走廊在地面上时是否对地形、3D 瓷砖或两者进行分类。                                            |
| zIndex                   | [ConstantProperty](https://staven630.github.io/cesium-doc-zh/ConstantProperty.html) \| number                                                                              | <可选>   |                                | 指定道路 zIndex 的属性，用于排序。仅在未定义 height 和 extrudedHeight 并且走廊是静态的情况下才有效。 |

```js
const viewer = new Cesium.Viewer("cesiumContainer");

const redCorridor = viewer.entities.add({
  name: "Red corridorcon surface with rounded corners",
  corridor: {
    positions: Cesium.Cartesian3.fromDegreesArray([
      -100.0,
      40.0,
      -105.0,
      40.0,
      -105.0,
      35.0,
    ]),
    width: 200000.0,
    material: Cesium.Color.RED.withAlpha(0.5),
  },
});

const greenCorridor = viewer.entities.add({
  name: "Green corridor at height with mitered corners and outline",
  corridor: {
    positions: Cesium.Cartesian3.fromDegreesArray([
      -90.0,
      40.0,
      -95.0,
      40.0,
      -95.0,
      35.0,
    ]),
    height: 100000.0,
    width: 200000.0,
    cornerType: Cesium.CornerType.MITERED,
    material: Cesium.Color.GREEN,
    outline: true,
  },
});

const blueCorridor = viewer.entities.add({
  name: "Blue extruded corridor width beveled corners and outline",
  corridor: {
    positions: Cesium.Cartesian3.fromDegreesArray([
      -80.0,
      40.0,
      -85.0,
      40.0,
      -85.0,
      35.0,
    ]),
    height: 200000.0,
    extrudedHeight: 100000.0,
    width: 200000.0,
    cornerType: Cesium.CornerType.BEVELED,
    material: Cesium.Color.BLUE.withAlpha(0.5),
    outline: true,
    outlineColor: Cesium.Color.WHITE,
  },
});

viewer.zoomTo(viewer.entities);
```

```js
const viewer = new Cesium.Viewer("cesiumContainer", {
  terrainProvider: new Cesium.createWorldTerrain({
    requestWaterMask: true,
    requestVertexNormals: true,
  }),
});

const scene = viewer.scene;

// 在地球表面绘制道路的轮廓。
// 创建道路轮廓几何图形。
let corridorOutlineGeometry = new Cesium.CorridorOutlineGeometry({
  positions: Cesium.Cartesian3.fromDegreesArray([
    -100.0,
    40.0,
    -105.0,
    40.0,
    -105.0,
    35.0,
  ]),
  width: 200000.0,
});

// 创建几何体实例
const corridorOutline = new Cesium.GeometryInstance({
  geometry: corridorOutlineGeometry,
  attributes: {
    color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.RED),
  },
});

// 绘制拉伸道路的轮廓。
// 创建道路几何图形。若要拉伸，请使用“extrudedHeight”选项指定几何图形的高度。
corridorOutlineGeometry = new Cesium.CorridorOutlineGeometry({
  positions: Cesium.Cartesian3.fromDegreesArray([
    -90.0,
    40.0,
    -95.0,
    40.0,
    -95.0,
    35.0,
  ]),
  width: 200000.0,
  cornnerType: Cesium.CornerType.GEODESIC,
  extrudedHeight: 100000.0,
});

const extrudedCorridorOutline = new Cesium.GeometryInstance({
  geometry: corridorOutlineGeometry,
  attributes: {
    color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.WHITE),
  },
});

scene.primitives.add(
  new Cesium.Primitive({
    // 要渲染的几何实例-或单个几何实例。
    geometryInstances: [corridorOutline, extrudedCorridorOutline],
    // 用于渲染图元的外观。
    appearance: new Cesium.PerInstanceColorAppearance({
      flat: true, // 当 true 时，片段着色器中将使用平面阴影，这意味着不考虑照明。
      renderState: {
        lineWidth: Math.min(2.0, scene.maximumAliasedLineWidth),
      },
    }),
  })
);
```

## 示例

[Sandcastle Corridor](https://sandcastle.cesium.com/index.html?src=Corridor.html)
