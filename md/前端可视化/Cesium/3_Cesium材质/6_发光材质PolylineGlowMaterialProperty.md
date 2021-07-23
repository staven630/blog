## 发光折线材质[PolylineGlowMaterialProperty](https://staven630.github.io/cesium-doc-zh/PolylineGlowMaterialProperty.html)

| 名称       | 类型                                                                                                                                 | 是否必填 | 默认值      | 描述                                                                              |
| :--------- | :----------------------------------------------------------------------------------------------------------------------------------- | :------- | :---------- | :-------------------------------------------------------------------------------- |
| color      | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| [Color](https://staven630.github.io/cesium-doc-zh/Color.html) | 可选     | Color.WHITE | 用于线的 Color 属性。                                                             |
| glowPower  | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| Number                                                        | 可选     | 0.25        | 指定发光强度，作为总线宽的百分比                                                  |
| taperPower | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| Number                                                        | 可选     | 1.0         | 指定锥形效果的强度，以总线条长度的百分比表示。如果 1.0 或更高，则不使用锥形效果。 |

```js
const glowingLine = viewer.entities.add({
  name: "GlowingLine",
  polyline: {
    positions: Cesium.Cartesian3.fromDegreesArray([-75, 37, -125, 37]),
    width: 10,
    material: new Cesium.PolylineGlowMaterialProperty({
      glowPower: 0.2,
      taperPower: 0.5,
      color: Cesium.Color.CORNFLOWERBLUE,
    }),
  },
});
```

![PolylineGlowMaterialProperty](../img/PolylineGlowMaterialProperty.png)
