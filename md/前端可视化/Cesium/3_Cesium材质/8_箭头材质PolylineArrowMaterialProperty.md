## 箭头材质[PolylineArrowMaterialProperty](https://staven630.github.io/cesium-doc-zh/PolylineArrowMaterialProperty.html)

| 名称  | 类型                                                                                                                                 | 是否必填 | 默认值      | 描述                  |
| :---- | :----------------------------------------------------------------------------------------------------------------------------------- | :------- | :---------- | :-------------------- |
| color | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| [Color](https://staven630.github.io/cesium-doc-zh/Color.html) | 可选     | Color.WHITE | 用于线的 Color 属性。 |

```js
const purpleArrow = viewer.entities.add({
  name: "PurpleArrow",
  polyline: {
    positions: Cesium.Cartesian3.fromDegreesArrayHeights([
      -75,
      43,
      500000,
      -125,
      43,
      500000,
    ]),
    width: 10,
    arcType: Cesium.ArcType.NONE,
    material: new Cesium.PolylineArrowMaterialProperty(Cesium.Color.PURPLE),
  },
});
```

![PolylineArrowMaterialProperty](../img/PolylineArrowMaterialProperty.png)
