- [Rectangle](https://staven630.github.io/cesium-doc-zh/Rectangle.html)

## [RectangleGraphics](https://staven630.github.io/cesium-doc-zh/RectangleGraphics.html)

| 名称                     | 类型                                                                                                                                                                       | 是否必填 | 默认值                         | 描述                                                                                                           |
| :----------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------- | :----------------------------- | :------------------------------------------------------------------------------------------------------------- |
| show                     | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| boolean                                                                                             | <可选>   | true                           | 指定矩形可见性的布尔属性。                                                                                     |
| coordinates              | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| [Rectangle](https://staven630.github.io/cesium-doc-zh/Rectangle.html)                               | <可选>   |                                | 指定 Rectangle。                                                                                               |
| height                   | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| number                                                                                              | <可选>   | 0                              | 指定矩形相对于椭圆体表面的高度。                                                                               |
| heightReference          | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| [HeightReference](https://staven630.github.io/cesium-doc-zh/global.html#HeightReference)            | <可选>   | HeightReference.NONE           | 指定高度相对于什么的属性。                                                                                     |
| extrudedHeight           | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| number                                                                                              | <可选>   |                                | 指定矩形拉伸面相对于椭球面的高度。                                                                             |
| extrudedHeightReference  | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| [HeightReference](https://staven630.github.io/cesium-doc-zh/global.html#HeightReference)            | <可选>   | HeightReference.NONE           | 指定了 extrudedHeight 相对于什么。                                                                             |
| rotation                 | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| number                                                                                              | <可选>   | 0.0                            | 指定矩形从北顺时针旋转。                                                                                       |
| stRotation               | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| number                                                                                              | <可选>   | 0.0                            | 指定矩形纹理从北逆时针旋转。                                                                                   |
| granularity              | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| number                                                                                              | <可选>   | Cesium.Math.RADIANS_PER_DEGREE | 指定矩形上点之间的角距离。                                                                                     |
| fill                     | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| boolean                                                                                             | <可选>   | true                           | 指定矩形是否用提供的材料填充。                                                                                 |
| material                 | [MaterialProperty](https://staven630.github.io/cesium-doc-zh/MaterialProperty.html) \| [Color](https://staven630.github.io/cesium-doc-zh/Color.html)                       | <可选>   | Color.WHITE                    | 指定用于填充矩形的材料。                                                                                       |
| outline                  | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| boolean                                                                                             | <可选>   | false                          | 指定矩形是否有轮廓。                                                                                           |
| outlineColor             | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| [Color](https://staven630.github.io/cesium-doc-zh/Color.html)                                       | <可选>   | Color.BLACK                    | 指定 Color 轮廓的属性。                                                                                        |
| outlineWidth             | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| number                                                                                              | <可选>   | 1.0                            | 指定轮廓宽度的数字属性。                                                                                       |
| shadows                  | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| [ShadowMode](https://staven630.github.io/cesium-doc-zh/global.html#ShadowMode)                      | <可选>   | ShadowMode.DISABLED            | 指定矩形是投射还是接收来自光源的阴影。                                                                         |
| distanceDisplayCondition | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| [DistanceDisplayCondition](https://staven630.github.io/cesium-doc-zh/DistanceDisplayCondition.html) | <可选>   |                                | 指定将在距相机多远的地方显示此矩形。                                                                           |
| classificationType       | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| [ClassificationType](https://staven630.github.io/cesium-doc-zh/global.html#ClassificationType)      | <可选>   | ClassificationType.BOTH        | 指定此矩形在地面上时是否对地形、3D 瓷砖或两者进行分类。                                                        |
| zIndex                   | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| number                                                                                              | <可选>   | 0                              | 指定用于排序地面几何图形的 zIndex 的属性。仅当矩形为常量且既没有指定 height 也没有指定 extrudedHeight 时有效。 |

```js
const viewer = new Cesium.Viewer("cesiumContainer");

const redRectangle = viewer.entities.add({
  name: "Red translucent rectangle",
  rectangle: {
    coordinates: Cesium.Rectangle.fromDegrees(-110.0, 20.0, -80.0, 25.0),
    material: Cesium.Color.RED.withAlpha(0.5),
  },
});

const greenRectangle = viewer.entities.add({
  name:
    "Green translucent, rotated, and extruded rectangle at height with outline",
  rectangle: {
    coordinates: Cesium.Rectangle.fromDegrees(-110.0, 30.0, -100.0, 40.0),
    material: Cesium.Color.GREEN.withAlpha(0.5),
    rotation: Cesium.Math.toRadians(45),
    extrudedHeight: 300000.0,
    height: 100000.0,
    outline: true, // height must be set for outline to display
    outlineColor: Cesium.Color.BLACK,
  },
});

let rotation = Cesium.Math.toRadians(30);

function getRotationValue() {
  rotation += 0.005;
  return rotation;
}
viewer.entities.add({
  name: "Rotating rectangle with rotating texture coordinate",
  rectangle: {
    coordinates: Cesium.Rectangle.fromDegrees(-92.0, 30.0, -76.0, 40.0),
    material: "./Cesium_Logo_Color.jpg",
    rotation: new Cesium.CallbackProperty(getRotationValue, false),
    stRotation: new Cesium.CallbackProperty(getRotationValue, false),
    classificationType: Cesium.ClassificationType.TERRAIN,
  },
});

viewer.zoomTo(viewer.entities);
```

- [Cesium Sandcastle Rectangle Demo](https://sandcastle.cesium.com/?src=Rectangle.html)
- [Draw a rectangle in Cesium with shift-click-drag](https://gist.github.com/theplatapi/0a7d789afc8028a3c20b)
