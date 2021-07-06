&emsp;&emsp;[BoxGraphics](https://staven630.github.io/cesium-doc-zh/BoxGraphics.html)

| 名称                     | 类型                                                                                                                                                                       | 是否必填 | 默认值               | 描述                                           |
| :----------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------- | :------------------- | :--------------------------------------------- |
| show                     | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| boolean                                                                                             | <可选>   | true                 | 布尔属性，指定框的可见性。                     |
| dimensions               | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| [Cartesian3](https://staven630.github.io/cesium-doc-zh/Cartesian3.html)                             | <可选>   |                      | Cartesian3 属性指定的长度，宽度，和箱的高度。  |
| heightReference          | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| [HeightReference](https://staven630.github.io/cesium-doc-zh/global.html#HeightReference)            | <可选>   | HeightReference.NONE | 指定距离实体位置的高度相对于什么。             |
| fill                     | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| boolean                                                                                             | <可选>   | true                 | 布尔属性，指定框是否填充了提供的材料。         |
| material                 | [MaterialProperty](https://staven630.github.io/cesium-doc-zh/MaterialProperty.html) \| [Color](https://staven630.github.io/cesium-doc-zh/Color.html)                       | <可选>   | Color.WHITE          | 指定用于填充框的材料。                         |
| outline                  | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| boolean                                                                                             | <可选>   | false                | 布尔属性，指定框是否有轮廓。                   |
| outlineColor             | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| [Color](https://staven630.github.io/cesium-doc-zh/Color.html)                                       | <可选>   | Color.BLACK          | 指定 Color 轮廓的属性。                        |
| outlineWidth             | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| number                                                                                              | <可选>   | 1.0                  | 指定轮廓宽度的数字属性。                       |
| shadows                  | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| [ShadowMode](https://staven630.github.io/cesium-doc-zh/global.html#ShadowMode)                      | <可选>   | ShadowMode.DISABLED  | 枚举属性，指定框是投射还是接收来自光源的阴影。 |
| distanceDisplayCondition | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| [DistanceDisplayCondition](https://staven630.github.io/cesium-doc-zh/DistanceDisplayCondition.html) | <可选>   |                      | 指定在离相机多远的地方显示此框。               |

```js
viewer = new Cesium.Viewer("cesiumContainer");

const blueBox = viewer.entities.add({
  name: "blue box",
  position: Cesium.Cartesian3.fromDegrees(-114.0, 40.0, 300000.0),
  box: {
    dimensions: new Cesium.Cartesian3(400000.0, 300000.0, 500000.0),
    material: Cesium.Color.BLUE,
  },
});

const redBox = viewer.entities.add({
  name: "red box",
  position: Cesium.Cartesian3.fromDegrees(-107.0, 40.0, 300000.0),
  box: {
    dimensions: new Cesium.Cartesian3(400000.0, 300000.0, 500000.0),
    material: Cesium.Color.RED.withAlpha(0.5),
    outline: true,
    outlineColor: Cesium.Color.BLACK,
  },
});

const outlineOnly = viewer.entities.add({
  name: "yellow outline",
  position: Cesium.Cartesian3.fromDegrees(-100.0, 40.0, 300000.0),
  box: {
    dimensions: new Cesium.Cartesian3(400000.0, 300000.0, 500000.0),
    fill: false,
    outline: true,
    outlineColor: Cesium.Color.YELLOW,
  },
});

viewer.zoomTo(viewer.entities);
```

[Sandcastle Box](https://sandcastle.cesium.com/index.html?src=Box.html)
